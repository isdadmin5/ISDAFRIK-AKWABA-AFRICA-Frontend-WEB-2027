import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Nous gérons la mise en page publique du site web, qui inclut l'en-tête, le pied de page et le contenu principal pour les pages accessibles au public.
// (Accueil, Recherche, Catalogue, Détail, Réservation, Paiement, Confirmation)
export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-asphalt-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
