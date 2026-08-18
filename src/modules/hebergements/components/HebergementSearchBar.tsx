import { FormEvent, useState, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { BedDouble, Building2, CalendarDays, Home, Hotel, MapPin, Users } from "lucide-react";
import { useBooking } from "../booking/BookingContext";
import { TYPE_ROUTES } from "../catalog";
import type { AccommodationType } from "../types";

const TABS: Array<{
  id: AccommodationType | "ALL";
  label: string;
  Icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
}> = [
  { id: "ALL", label: "Tous" },
  { id: "HOTEL", label: "HÔTEL", Icon: BedDouble },
  { id: "MAISON", label: "MAISON", Icon: Home },
  { id: "VILLA", label: "VILLA", Icon: Hotel },
  { id: "APPARTEMENT", label: "APPARTEMENT", Icon: Building2 },
];

function formatRange(checkIn: string, checkOut: string) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  if (!checkIn || !checkOut) return "";
  return `${fmt(checkIn)} — ${fmt(checkOut)}`;
}

const fieldBox =
  "flex items-center rounded-[16px] border border-solid border-[#c6c6cf] bg-[#f9f9f9] px-[17px] py-[13px]";

export function HebergementSearchBar({
  activeType = "ALL",
  destination = "",
}: {
  activeType?: AccommodationType | "ALL";
  destination?: string;
}) {
  const navigate = useNavigate();
  const booking = useBooking();
  const [type, setType] = useState<AccommodationType | "ALL">(activeType);
  const [query, setQuery] = useState(destination);
  const [checkIn, setCheckIn] = useState(booking.checkIn);
  const [checkOut, setCheckOut] = useState(booking.checkOut);
  const [datesOpen, setDatesOpen] = useState(false);
  const dateLabel = formatRange(checkIn, checkOut);

  function go(nextType: AccommodationType | "ALL", dest = query) {
    booking.setDates(checkIn, checkOut);
    const params = new URLSearchParams();
    if (dest) params.set("q", dest);
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    const base = TYPE_ROUTES[nextType];
    navigate(`${base}?${params.toString()}`);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    go(type);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto w-full max-w-[1161px] rounded-[25px] bg-white px-5 pb-6 pt-5 shadow-[0_4px_2px_rgba(0,0,0,0.25)] lg:h-[231px] lg:px-[19px] lg:pb-0 lg:pt-5"
    >
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:mb-0 lg:h-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setType(tab.id);
              go(tab.id);
            }}
            className={clsx(
              "flex items-center gap-2 rounded-full px-6 py-2.5 font-vietnam text-[14px] font-bold leading-5",
              type === tab.id
                ? "bg-brand-500 text-navy-900 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
                : "bg-transparent text-[#64748b]"
            )}
          >
            {tab.Icon && <tab.Icon className="size-[15px] shrink-0" strokeWidth={2.25} />}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-[18px] lg:mt-[18px] lg:flex-row lg:flex-nowrap lg:items-end lg:justify-center">
        <label className="w-full lg:w-[278px]">
          <span className="mb-1 block text-[14px] font-medium leading-5 text-[#45464e]">Destination</span>
          <span className={clsx(fieldBox, "h-[67px]")}>
            <span className="mr-3 flex h-5 w-7 shrink-0 items-center text-navy-900">
              <MapPin className="h-5 w-4" strokeWidth={2} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Où allez-vous ?"
              className="w-full bg-transparent text-[16px] text-[#1a1c1c] placeholder:text-[#6b7280] focus:outline-none"
            />
          </span>
        </label>

        <div className="relative w-full lg:w-[287px]">
          <span className="mb-1 block text-[14px] font-medium leading-5 text-[#45464e]">Arrivée - Départ</span>
          <button
            type="button"
            onClick={() => setDatesOpen((o) => !o)}
            className={clsx(fieldBox, "h-[67px] w-full text-left")}
          >
            <span className="mr-3 flex h-5 w-[30px] shrink-0 items-center text-navy-900">
              <CalendarDays className="h-5 w-[18px]" strokeWidth={2} />
            </span>
            <span className={clsx("text-[16px]", dateLabel ? "text-[#1a1c1c]" : "text-[#76767f]")}>
              {dateLabel || "Sélectionnez les dates"}
            </span>
          </button>
          {datesOpen && (
            <div className="absolute left-0 top-full z-30 mt-2 flex w-full min-w-[260px] gap-2 rounded-[16px] border border-[#c6c6cf] bg-white p-3 shadow-lg">
              <label className="flex-1 text-[12px] text-[#45464e]">
                Arrivée
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#c6c6cf] bg-[#f9f9f9] px-2 py-1.5 text-[14px] text-[#1a1c1c] focus:outline-none"
                />
              </label>
              <label className="flex-1 text-[12px] text-[#45464e]">
                Départ
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#c6c6cf] bg-[#f9f9f9] px-2 py-1.5 text-[14px] text-[#1a1c1c] focus:outline-none"
                />
              </label>
            </div>
          )}
        </div>

        <label className="w-full lg:w-[155px]">
          <span className="mb-1 block text-[14px] font-medium leading-5 text-[#45464e]">Voyageurs</span>
          <span className={clsx(fieldBox, "h-[50px]")}>
            <span className="mr-2 flex h-4 w-[34px] shrink-0 items-center text-navy-900">
              <Users className="h-4 w-[22px]" strokeWidth={2} />
            </span>
            <input
              defaultValue="2 Ad., 1 enf."
              className="w-full bg-transparent text-[16px] leading-6 text-[#1a1c1c] focus:outline-none"
            />
          </span>
        </label>

        <label className="w-full lg:w-[155px]">
          <span className="mb-1 block text-[14px] font-medium leading-5 text-[#45464e]">Budget (FCFA)</span>
          <span className={clsx(fieldBox, "h-[50px]")}>
            <input
              defaultValue="500 k"
              className="w-full bg-transparent text-[16px] leading-6 text-[#1a1c1c] focus:outline-none"
            />
          </span>
        </label>

        <button
          type="submit"
          className="h-[55px] w-full shrink-0 rounded-[16px] bg-brand-500 text-[16px] leading-6 text-navy-900 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] lg:w-[177px]"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
}
