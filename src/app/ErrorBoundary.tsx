import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/Button";

// Gestion de notre partie ErrorBoundary
// Gestion des états : chaque état doit proposer une action de reprise.
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Journalisation et Monitoring Frontend
    // eslint-disable-next-line no-console
    console.error("[Frontend ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
          <AlertTriangle className="h-10 w-10 text-danger" aria-hidden />
          <p className="max-w-md text-sand-200">
            Une erreur est survenue lors de l'affichage de cette page. Veuillez réessayer.
          </p>
          <Button onClick={() => this.setState({ hasError: false })}>Réessayer</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
