import { useEffect, useState } from "react";
import Browse from "./components/Browse";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Arrived from "./components/Arrived";
import Clients from "./components/Clients";
import AsideMenu from "./components/AsideMenu";
import Footer from "./components/Footer";
import Offline from "./components/Offline";
import Splash from "./pages/Splash";

function App() {
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
            <Header />
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

export default App;
