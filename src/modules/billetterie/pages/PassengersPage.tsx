import { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Hourglass, Plane } from "lucide-react";
import { getFlightById, formatFcfa } from "../data/flights";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAgreements, setContact, updatePassenger } from "@/redux/slices/billetterieSlice";
import { computeTotals, isPassengerComplete } from "../utils";
import { FlightSearchBar } from "../components/FlightSearchBar";
import { Breadcrumbs, HelpWidget, btnOrange, btnOutline, field, label } from "../components/ui";

export function PassengersPage() {
  const { id = "" } = useParams();
  const flight = getFlightById(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.billetterie);

  if (!flight) {
    return (
      <div className="p-10 text-center">
        <Link to="/billetterie" className="text-[#ff5c00]">
          Retour
        </Link>
      </div>
    );
  }

  const totals = computeTotals(
    flight,
    draft.search.adults,
    draft.seats,
    draft.extras,
    draft.baggageExtra
  );

  function onContinue(e: FormEvent) {
    e.preventDefault();
    if (!draft.acceptTerms || !draft.confirmOfficial) return;
    navigate(`/billetterie/${id}/sieges`);
  }

  return (
    <div className="space-y-6">
      <FlightSearchBar />
      <Breadcrumbs
        items={[
          { label: "Accueil", to: "/billetterie" },
          { label: "Billets", to: "/billetterie" },
          { label: "Détail", to: `/billetterie/${id}` },
          { label: "Informations des voyageurs" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <form onSubmit={onContinue} className="space-y-5">
          <h1 className="font-display text-3xl font-bold text-[#0d1b3d]">
            Informations des Voyageurs
          </h1>

          {draft.passengers.map((p, index) => {
            const complete = isPassengerComplete(p);
            return (
              <section
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0d1b3d] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <h2 className="font-semibold text-[#0d1b3d]">
                      Passager {index + 1} (Adulte
                      {index === 0 ? " - Principal" : ""})
                    </h2>
                  </div>
                  {complete ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Hourglass className="h-5 w-5 text-[#ff5c00]" />
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={label}>Civilité*</label>
                    <select
                      className={field}
                      value={p.title}
                      onChange={(e) =>
                        dispatch(updatePassenger({ index, data: { title: e.target.value } }))
                      }
                    >
                      <option>Monsieur</option>
                      <option>Madame</option>
                      <option>Mademoiselle</option>
                    </select>
                  </div>
                  <div>
                    <label className={label}>Nom*</label>
                    <input
                      className={field}
                      placeholder="Entrez le nom"
                      value={p.lastName}
                      onChange={(e) =>
                        dispatch(updatePassenger({ index, data: { lastName: e.target.value } }))
                      }
                    />
                  </div>
                  <div>
                    <label className={label}>Prénom*</label>
                    <input
                      className={field}
                      placeholder="Entrez le prénom"
                      value={p.firstName}
                      onChange={(e) =>
                        dispatch(updatePassenger({ index, data: { firstName: e.target.value } }))
                      }
                    />
                  </div>
                  <div>
                    <label className={label}>Date de naissance*</label>
                    <input
                      type="date"
                      className={field}
                      value={p.birthDate}
                      onChange={(e) =>
                        dispatch(updatePassenger({ index, data: { birthDate: e.target.value } }))
                      }
                    />
                  </div>
                  <div>
                    <label className={label}>Nationalité*</label>
                    <input
                      className={field}
                      value={p.nationality}
                      onChange={(e) =>
                        dispatch(updatePassenger({ index, data: { nationality: e.target.value } }))
                      }
                    />
                  </div>
                  <div>
                    <label className={label}>Numéro de Passeport/CNI*</label>
                    <input
                      className={field}
                      value={p.documentNumber}
                      onChange={(e) =>
                        dispatch(
                          updatePassenger({ index, data: { documentNumber: e.target.value } })
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={label}>Date d&apos;expiration</label>
                    <input
                      type="date"
                      className={field}
                      value={p.documentExpiry}
                      onChange={(e) =>
                        dispatch(
                          updatePassenger({ index, data: { documentExpiry: e.target.value } })
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={label}>Pays émetteur</label>
                    <input
                      className={field}
                      value={p.issuingCountry}
                      onChange={(e) =>
                        dispatch(
                          updatePassenger({ index, data: { issuingCountry: e.target.value } })
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={label}>Email*</label>
                    <input
                      type="email"
                      className={field}
                      value={p.email}
                      onChange={(e) =>
                        dispatch(updatePassenger({ index, data: { email: e.target.value } }))
                      }
                    />
                  </div>
                  <div>
                    <label className={label}>Téléphone*</label>
                    <input
                      className={field}
                      placeholder="+228 70 00 00 00"
                      value={p.phone}
                      onChange={(e) =>
                        dispatch(updatePassenger({ index, data: { phone: e.target.value } }))
                      }
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-3 text-sm font-semibold text-[#0d1b3d]">Préférences de vol</p>
                  <div className="flex flex-wrap gap-4">
                    {(
                      [
                        ["vegetarian", "Repas Végétarien"],
                        ["halal", "Repas Halal"],
                        ["pmr", "Assistance PMR"],
                      ] as const
                    ).map(([key, text]) => (
                      <label key={key} className="inline-flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={p[key]}
                          onChange={(e) =>
                            dispatch(updatePassenger({ index, data: { [key]: e.target.checked } }))
                          }
                          className="h-4 w-4 accent-[#ff5c00]"
                        />
                        {text}
                      </label>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 font-semibold text-[#0d1b3d]">Contact & Facturation</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={label}>Adresse de résidence*</label>
                <input
                  className={field}
                  placeholder="Ex: Rue des Jardins, Lomé"
                  value={draft.contact.address}
                  onChange={(e) => dispatch(setContact({ address: e.target.value }))}
                />
              </div>
              <div>
                <label className={label}>Ville*</label>
                <input
                  className={field}
                  placeholder="Lomé"
                  value={draft.contact.city}
                  onChange={(e) => dispatch(setContact({ city: e.target.value }))}
                />
              </div>
              <div>
                <label className={label}>Code Postal</label>
                <input
                  className={field}
                  placeholder="0000"
                  value={draft.contact.postalCode}
                  onChange={(e) => dispatch(setContact({ postalCode: e.target.value }))}
                />
              </div>
            </div>
            <label className="mt-4 inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={draft.contact.useForInvoice}
                onChange={(e) => dispatch(setContact({ useForInvoice: e.target.checked }))}
                className="h-4 w-4 accent-[#0d1b3d]"
              />
              Utiliser ces informations pour la facture
            </label>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 font-semibold text-[#0d1b3d]">Contact d&apos;urgence</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Nom & Prénom*</label>
                <input
                  className={field}
                  placeholder="Nom du contact"
                  value={draft.contact.emergencyName}
                  onChange={(e) => dispatch(setContact({ emergencyName: e.target.value }))}
                />
              </div>
              <div>
                <label className={label}>Lien de parenté*</label>
                <select
                  className={field}
                  value={draft.contact.emergencyRelation}
                  onChange={(e) => dispatch(setContact({ emergencyRelation: e.target.value }))}
                >
                  <option>Conjoint(e)</option>
                  <option>Parent</option>
                  <option>Frère/Sœur</option>
                  <option>Ami(e)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Téléphone d&apos;urgence*</label>
                <input
                  className={field}
                  placeholder="+228 .."
                  value={draft.contact.emergencyPhone}
                  onChange={(e) => dispatch(setContact({ emergencyPhone: e.target.value }))}
                />
              </div>
            </div>
          </section>

          <div className="space-y-3 text-sm text-slate-700">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 accent-[#0d1b3d]"
                checked={draft.confirmOfficial}
                onChange={(e) => dispatch(setAgreements({ confirmOfficial: e.target.checked }))}
              />
              Je confirme que toutes les informations saisies sont identiques à celles figurant sur
              les documents de voyage officiels.
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 accent-[#0d1b3d]"
                checked={draft.acceptTerms}
                onChange={(e) => dispatch(setAgreements({ acceptTerms: e.target.checked }))}
              />
              J&apos;accepte les Conditions Générales de Vente d&apos;AKWABA AFRICA et la politique
              de confidentialité.
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 accent-[#0d1b3d]"
                checked={draft.newsletter}
                onChange={(e) => dispatch(setAgreements({ newsletter: e.target.checked }))}
              />
              Je souhaite recevoir les offres exclusives et actualités par email.
            </label>
          </div>
        </form>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-[#0d1b3d] px-4 py-3 text-white">
              <span className="text-sm font-semibold">{flight.airline}</span>
              <span className="rounded-md bg-[#ff5c00] px-2 py-0.5 text-xs font-bold">
                {flight.flightNumber}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-[#0d1b3d]">
                  {flight.departTime} {flight.from.code}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <Plane className="h-3 w-3" /> Direct - {flight.duration}
                </span>
                <span className="font-bold text-[#0d1b3d]">
                  {flight.arriveTime} {flight.to.code}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{draft.search.adults} Adultes</p>
              <ul className="mt-2 space-y-1 text-sm">
                {draft.passengers.map((p, i) => (
                  <li key={i} className="flex justify-between">
                    <span>Passager {i + 1}</span>
                    <span
                      className={
                        isPassengerComplete(p) ? "text-emerald-600" : "text-[#ff5c00]"
                      }
                    >
                      {isPassengerComplete(p) ? "Complété" : "En cours"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Prix Total</p>
            <p className="font-display text-2xl font-bold text-[#0d1b3d]">
              {formatFcfa(totals.total)}
            </p>
            <p className="text-xs text-slate-400">Taxes et frais inclus</p>
            <button
              type="button"
              className={`${btnOrange} mt-5 w-full`}
              disabled={!draft.acceptTerms || !draft.confirmOfficial}
              onClick={() => navigate(`/billetterie/${id}/sieges`)}
            >
              Continuer vers le choix des sièges →
            </button>
            <Link to={`/billetterie/${id}`} className={`${btnOutline} mt-3 w-full`}>
              Retour
            </Link>
            <p className="mt-4 text-center text-xs text-slate-400">
              🔒 Paiement sécurisé crypté SSL
            </p>
          </div>

          <HelpWidget />
        </aside>
      </div>
    </div>
  );
}
