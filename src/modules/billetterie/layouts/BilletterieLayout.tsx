import { Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";

export function BilletterieLayout() {
  const { pathname } = useLocation();
  const isLanding = pathname === "/billetterie" || pathname === "/billetterie/";

  return (
    <div className={clsx("min-h-[70vh] font-body text-[#0d1b3d]", isLanding ? "bg-[#f2f2f2]" : "bg-[#f2f2f2]")}>
      {isLanding ? (
        <Outlet />
      ) : (
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      )}
    </div>
  );
}
