import { Heart, MapPin, Star, Clock3, Utensils, Sparkles, ShieldCheck, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { restaurants } from "./restaurant.data";

const categories = [
  { icon: Utensils, label: "Petit-déjeuner" },
  { icon: Star, label: "Déjeuner" },
  { icon: Clock3, label: "Dîner" },
  { icon: Users, label: "Familial" },
  { icon: Sparkles, label: "Affaires" },
  { icon: MapPin, label: "Vue mer" },
  { icon: Heart, label: "Romantique" },
];

const events = [
  {
    title: "Festival Gastronomique de Lomé",
    subtitle: "21-23 Décembre • Lomé",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Semaine des Grillades",
    subtitle: "13-17 Novembre • Abidjan",
    image: "https://images.unsplash.com/photo-1517249361628-6a12c815b165?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Soirée Jazz & Dîner",
    subtitle: "Chaque jeudi • Dakar",
    image: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cocktails rooftop",
    subtitle: "Weekend • Cotonou",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Brunch luxe au bord de l'eau",
    subtitle: "Dimanche • Lomé",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Menu végétarien spécial",
    subtitle: "Tous les jours • Ouagadougou",
    image: "https://images.unsplash.com/photo-1529692236671-f1d35d2afa6c?auto=format&fit=crop&w=1200&q=80",
  },
];

const features = [
  {
    title: "Réservation instantanée",
    description: "Confirmation immédiate de votre table sans attente.",
    icon: Sparkles,
  },
  {
    title: "Paiement sécurisé",
    description: "Vos transactions sont protégées par les meilleurs protocoles.",
    icon: ShieldCheck,
  },
  {
    title: "Restaurants vérifiés",
    description: "Chaque établissement est rigoureusement sélectionné.",
    icon: Star,
  },
  {
    title: "Assistance 24h/24",
    description: "Une équipe dédiée pour vous accompagner à tout moment.",
    icon: Users,
  },
];

const faq = [
  "Puis-je modifier ou annuler ma réservation ?",
  "Les menus sont-ils consultables à l'avance ?",
  "Proposez-vous des réservations pour les groupes ?",
  "Y a-t-il des options végétariennes ?",
];

export function RestaurantPage() {
  return (
    <main className="bg-asphalt-950 text-sand-50">
      <section className="relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-asphalt-950/80" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6 text-center">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sand-200">
              Découvrez les meilleures tables
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Réservez les meilleures tables d'Afrique de l'Ouest
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-sand-200 sm:text-lg">
              Découvrez les meilleurs restaurants, cuisines locales et gastronomiques au Togo, au Bénin, au Burkina Faso, en Côte d'Ivoire et au Niger.
            </p>
          </div>

          <div className="mx-auto mt-12 w-full max-w-5xl rounded-[2rem] border border-white/10 bg-asphalt-900/95 p-6 shadow-2xl shadow-black/40 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-5 sm:items-end">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-sand-400">Destination</label>
                <input className="w-full rounded-2xl border border-white/10 bg-asphalt-950 px-4 py-3 text-sm text-sand-50 outline-none focus:border-amber-400" placeholder="Lomé" type="text" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-sand-400">Date</label>
                <input className="w-full rounded-2xl border border-white/10 bg-asphalt-950 px-4 py-3 text-sm text-sand-50 outline-none focus:border-amber-400" type="date" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-sand-400">Heure</label>
                <input className="w-full rounded-2xl border border-white/10 bg-asphalt-950 px-4 py-3 text-sm text-sand-50 outline-none focus:border-amber-400" type="time" defaultValue="12:00" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-sand-400">Personnes</label>
                <select className="w-full rounded-2xl border border-white/10 bg-asphalt-950 px-4 py-3 text-sm text-sand-50 outline-none focus:border-amber-400">
                  {[1, 2, 3, 4, 5].map((count) => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>
              </div>
              <Button variant="primary" size="lg" className="w-full rounded-2xl text-sm uppercase tracking-[0.2em]">
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-400">Restaurants Populaires</p>
            <h2 className="mt-3 text-3xl font-semibold text-sand-50">Restaurants populaires</h2>
          </div>
          <Button variant="ghost" size="md" className="text-amber-400 hover:text-amber-300">
            Voir tout
          </Button>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2">
          {restaurants.slice(0, 4).map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden bg-sand-50 text-asphalt-950 shadow-xl shadow-black/10">
              <div className="relative h-56 overflow-hidden">
                <img className="h-full w-full object-cover" src={restaurant.image} alt={restaurant.name} />
                <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-amber-500 shadow-lg shadow-slate-900/10">
                  <Heart className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-asphalt-950">{restaurant.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{restaurant.location}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">{restaurant.category}</span>
                </div>
                <p className="text-sm leading-6 text-slate-600">{restaurant.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <Star className="h-4 w-4 text-amber-400" /> {restaurant.rating.toFixed(1)}
                  </div>
                  <span className="text-sm font-semibold text-asphalt-950">{restaurant.price} FCFA</span>
                </div>
                <Button variant="secondary" size="md" className="w-full rounded-2xl">
                  Voir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-asphalt-800 bg-asphalt-950/90 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {categories.map(({ icon: Icon, label }) => (
              <button key={label} className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-asphalt-900/80 px-4 py-5 text-center text-sm text-sand-100 transition hover:border-amber-400">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">
                  <Icon className="h-5 w-5" />
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-400">Sélection AKWABA</p>
            <h2 className="mt-3 text-3xl font-semibold text-sand-50">Les plus réservés</h2>
          </div>
          <div className="text-sm text-sand-400">Découvrez les établissements les plus demandés.</div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {restaurants.slice(0, 3).map((restaurant) => (
            <Card key={restaurant.id} className="rounded-[2rem] border border-asphalt-800 bg-asphalt-900/95 p-6 shadow-lg shadow-black/20">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-3xl bg-asphalt-800">
                  <img className="h-full w-full object-cover" src={restaurant.image} alt={restaurant.name} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-sand-50">{restaurant.name}</h3>
                  <p className="text-sm text-sand-400">{restaurant.location}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-2 text-sm text-sand-300">
                <span>{restaurant.rating.toFixed(1)} étoiles</span>
                <span>42 réservations cette semaine</span>
              </div>
              <Button variant="primary" size="md" className="mt-6 w-full rounded-2xl">
                Réserver maintenant
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-400">Événements Culinaires</p>
            <h2 className="mt-3 text-3xl font-semibold text-sand-50">Événements culinaires</h2>
          </div>
          <div className="text-sm text-sand-400">Réservez votre place dès aujourd'hui.</div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <Card key={event.title} className="group overflow-hidden bg-asphalt-900/80 shadow-xl shadow-black/20">
              <div className="relative h-72 overflow-hidden">
                <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={event.image} alt={event.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950/90 via-asphalt-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-sand-50">
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-400">Événement</p>
                  <h3 className="mt-2 text-xl font-semibold">{event.title}</h3>
                  <p className="mt-1 text-sm text-sand-300">{event.subtitle}</p>
                </div>
              </div>
              <div className="p-6">
                <Button variant="primary" size="md" className="w-full rounded-2xl bg-amber-500 text-asphalt-950 hover:bg-amber-400">
                  Découvrir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-asphalt-800 bg-asphalt-950/90 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="rounded-[2rem] border border-white/10 bg-asphalt-900/80 p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-300">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-sand-50">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-sand-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-400">Questions Fréquentes</p>
            <h2 className="mt-3 text-3xl font-semibold text-sand-50">Questions fréquentes</h2>
          </div>
          <div className="space-y-3">
            {faq.map((question) => (
              <div key={question} className="rounded-3xl border border-white/10 bg-asphalt-900/95 px-5 py-4 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-sand-100">{question}</p>
                  <ChevronDown className="h-5 w-5 text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
