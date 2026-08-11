// Données extraites du fichier Excel de présentation des pays

export interface Pays {
  id: string;
  nom: string;
  capitale: string;
  presentation: string;
  politique: string;
  economie: string;
  culture: string;
  religion: string;
  langues: string;
}

export const pays: Pays[] = [
  {
    id: `togo`,
    nom: `Togo`,
    capitale: `Lomé`,
    presentation: `Situé en Afrique de l'Ouest, le Togo s'étire en longueur du golfe de Guinée jusqu'au Burkina Faso, sur une façade atlantique étroite d'environ 56 km. Il compte près de 8,8 millions d'habitants et partage ses frontières avec le Ghana, le Bénin et le Burkina Faso.`,
    politique: `Depuis la révision constitutionnelle de 2024, le Togo est passé d'un régime présidentiel à un régime parlementaire. Le président de la République, Jean-Lucien Savi de Tové, occupe une fonction largement honorifique depuis mai 2025. Le pouvoir exécutif réel est désormais exercé par le président du Conseil des ministres, Faure Gnassingbé, au pouvoir depuis 2005.`,
    economie: `L'économie togolaise repose sur l'agriculture (coton, café, cacao), l'exploitation des phosphates, ainsi que sur le port autonome de Lomé, l'un des plus grands ports en eau profonde d'Afrique de l'Ouest, et une zone franche industrielle dynamique. Monnaie : franc CFA (XOF).`,
    culture: `Le Togo compte une grande diversité ethnique répartie du sud au nord : Ewé et Mina sur la côte et dans les Plateaux, Kabyè et Tem au centre, Moba, Gourma et Tamberma dans les Savanes. Chaque groupe conserve des pratiques propres : l'artisanat (poterie, tissage du kente, sculpture sur bois, forge traditionnelle chez les Bassar) reste très actif, tout comme la musique (tambours parlants, balafon) et les danses rituelles (Agbadja, Adowa). La gastronomie varie fortement selon les régions : pâte de maïs ou d'igname accompagnée de sauces (gombo, arachide, tomate) sur la côte, fufu d'igname et sauces de graines de néré au centre et au nord, tchoukoutou (bière de mil traditionnelle) très présente en pays Kabyè. L'habitat traditionnel des Batammariba (tata) au nord, classé au patrimoine mondial de l'UNESCO, illustre l'ingéniosité architecturale locale.`,
    religion: `Le christianisme (catholique et protestant) domine dans le sud et les grandes villes, tandis que l'islam est plus présent au nord, notamment dans la région Kara et chez les Tem du centre. Les religions traditionnelles, en particulier le culte vaudou, restent très vivaces dans la région Maritime (Lomé, Togoville, Aného), où l'on trouve des lieux de culte actifs comme le Marché des Féticheurs d'Akodessewa. Le pays est réputé pour la richesse et la diversité de ses fêtes traditionnelles, propres à chaque région : l'Epe-Ekpé des Guin (Aného), l'Agbogbo-Za des Ewé (Kpalimé), le Gadao-Adossa des Tem (Sokodé), l'Evala et l'Akpéma des Kabyè (Kara), ou encore le Tingbanpab des Moba (Dapaong) — chacune est détaillée dans la feuille des sites touristiques.`,
    langues: `Nationale : Français (langue officielle)
Sud (Maritime, Plateaux) : Ewé, Mina
Centre (Centrale) : Tem, Kotokoli
Nord (Kara, Savanes) : Kabyè, Moba, Gourma, Tamberma`,
  },
  {
    id: `benin`,
    nom: `Bénin`,
    capitale: `Porto-Novo (capitale officielle) / Cotonou (capitale économique)`,
    presentation: `Le Bénin, environ 13 millions d'habitants, est un pays côtier d'Afrique de l'Ouest bordé par le Togo, le Burkina Faso, le Niger et le Nigeria. Il est considéré comme le berceau historique du royaume du Dahomey et du culte vaudou.`,
    politique: `République présidentielle. Romuald Wadagni est président de la République depuis le 24 mai 2026, succédant à Patrice Talon (2016-2026), à l'issue d'une élection remportée avec plus de 94 % des voix.`,
    economie: `Le coton constitue la première exportation du pays. L'économie s'appuie aussi sur le port de Cotonou, l'agriculture vivrière et un important commerce transfrontalier avec le Nigeria. Monnaie : franc CFA (XOF).`,
    culture: `Le Bénin réunit plusieurs peuples majeurs — Fon et Yoruba au sud, Bariba et Dendi au nord, Peul et Somba dans l'Atacora — chacun porteur d'un patrimoine culturel distinct. Le pays est reconnu comme le berceau historique du royaume du Dahomey, dont témoignent les bronzes et appliqués d'Abomey, les tissus brodés et la statuaire royale. L'habitat traditionnel Tata Somba, maison-forteresse en terre à étage typique de l'Atacora, constitue un autre symbole architectural fort. Sur le plan culinaire, la cuisine du sud met à l'honneur l'akassa (pâte de maïs fermenté), la sauce crin-crin et le poisson fumé, tandis que le nord privilégie le tô (pâte de mil ou de sorgho), le wagashi (fromage peul) et le gibier. Les cérémonies Guèlèdè de Porto-Novo, inscrites à l'UNESCO, illustrent la vitalité des arts du masque dans le sud-est du pays.`,
    religion: `Le vaudou occupe une place centrale et officiellement reconnue dans la spiritualité béninoise : il est célébré chaque 10 janvier lors de la Fête Internationale du Vaudou (Vodun Days) à Ouidah, berceau historique de ce culte, où se déroulent rituels, danses masquées et cérémonies au Temple des Pythons et dans la Forêt Sacrée de Kpassè. Le christianisme domine dans le sud du pays et l'islam est davantage présent dans le nord, notamment chez les Bariba et les Dendi. Les fêtes traditionnelles varient fortement selon les régions : Awilé à Ganvié, Nonvitcha à Grand-Popo, Guèlèdè et Fête des Masques à Porto-Novo, rites du peuple Somba autour des Tata de Natitingou — chacune est détaillée dans la feuille des sites touristiques.`,
    langues: `Nationale : Français (langue officielle)
Sud (Littoral, Atlantique, Ouémé, Zou) : Fon, Yoruba, Mina
Nord (Atacora, Borgou, Alibori) : Bariba, Dendi, Ditamari, Peul (Fulfulde)`,
  },
  {
    id: `niger`,
    nom: `Niger`,
    capitale: `Niamey`,
    presentation: `Vaste pays sahélien enclavé d'Afrique de l'Ouest, en grande partie désertique (le Sahara couvre le nord du territoire), le Niger compte environ 26 millions d'habitants et partage ses frontières avec sept pays, dont le Mali, l'Algérie, la Libye, le Tchad, le Nigeria, le Bénin et le Burkina Faso.`,
    politique: `Le Niger traverse une période de transition militaire depuis le coup d'État du 26 juillet 2023. Le Général d'Armée Abdourahamane Tiani, chef du CNSP, a été investi président de la République pour un mandat de cinq ans le 26 mars 2025. Le Niger est membre fondateur, avec le Mali et le Burkina Faso, de l'Alliance des États du Sahel (AES).`,
    economie: `Le Niger est l'un des principaux producteurs mondiaux d'uranium. L'économie repose aussi sur l'élevage pastoral, l'agriculture (mil, sorgho) et, plus récemment, l'exploitation pétrolière. Monnaie : franc CFA (XOF).`,
    culture: `Le Niger rassemble plusieurs peuples aux modes de vie contrastés : les Haoussa, agriculteurs sédentaires majoritaires au centre-sud ; les Zarma-Songhaï le long du fleuve Niger ; les Touaregs et Toubous, traditionnellement nomades, dans le nord désertique ; les Peuls, éleveurs présents sur l'ensemble du territoire. L'artisanat touareg (bijoux en argent, maroquinerie, selles de chameau ouvragées) est réputé bien au-delà des frontières nigériennes. La gastronomie reflète ce partage entre sédentaires et pasteurs : riz au gras et sauces épicées à Niamey et Zinder, couscous de mil accompagné de viande de chèvre ou de chameau dans le nord, lait caillé et dattes chez les éleveurs touaregs et peuls. La transmission orale (griots, contes) et la poésie touarègue occupent une place importante dans la vie culturelle du pays.`,
    religion: `L'islam est très largement majoritaire (plus de 90 % de la population), avec une forte présence de confréries soufies (Tidjaniyya, Qadiriyya) qui structurent la vie religieuse quotidienne. Les grandes fêtes musulmanes (Aïd el-Fitr, Aïd el-Kébir, Maouloud) rythment le calendrier national, avec des célébrations particulièrement fastueuses à Niamey et un Grand Sallah traditionnel organisé par le Sultanat de Zinder, avec parades de cavalerie. Le christianisme reste minoritaire. Sur le plan traditionnel, la Cure Salée (Ingall, région d'Agadez) est le grand rendez-vous culturel et pastoral annuel du pays, réunissant Touaregs et Peuls autour de rites liés à l'élevage, aux côtés du Festival de l'Aïr qui met à l'honneur les parades touarègues.`,
    langues: `Nationale : Français (langue officielle)
Maradi, Zinder, Dosso (centre-sud) : Haoussa (la plus parlée)
Niamey, Tillabéri (fleuve Niger) : Zarma-Songhaï
Agadez (nord) : Tamasheq (Touareg), Toubou
Ensemble du territoire (éleveurs) : Fulfulde (Peul)`,
  },
  {
    id: `burkina-faso`,
    nom: `Burkina Faso`,
    capitale: `Ouagadougou`,
    presentation: `Pays sahélien enclavé d'Afrique de l'Ouest, le Burkina Faso compte environ 23 millions d'habitants et partage ses frontières avec le Mali, le Niger, le Bénin, le Togo, le Ghana et la Côte d'Ivoire. Son nom signifie « la patrie des hommes intègres ».`,
    politique: `Le pays traverse une période de transition militaire depuis le coup d'État de septembre 2022. Le Capitaine Ibrahim Traoré, président de la transition et chef de l'État, dirige le pays à la tête du Mouvement Patriotique pour la Sauvegarde et la Restauration (MPSR). Le Burkina Faso est membre fondateur, avec le Mali et le Niger, de l'Alliance des États du Sahel (AES), née en 2023.`,
    economie: `L'économie burkinabè repose principalement sur l'or (premier produit d'exportation depuis plusieurs années), le coton (l'un des premiers producteurs africains) et l'élevage. L'agriculture vivrière (mil, sorgho, maïs) occupe la majorité de la population active. Monnaie : franc CFA (XOF).`,
    culture: `Le Burkina Faso compte une soixantaine de groupes ethniques, dont les Mossi (majoritaires, au centre), les Bobo et Dioula (ouest), les Lobi et Birifor (sud-ouest), les Sénoufo (ouest), les Gourmantché (est) et les Peul et Touareg (nord, Sahel). L'artisanat régional est réputé : masques et statuaire bobo et lobi, bronzes, tissage du faso dan fani. Le pays est aussi connu pour le FESPACO, le plus grand festival de cinéma d'Afrique, organisé tous les deux ans à Ouagadougou, ainsi que pour l'architecture traditionnelle peinte des cours royales Kassena de Tiébélé.`,
    religion: `L'islam est majoritaire (environ 60 % de la population), le christianisme (catholique et protestant) est bien implanté notamment chez les Mossi et dans le sud-ouest, et les religions traditionnelles restent très vivaces, en particulier chez les Bobo et les Lobi, où cultes des masques et rites liés aux forces de la nature (mares sacrées, bois sacrés) continuent d'être pratiqués aux côtés des grandes religions. Les fêtes traditionnelles varient fortement selon les régions et sont détaillées dans la feuille des sites touristiques.`,
    langues: `Nationale : Français (langue officielle)
Centre (Ouagadougou, Plateau-Central) : Mooré (Mossi, la plus parlée)
Ouest (Hauts-Bassins, Cascades) : Dioula, Bobo, Sénoufo
Sud-Ouest : Lobiri (Lobi), Birifor
Est : Gourmantchéma
Sahel (nord) : Fulfulde (Peul), Tamasheq (Touareg)`,
  },
  {
    id: `guinee`,
    nom: `Guinée`,
    capitale: `Conakry`,
    presentation: `Pays côtier d'Afrique de l'Ouest d'environ 14 millions d'habitants, surnommé le « château d'eau de l'Afrique de l'Ouest ». La Guinée se compose de quatre régions naturelles : Basse-Guinée, Moyenne-Guinée (Fouta-Djalon), Haute-Guinée et Guinée forestière.`,
    politique: `Le pays est en transition depuis le coup d'État du 5 septembre 2021 contre Alpha Condé. Le Général Mamadi Doumbouya a été élu président avec 86,72 % des voix le 28 décembre 2025, et investi le 17 janvier 2026 pour un mandat de sept ans.`,
    economie: `La Guinée détient parmi les plus grandes réserves mondiales de bauxite, ainsi que des gisements d'or et de diamant. Le projet minier de fer de Simandou est appelé à transformer l'économie du pays. Monnaie : franc guinéen (GNF).`,
    culture: `La Guinée abrite les Peul du Fouta-Djalon, les Malinké de Haute-Guinée, les Soussou de la façade côtière et divers peuples forestiers (Kpèlè, Toma, Kissi). La tradition musicale y est particulièrement riche : griots mandingues, orchestres nationaux comme Les Ballets Africains ou Les Percussions de Guinée, danse Mamaya symbole d'union sociale à Kankan. Sur le plan culinaire, le Fouta-Djalon, région d'élevage, valorise le lait et les produits laitiers peuls ainsi que le fonio ; la Haute-Guinée propose un riz au gras mandingue accompagné de sauce à l'arachide ; la Guinée forestière, plus boisée, cuisine igname, riz et sauce feuille, souvent relevés de gibier. Les sociétés initiatiques forestières (dont le Poro) structurent encore la vie sociale de plusieurs peuples du sud du pays.`,
    religion: `L'islam est très largement majoritaire (85 à 90 % de la population), en particulier dans le Fouta-Djalon, région à forte tradition religieuse peule où les grandes fêtes musulmanes (Aïd, Maouloud) sont particulièrement suivies. Le christianisme est plus présent en Guinée forestière, où coexistent religions traditionnelles et rites d'initiation des sociétés secrètes, dont le Poro, qui demeurent très vivaces chez les peuples Kpèlè, Toma et Kissi. La Fête nationale de l'Indépendance (2 octobre) et le Festival National des Arts et de la Culture (FENAC) complètent ce calendrier, aux côtés d'événements plus locaux comme la Grande Mamaya de Kankan ou le Carnaval de Nzérékoré, qui marque l'ouverture de la saison touristique en Guinée forestière.`,
    langues: `Nationale : Français (langue officielle)
Fouta-Djalon (Moyenne-Guinée) : Pular (Fulfulde)
Haute-Guinée : Maninka (Malinké)
Basse-Guinée / Conakry : Soussou
Guinée forestière : Kissi, Kpèlè, Toma`,
  },
  {
    id: `cote-d-ivoire`,
    nom: `Côte d'Ivoire`,
    capitale: `Yamoussoukro (capitale politique) / Abidjan (capitale économique)`,
    presentation: `Avec près de 30 millions d'habitants, la Côte d'Ivoire est la première économie de l'UEMOA et le premier producteur mondial de cacao.`,
    politique: `République. Alassane Ouattara a été réélu président de la République le 25 octobre 2025 pour un quatrième mandat. Robert Beugré Mambé occupe le poste de Premier ministre.`,
    economie: `L'économie repose sur le cacao (premier rang mondial), le café, l'huile de palme, et sur le port autonome d'Abidjan. Monnaie : franc CFA (XOF).`,
    culture: `Plus de 60 groupes ethniques se répartissent en quatre grandes familles : Akan (Baoulé, Agni) au centre-est, Krou (Bété, Dan, Wè) au sud-ouest, Mandé au nord-ouest et Voltaïque/Gur (Sénoufo, Lobi) au nord. Les masques traditionnels — notamment les masques Dan de la région de Man et les masques Sénoufo du nord — ainsi que la statuaire baoulé sont réputés dans le monde entier et exposés dans de grands musées internationaux. Côté gastronomie, l'attiéké (semoule de manioc) accompagné de poisson braisé est le plat le plus emblématique du pays, aux côtés du kedjenou (poulet ou gibier mijoté à l'étouffée), de l'alloco (banane plantain frite) et du garba (thon frit et attiéké, plat de rue très populaire à Abidjan). Le nord et l'ouest montagneux, plus proches des traditions Sénoufo et Dan/Wè, privilégient l'igname, le riz et la sauce graine.`,
    religion: `Christianisme et islam se partagent une place à peu près équivalente au sein de la population, avec de grandes célébrations chrétiennes (Noël, Pâques) à la Basilique Notre-Dame de la Paix de Yamoussoukro et à la Cathédrale Saint-Paul d'Abidjan. Les religions traditionnelles restent très influentes, notamment à travers les cultes liés aux masques (Dan, Sénoufo) et les rites d'initiation, dont le Poro chez les Sénoufo du nord et dans la région forestière de Taï. Le calendrier culturel et religieux du pays est particulièrement riche : Abissa à Grand-Bassam (pardon et réconciliation, peuple N'zima), Fête des Masques à Man (peuples Dan et Wè), Fête des Ignames dans la région de Bouna (Koulango, Agni, Abron), et le MASA, grand rendez-vous culturel biennal organisé à Abidjan.`,
    langues: `Nationale : Français (langue officielle)
Ensemble du territoire (véhiculaire) : Dioula
Centre (Akan) : Baoulé, Agni
Sud-Ouest (Krou) : Bété, Dan
Nord (Voltaïque/Gur) : Sénoufo, Lobi`,
  },
];
