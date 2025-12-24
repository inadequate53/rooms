import { useState } from "react";
import { Header } from "@/components/common/Header";
import "./App.css";
import CatalogPage from "./pages/CatalogPage";
import BookingPage from "./pages/BookingPage";
import SettingPage from "./pages/SettingsPage";

type ActivePage = "catalog" | "bookings" | "settings";

function App() {
  const [active, setActive] = useState<ActivePage>("catalog");
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);

  const openCreateBooking = () => {
    setEditingBookingId(null);
    setActive("bookings");
  };

  const openEditBooking = (id: string) => {
    setEditingBookingId(id);
    setActive("bookings");
  };

  const handleNavigate = (next: string) => {
    const page = next as ActivePage;
    setActive(page);
    // если ушли с формы — сбрасываем режим редактирования
    if (page !== "bookings") setEditingBookingId(null);
  };

  return (
    <>
      <Header
        activeNavId={active}
        onNavigate={handleNavigate}
        onBellClick={() => console.log("bell")}
      />

      <main>
        {active === "catalog" && (
          <CatalogPage
            onCreateBooking={openCreateBooking}
            onEditBooking={openEditBooking}
          />
        )}

        {active === "bookings" && (
          <BookingPage
            bookingId={editingBookingId}
            onDone={() => {
              setEditingBookingId(null);
              setActive("catalog");
            }}
          />
        )}

        {active === "settings" && <SettingPage />}
      </main>
    </>
  );
}

export default App;
