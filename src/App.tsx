import { AppProviders } from "@/app/providers/AppProviders";
import { AppRouter } from "@/routes/AppRouter";

// Composant principal de l'application, qui encapsule le routeur et les fournisseurs globaux.

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
