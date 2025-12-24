import { useState } from "react";
import { Header } from "@/components/common/Header";
import "./App.css";
import CatalogPage from "./pages/CatalogPage";
import BookingPage from "./pages/BookingPage";
import SettingPage from "./pages/SettingsPage";

function App() {
  const [active, setActive] = useState("catalog");

  return (
    <>
      {/* Передаем в шапку базовые параметры для её настройки*/}
      <Header
        activeNavId={active}
        onNavigate={setActive}
        onBellClick={() => console.log("bell")}
      />
      <main>
        {active === "catalog" && <CatalogPage />}
        {active === "bookings" && <BookingPage />}
        {active == "settings" && <SettingPage />}
        {/* bookings, settings */}

      </main>
    </>
  );
}
export default App;
