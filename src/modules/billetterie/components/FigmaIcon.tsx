import type { ImgHTMLAttributes } from "react";
import clsx from "clsx";

import globe from "../assets/icons/globe.svg";
import calendar from "../assets/icons/calendar.svg";
import passengers from "../assets/icons/passengers.svg";
import chevronDown from "../assets/icons/chevron-down.svg";
import planeDepart from "../assets/icons/plane-depart.svg";
import planeArrive from "../assets/icons/plane-arrive.svg";
import swap from "../assets/icons/swap.svg";
import search from "../assets/icons/search.svg";
import arrowSeeAll from "../assets/icons/arrow-see-all.svg";
import trustPrice from "../assets/icons/trust-price.svg";
import trustShield from "../assets/icons/trust-shield.svg";
import trustHeadset from "../assets/icons/trust-headset.svg";
import trustZap from "../assets/icons/trust-zap.svg";
import faqChevron from "../assets/icons/faq-chevron.svg";
import contactPin from "../assets/icons/contact-pin.svg";
import contactPhone from "../assets/icons/contact-phone.svg";
import contactMail from "../assets/icons/contact-mail.svg";
import footerSocial from "../assets/icons/footer-social.svg";
import svcCabin from "../assets/icons/svc-cabin.svg";
import svcHold from "../assets/icons/svc-hold.svg";
import svcMeal from "../assets/icons/svc-meal.svg";
import svcSeat from "../assets/icons/svc-seat.svg";
import svcModifiable from "../assets/icons/svc-modifiable.svg";
import svcEticket from "../assets/icons/svc-eticket.svg";
import policyMod from "../assets/icons/policy-mod.svg";
import policyCancel from "../assets/icons/policy-cancel.svg";
import policyRefund from "../assets/icons/policy-refund.svg";
import infoI from "../assets/icons/info-i.svg";
import trustShield2 from "../assets/icons/trust-shield2.svg";
import trustLock from "../assets/icons/trust-lock.svg";
import trustCard from "../assets/icons/trust-card.svg";
import plusArrow from "../assets/icons/plus-arrow.svg";
import legendWindow from "../assets/icons/legend-window.svg";
import legendAisle from "../assets/icons/legend-aisle.svg";
import legendLegroom from "../assets/icons/legend-legroom.svg";
import legendToilet from "../assets/icons/legend-toilet.svg";
import extraMeal from "../assets/icons/extra-meal.svg";
import extraBoard from "../assets/icons/extra-board.svg";
import extraLounge from "../assets/icons/extra-lounge.svg";
import seatSelected from "../assets/icons/seat-selected.svg";
import seatStar from "../assets/icons/seat-star.svg";
import seatPreview from "../assets/icons/seat-preview.svg";
import amenityToilet from "../assets/icons/amenity-toilet.svg";
import amenityWheelchair from "../assets/icons/amenity-wheelchair.svg";
import lockSecure from "../assets/icons/lock-secure.svg";
import svcVip from "../assets/icons/svc-vip.svg";
import svcInsurance from "../assets/icons/svc-insurance.svg";
import svcPriority from "../assets/icons/svc-priority.svg";
import svcTransfer from "../assets/icons/svc-transfer.svg";
import chevronTogo from "../assets/icons/chevron-togo.svg";

export const billetIcons = {
  globe,
  calendar,
  passengers,
  chevronDown,
  planeDepart,
  planeArrive,
  swap,
  search,
  arrowSeeAll,
  trustPrice,
  trustShield,
  trustHeadset,
  trustZap,
  faqChevron,
  contactPin,
  contactPhone,
  contactMail,
  footerSocial,
  svcCabin,
  svcHold,
  svcMeal,
  svcSeat,
  svcModifiable,
  svcEticket,
  policyMod,
  policyCancel,
  policyRefund,
  infoI,
  trustShield2,
  trustLock,
  trustCard,
  plusArrow,
  legendWindow,
  legendAisle,
  legendLegroom,
  legendToilet,
  extraMeal,
  extraBoard,
  extraLounge,
  seatSelected,
  seatStar,
  seatPreview,
  amenityToilet,
  amenityWheelchair,
  lockSecure,
  svcVip,
  svcInsurance,
  svcPriority,
  svcTransfer,
  chevronTogo,
} as const;

export type BilletIconName = keyof typeof billetIcons;

export function FigmaIcon({
  name,
  size = 20,
  className,
  alt = "",
  ...rest
}: {
  name: BilletIconName;
  size?: number;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height">) {
  return (
    <span
      className={clsx("inline-flex shrink-0 overflow-clip", className)}
      style={{ width: size, height: size }}
    >
      <img
        src={billetIcons[name]}
        alt={alt}
        width={size}
        height={size}
        className="block size-full max-w-none"
        {...rest}
      />
    </span>
  );
}
