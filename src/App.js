import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Browse from "./components/Browse";
import Arrived from "./components/Arrived";
import Clients from "./components/Clients";
import AsideMenu from "./components/AsideMenu";
import Footer from "./components/Footer";
import Offline from "./components/Offline";

import Splash from "./pages/Splash";
import Profile from "./pages/Profile";
import Details from "./pages/Details";
import Cart from "./pages/Cart";

function App({ cart }) {
  const [items, setItems] = useState([]);
  const [offlineStatus, setOfflineStatus] = useState(!navigator.onLine);
  const [isLoading, setLoading] = useState(true);

  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine);
  }

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  useEffect(
    function () {
      (async function () {
        const response = await fetch("https://bwacharity.fly.dev/items", {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        const { nodes } = await response.json();
        setItems(nodes);

        if (!document.querySelector('script[src="/carousel.js"]')) {
          const script = document.createElement("script");
          script.src = "/carousel.js";
          script.async = false;
          document.body.appendChild(script);
        }
      })();

      handleOfflineStatus();
      window.addEventListener("online", handleOfflineStatus);
      window.addEventListener("offline", handleOfflineStatus);

    }, [offlineStatus]);
  return (
    <>
      {isLoading ? <Splash /> :
        (
          <>
            {offlineStatus && <Offline />}
            <Header mode="light" cart={cart} />
            <Hero />
            <Browse />
            <Arrived items={items} />
            <Clients />
            <AsideMenu />
            <Footer />
          </>
        )
      }
    </>
  );
}

export default function AppRoutes() {
  const cacheCart = window.localStorage.getItem("cart");
  const [cart, setCart] = useState([]);

  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, { id: currentIndex + 1, item }];
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleRemoveCartItem(id) {
    const revisedCart = cart.filter(function (item) {
      return item.id !== id;
    });
    setCart(revisedCart);
    window.localStorage.setItem("cart", JSON.stringify(revisedCart));
  }

  useEffect(() => {
    console.info("useEffect for localStorage");
    if (cacheCart !== null) {
      setCart(JSON.parse(cacheCart));
    }
  }, [cacheCart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App cart={cart} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<Details handleAddToCart={handleAddToCart} cart={cart} />} />
        <Route path="/cart" element={<Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem} />} />
      </Routes>
    </BrowserRouter>
  );
}
