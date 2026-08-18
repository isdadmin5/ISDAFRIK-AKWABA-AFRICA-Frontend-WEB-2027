import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f2f2f2] font-body text-navy-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
