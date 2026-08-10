// Nous gérons le pied de page du site web, qui inclut des informations sur le copyright et la description de la plateforme.
export function Footer() {
  return (
    <footer className="border-t border-asphalt-700 py-8 text-center text-xs text-sand-400">
      <div className="mx-auto max-w-6xl px-4">
        © {new Date().getFullYear()} AKWABA AFRICA — Module Location de Véhicules · Plateforme panafricaine
      </div>
    </footer>
  );
}
