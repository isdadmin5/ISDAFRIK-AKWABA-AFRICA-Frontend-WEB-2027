import type { Restaurant } from "./restaurant.types";

export const restaurants: Restaurant[] = [
  {
    id: "le-phenicien",
    name: "Le Phénicien",
    category: "Méditerranéenne, Grillades, Française",
    ambiance: "African Chic",
    description: "Cuisine raffinée et ambiance cosy au cœur de Lomé.",
    fullDescription: 'Situé au cœur de Lomé, Le Phénicien redéfinit l\'excellence culinaire. Sous la direction du Chef Alain Mensah, notre établissement fusionne les techniques françaises classiques avec les saveurs vibrantes de la côte ouest-africaine et de la Méditerranée. Profitez d\'une ambiance "African Chic" sophistiquée, parfaite pour vos déjeuners d\'affaires ou soirées romantiques.',
    location: "Lomé, Togo",
    address: "Avenue Sylvanus Olympio, Lomé",
    city: "Lomé",
    country: "Togo",
    price: "18 000 FCFA / personne",
    averagePriceNum: 18000,
    rating: 4.9,
    reviewsCount: 1264,
    open: true,
    openingHours: "11:30 - 23:30 (Tous les jours)",
    phone: "+228 90 12 34 56",
    popularity: "Très populaire",
    tags: ["Terrasse", "Menu dégustation", "Vin premium", "Romantique"],
    amenities: ["Terrasse extérieure", "Climatisation", "Parking privé gardé", "Accès PMR", "Wifi haut débit", "Espace fumeur séparé"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    chef: {
      name: "Chef Alain Mensah",
      subtitle: "15 ans d'expérience • Ancien Chef Étoilé Michelin",
      title: "Spécialiste Gastronomie Fusion",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
    },
    menu: [
      {
        id: "m1",
        name: "Duo de Mezze Signature",
        category: "Entrées",
        price: 6500,
        description: "Houmous à l'huile d'argan, caviar d'aubergine fumé et pain pita maison.",
        image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
        badge: "SIGNATURE",
        prepTime: "15 min",
        calories: "350 kcal",
        isVegetarian: true,
        tags: ["Spécialité Chef", "Halal"]
      },
      {
        id: "m2",
        name: "Gambas au Pastis",
        category: "Entrées",
        price: 9500,
        description: "Crevettes géantes flambées, crème de fenouil et piment oiseau séché.",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        badge: "ÉPICÉ",
        prepTime: "12 min",
        calories: "280 kcal",
        tags: ["Best seller", "Seafood"]
      },
      {
        id: "m3",
        name: "Grillades Mixtes d'Orient",
        category: "Plats Principaux",
        price: 16500,
        description: "Brochettes de taouk persillé, kfta d'agneau et filet de bœuf grillé au feu de bois avec riz basmati aromatisé.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        badge: "GRILLADE",
        prepTime: "25 min",
        calories: "620 kcal",
        tags: ["Best seller", "Grillade"]
      },
      {
        id: "m4",
        name: "Baklawa Maison & Glace Fleur d'Oranger",
        category: "Desserts",
        price: 4500,
        description: "Feuilleté aux pistaches caramélisées servi avec une boule de glace artisanale à la fleur d'oranger.",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
        badge: "FAIT MAISON",
        prepTime: "10 min",
        calories: "310 kcal",
        tags: ["Fait maison"]
      }
    ],

    reviews: [
      { id: "r1", userName: "Koffi Mensah", rating: 5, date: "10 Août 2026", comment: "Un cadre idyllique pour un dîner en amoureux. Les grillades sont tendres et le service irréprochable !" },
      { id: "r2", userName: "Awa Diop", rating: 5, date: "02 Août 2026", comment: "Le meilleur mezzé de tout Lomé. Tout était frais et délicieux. Mention spéciale au tajine et aux falafels." },
      { id: "r3", userName: "Jean-Pierre Laurent", rating: 4.5, date: "24 Juillet 2026", comment: "Superbe expérience culinaire. La terrasse vue jardin est magnifique le soir." }
    ]
  },
  {
    id: "la-cabane-du-pecheur",
    name: "La Cabane du Pêcheur",
    category: "Poissons, Fruits de mer, Grillades",
    ambiance: "Vue mer",
    description: "Saveurs marines exceptionnelles et vue panoramique sur l'océan.",
    fullDescription: "Niché en bordure de la falaise des Almadies à Dakar, La Cabane du Pêcheur propose une expérience culinaire iodée hors du commun. Dégustez la pêche fraîche du jour les pieds pratiquement dans l'eau au son des vagues de l'Atlantique.",
    location: "Almadies, Dakar, Sénégal",
    address: "Pointe des Almadies, Dakar",
    city: "Dakar",
    country: "Sénégal",
    price: "25 000 FCFA / pers",
    averagePriceNum: 25000,
    rating: 4.8,
    reviewsCount: 95,
    open: true,
    openingHours: "12:00 - 00:00 (Tous les jours)",
    phone: "+221 33 820 11 22",
    popularity: "Ambiance bord de mer",
    tags: ["Vue mer", "Poissons frais", "Cocktails", "Coucher de soleil"],
    amenities: ["Vue mer à 180°", "Terrasse panoramique", "Bar à cocktails", "Voiturier", "Wifi", "Animation musicale live (jeudi & samedi)"],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    menu: [
      { id: "m6", name: "Plateau du Pêcheur Royal", category: "Entrées", price: 18000, description: "Langoustes grillées, huîtres de Joal, crevettes géantes sautées à l'ail et ceviche de thiof.", tags: ["Partage", "Fruits de mer"] },
      { id: "m7", name: "Thiof Rôti entier à la Sénégalaise", category: "Plats Principaux", price: 16000, description: "Le célèbre mérou blanc mariné aux piments doux, condiments roff et accompagné d'allocos dorés.", tags: ["Spécialité locale"] },
      { id: "m8", name: "Brochette de Lotte & Gambas", category: "Plats Principaux", price: 15500, description: "Lotte marinée aux herbes fraîches et gambas flambées au pastis sur lit de riz cassé.", tags: ["Grillade"] },
      { id: "m9", name: "Tarte Tatin Mangue-Passion", category: "Desserts", price: 4500, description: "Mangues caramélisées du Sénégal sur pâte feuilletée pur beurre et coulis de fruit de la passion.", tags: ["Dessert maison"] }
    ],
    reviews: [
      { id: "r4", userName: "Fatou Ndiaye", rating: 5, date: "11 Août 2026", comment: "Vue imprenable sur le coucher de soleil ! Le thiof grillé est une pure merveille." },
      { id: "r5", userName: "Marc Antoine", rating: 4.8, date: "05 Août 2026", comment: "Ambiance marine magique. Les fruits de mer sont frais et l'équipe est aux petits soins." }
    ]
  },
  {
    id: "saakan",
    name: "Saakan",
    category: "Africaine, Gastronomique, Grillades",
    ambiance: "Affaires",
    description: "Expérience gastronomique haut de gamme réinventant les classiques africains.",
    fullDescription: "Saakan est une institution culinaire au Plateau d'Abidjan. Le Chef réinvente la cuisine africaine avec une élégance contemporaine hors pair : sauce graine déstructurée, kedjenou revisité, et viandes de qualité supérieure.",
    location: "Le Plateau, Abidjan, Côte d'Ivoire",
    address: "Avenue Chardy, Le Plateau, Abidjan",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    price: "35 000 FCFA / pers",
    averagePriceNum: 35000,
    rating: 4.7,
    reviewsCount: 140,
    open: true,
    openingHours: "12:00 - 15:00, 19:00 - 23:00 (Fermé dimanche soir)",
    phone: "+225 27 20 22 33 44",
    popularity: "Très demandé",
    tags: ["Chef étoilé", "Menu dégustation", "Salon privé", "Affaires"],
    amenities: ["Salons privatifs réservables", "Cave à vin d'exception", "Service voiturier", "Climatisation intégrale", "Wifi très haut débit"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    menu: [
      { id: "m10", name: "Duo d'Attiéké Snacké & Thon Rouge", category: "Entrées", price: 9500, description: "Tartare de thon frais assaisonné au piment espelette africain et croquant d'attiéké bio.", tags: ["Signature Chef"] },
      { id: "m11", name: "Kedjenou de Poulet Fermier en Canari", category: "Plats Principaux", price: 18500, description: "Poulet fermier mijoté à l'étouffée avec tomate fraîche, aubergine africaine et piments doux.", tags: ["Tradition revisité"] },
      { id: "m12", name: "Côte de Bœuf Grillée aux Épices Kankan", category: "Plats Principaux", price: 24000, description: "Bœuf sélectionné de 450g grillé au charbon de bois, beurre manié aux épices kankan et frites de patate douce.", tags: ["Grillade d'exception"] }
    ],
    reviews: [
      { id: "r6", userName: "Yves Bamba", rating: 5, date: "09 Août 2026", comment: "Le cadre parfait pour nos déjeuners d'affaires. La cuisine est raffinée et le personnel d'un grand professionnalisme." }
    ]
  },
  {
    id: "le-verdoyant",
    name: "Le Verdoyant",
    category: "Française, Européenne, Grillades",
    ambiance: "Familial",
    description: "Cuisine généreuse servie dans un cadre verdoyant et paisible.",
    fullDescription: "Une oasis de verdure en plein centre de Ouagadougou. Le Verdoyant propose une cuisine généreuse alliant recettes françaises traditionnelles et grillades savoureuses au milieu de baobabs et palmiers centenaires.",
    location: "Koulouba, Ouagadougou, Burkina Faso",
    address: "Avenue de l'Indépendance, Ouagadougou",
    city: "Ouagadougou",
    country: "Burkina Faso",
    price: "18 000 FCFA / pers",
    averagePriceNum: 18000,
    rating: 4.6,
    reviewsCount: 82,
    open: true,
    openingHours: "11:00 - 23:00 (Tous les jours)",
    phone: "+226 25 30 40 50",
    popularity: "Cadre chaleureux",
    tags: ["Jardin", "Plats traditionnels", "Familial", "Terrasse"],
    amenities: ["Grand jardin ombragé", "Aire de jeux enfants", "Parking sécurisé", "Wifi", "Terrasse couverte"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    menu: [
      { id: "m13", name: "Salade Gourmande du Verdoyant", category: "Entrées", price: 6500, description: "Mésclun de saison, gésiers confits, magret fumé et noix de cajou torréfiées.", tags: ["Entrée fraîcheur"] },
      { id: "m14", name: "Filet de Capitaine Sauce Périgourdine", category: "Plats Principaux", price: 13500, description: "Poisson frais des fleuves du Burkina servi avec mousseline de patate douce et sauce aux champignons.", tags: ["Plat signature"] }
    ],
    reviews: [
      { id: "r7", userName: "Salif Sawadogo", rating: 4.5, date: "01 Août 2026", comment: "Superbe cadre ombragé pour sortir en famille le dimanche. Plats très copieux." }
    ]
  },
  {
    id: "le-samet-gourmet",
    name: "Le Samet Gourmet",
    category: "Cuisine locale, Gastronomie",
    ambiance: "Dîner",
    description: "Les meilleures recettes gastronomiques sublimées par un chef passionné.",
    fullDescription: "Situé à Lomé, Le Samet Gourmet est l'adresse incontournable des gourmets à la recherche de saveurs togolaises et ouest-africaines réhaussées au niveau des grands restaurants gastronomiques mondiaux.",
    location: "Nyékonakpoè, Lomé, Togo",
    address: "Rue du Commerce, Lomé",
    city: "Lomé",
    country: "Togo",
    price: "22 000 FCFA / pers",
    averagePriceNum: 22000,
    rating: 4.8,
    reviewsCount: 110,
    open: true,
    openingHours: "18:30 - 23:30 (Mardi au Dimanche)",
    phone: "+228 92 11 22 33",
    popularity: "Favori des visiteurs",
    tags: ["Dîner", "Spécialités locales", "Service d'exception", "Gastronomique"],
    amenities: ["Cadre feutré", "Sommelier disponible", "Climatisation", "Réservation obligatoire", "Voiturier"],
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    menu: [
      { id: "m15", name: "Fufu Rôti & Jus Truffé à l'Agouti", category: "Plats Principaux", price: 17500, description: "Fufu traditionnel façon quenelle dorée au beurre, viande confite 12 heures et jus réduit aux épices.", tags: ["Spécialité Togo"] }
    ],
    reviews: [
      { id: "r8", userName: "Ablavi Lawson", rating: 5, date: "07 Août 2026", comment: "Créativité culinaire impressionnante ! Le chef fait des merveilles avec les produits locaux." }
    ]
  },
  {
    id: "villa-savannah",
    name: "Villa Savannah",
    category: "International, Bar & Lounge",
    ambiance: "Romantique",
    description: "Élégance raffinée, cocktails créatifs et gastronomie fusion.",
    fullDescription: "Une magnifique villa bourgeoise rénovée avec piscine illuminée, banquettes confortables et bar à cocktails au milieu d'un jardin tropical chic à Cocody Abidjan.",
    location: "Cocody Ambassades, Abidjan, Côte d'Ivoire",
    address: "Boulevard de France, Cocody, Abidjan",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    price: "28 000 FCFA / pers",
    averagePriceNum: 28000,
    rating: 4.8,
    reviewsCount: 95,
    open: true,
    openingHours: "17:00 - 02:00 (Tous les jours)",
    phone: "+225 07 08 09 10 11",
    popularity: "Incontournable",
    tags: ["Piscine", "Cocktails lounge", "Terrasse", "Romantique"],
    amenities: ["Bord de piscine", "DJ résident lounge", "Barman mixologue", "Valet parking", "Espace privatifiable"],
    image: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    menu: [
      { id: "m16", name: "Tapas Fusion Savannah (12 pièces)", category: "Entrées", price: 14000, description: "Nems de banane plantain au canard, brochettes yakitori et beignets d'aloco crémeux.", tags: ["Lounge"] }
    ],
    reviews: [
      { id: "r9", userName: "Franck Kouassi", rating: 4.9, date: "04 Août 2026", comment: "Ambiance magique autour de la piscine. Les cocktails sont fabuleux." }
    ]
  },
  {
    id: "skyline-lounge",
    name: "Skyline Lounge",
    category: "Rooftop, Gastronomie, Vue mer",
    ambiance: "Vue mer",
    description: "Vue panoramique à 360° sur Lomé, cocktails d'exception et tapas gastronomiques.",
    fullDescription: "Perché au 12ème étage au-dessus de la marina de Lomé, Skyline Lounge offre une vue à couper le souffle sur le Golfe de Guinée. Idéal pour admirer le coucher de soleil tout en savourant une cuisine inventive.",
    location: "Marina, Lomé, Togo",
    address: "Boulevard du 13 Janvier, Lomé",
    city: "Lomé",
    country: "Togo",
    price: "30 000 FCFA / pers",
    averagePriceNum: 30000,
    rating: 4.9,
    reviewsCount: 88,
    open: true,
    openingHours: "17:00 - 01:00 (Tous les jours)",
    phone: "+228 93 44 55 66",
    popularity: "Tendance top 1",
    tags: ["Rooftop", "Vue mer", "DJ Set", "Cocktails"],
    amenities: ["Vue panoramique 360°", "Ascenseur panoramique", "DJ lounge live", "Bar à champagne", "Wifi"],
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    menu: [
      { id: "m17", name: "Cocktail Sunset Skyline & Caviar d'Escargot", category: "Boissons & Cocktails", price: 8000, description: "Champagne millésimé, fruit de la passion, feuille d'or et mise en bouche délicate.", tags: ["Luxe"] }
    ],
    reviews: [
      { id: "r10", userName: "Elodie Dossou", rating: 5, date: "12 Août 2026", comment: "La plus belle vue de tout le Togo ! Les soirées rooftop y sont inoubliables." }
    ]
  }
];
