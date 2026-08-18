import type { ReactNode } from "react";
import { HebergementSearchBar } from "./HebergementSearchBar";
import { Breadcrumbs } from "./Breadcrumbs";
import type { AccommodationType } from "../types";

export function HebergementPageShell({
  activeType = "ALL",
  destination = "",
  crumbs,
  children,
}: {
  activeType?: AccommodationType | "ALL";
  destination?: string;
  crumbs?: Array<{ label: string; to?: string }>;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#f2f2f2] pb-16">
      <div className="px-4 pb-6 pt-4">
        <HebergementSearchBar activeType={activeType} destination={destination} />
      </div>
      <div className="mx-auto max-w-[1280px] px-4">
        {crumbs && crumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
