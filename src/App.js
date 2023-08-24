import Browse from "./components/Browse";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Arrived from "./components/Arrived";
import Clients from "./components/Clients";
import AsideMenu from "./components/AsideMenu";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
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
      })();
    }, []);
  return (
    <>
      <Header />
      <Hero />
      <Browse />
      <Arrived items={items} />
      <Clients />
      <AsideMenu />
      <Footer />
    </>
  );
}

export default App;
