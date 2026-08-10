# AKWABA AFRICA — Frontend Web · Module Location de Véhicules

Ce projet implémente **uniquement le module "Location de Véhicules"** du
*Cahier des Charges Technique Frontend Web & Mobile — AKWABA AFRICA 2026*,
conformément au périmètre défini avec le chef de projet (voir
`planification_location_voiture_akwaba_afrika`).

Il respecte l'architecture générale imposée par le cahier des charges
(Chapitre 2 — Architecture Frontend Web React.js) afin de pouvoir être
intégré tel quel dans le futur monorepo AKWABA AFRICA aux côtés des autres
modules (Hébergements, Restaurants, Vols, Tourisme, Paiement…).

## Références au cahier des charges

| Section | Contenu implémenté |
|---|---|
| §2.5 – §2.9 | Architecture générale du projet, layouts, navigation |
| §2.23 | Module Location de Véhicules — types, pages, composants |
| §2.36 | Répartition Redux Toolkit / React Query |
| §2.39 | Normes de développement (TypeScript strict, Zod, RHF, tests) |
| §4.50 | Parcours Location de Véhicule (stepper Dates → Conducteur → Assurance → Paiement → Contrat) |
| §5.10 / §5.35 | Écran et Fiche Véhicule |
| §5.14 / §5.15 | Écrans Paiement et Confirmation |
| §5.59 | Scénario 5 : Location de Véhicule |
| §6.31 | Contrat API Véhicules (`GET /vehicles`, `GET /vehicles/{id}`, `POST /vehicles`) |

## Stack technique (§2.4)

React 18 · TypeScript · Vite · Tailwind CSS · React Router · Redux Toolkit ·
React Query · React Hook Form · Zod · Axios · Vitest + Testing Library.

## Structure du projet

```
src/
├── app/            # Providers globaux, ErrorBoundary
├── components/     # Bibliothèque de composants génériques réutilisables
├── config/         # env, client Axios
├── constants/       # Constantes applicatives
├── layouts/         # PublicLayout (Header, Footer)
├── redux/           # Store + slice de brouillon de réservation véhicule
├── routes/           # Routeur principal (branche uniquement le module vehicles)
├── types/            # Types partagés (ApiResponse…)
├── utils/            # formatCurrency, formatDate…
└── modules/
    └── vehicles/      # MODULE LOCATION DE VÉHICULES (cœur de la livraison)
        ├── components/  # VehicleCard, VehicleGallery, Availability,
        │                # BookingVehicle, Insurance, DriverOption, VehicleFilters
        ├── pages/        # Catalogue, Détails, Réservation, Paiement, Confirmation
        ├── hooks/        # useVehicles, useVehicleAvailability, useVehicleBooking
        ├── services/     # vehicles.service.ts (contrat API §6.31) + données de démo
        ├── validators/   # Schémas Zod (dates, conducteur, options)
        ├── types/        # Vehicle, VehicleBookingPayload…
        ├── constants/
        ├── routes/       # vehicles.routes.tsx
        └── tests/
```

## ⚠️ Répartition de ce package "guidé"

Dans cette version, **l'infrastructure du projet est déjà en place et fonctionnelle** :
configuration (Vite, Tailwind, TypeScript), couche `app/` (providers Redux +
React Query + ErrorBoundary), `layouts/`, bibliothèque de composants
génériques (`components/`), store Redux, routeur principal.

En revanche, **tous les fichiers de `src/modules/vehicles/` sont vides** —
c'est la partie métier "Location de Véhicules" que vous devez coder
vous-même. Chaque fichier contient en commentaire la référence exacte du
cahier des charges à respecter (ex. `§2.23`, `§4.50`) pour vous guider,
sans le code lui-même :

```
// Cahier des Charges §2.23 Composants > BookingVehicle
// Implémente le Parcours §4.50 : Dates -> Conducteur -> Assurance -> Paiement -> Contrat

// TODO : à coder par vous ✍️
```

Tant que ces fichiers ne sont pas complétés, `npm run dev` démarrera mais
la page affichera des erreurs d'import — c'est normal, complétez-les dans
cet ordre logique :
1. `types/vehicle.types.ts` (les types d'abord)
2. `constants/vehicle.constants.ts`
3. `services/vehicles.mock.ts` puis `services/vehicles.service.ts`
4. `hooks/useVehicles.ts`, `useVehicleAvailability.ts`, `useVehicleBooking.ts`
5. `validators/booking.validator.ts`
6. `components/` (VehicleCard, VehicleGallery, Availability, Insurance, DriverOption, RouteStepper, BookingVehicle, VehicleFilters)
7. `pages/` (Catalogue, Détails, Réservation, Paiement, Confirmation)
8. `routes/vehicles.routes.tsx` puis `index.ts` (le barrel export)

## Démarrage

```bash
npm install
cp .env.example .env
npm run dev
```

En développement, le service `vehicles.service.ts` utilise automatiquement
un jeu de données de démonstration (`vehicles.mock.ts`) tant que l'API
Backend NestJS (`/api/v1/vehicles`) n'est pas branchée — le contrat d'appel
est identique, il suffira de passer `USE_MOCK` à `false` en production.

## Tests

```bash
npm run test
```
