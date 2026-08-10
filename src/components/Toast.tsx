import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import clsx from "clsx";

// Nous gérons ici l'affichage de notifications toast pour informer l'utilisateur de succès, erreurs ou informations
type ToastKind = "success" | "error" | "info";
interface ToastItem {
  id: number;
  message: string;
  kind: ToastKind;
}

const ToastContext = createContext<{ push: (message: string, kind?: ToastKind) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, kind: ToastKind = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, kind }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={clsx(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-lg backdrop-blur",
              t.kind === "success" && "border-route-600/40 bg-asphalt-800/95 text-route-400",
              t.kind === "error" && "border-danger/40 bg-asphalt-800/95 text-danger",
              t.kind === "info" && "border-asphalt-600 bg-asphalt-800/95 text-sand-50"
            )}
          >
            {t.kind === "success" && <CheckCircle2 className="h-4 w-4" />}
            {t.kind === "error" && <XCircle className="h-4 w-4" />}
            {t.kind === "info" && <Info className="h-4 w-4" />}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast doit être utilisé dans ToastProvider");
  return ctx;
}
