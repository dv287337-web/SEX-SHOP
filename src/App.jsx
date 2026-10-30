
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Benefits from "./components/Benefits";
import WhatsAppButton from "./components/WhatsAppButton";

import "./App.css";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Benefits />
    </>
  );
}

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <WhatsAppButton />
    </>
  );
}

export default App;
