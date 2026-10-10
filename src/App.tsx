import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  Search, 
  Copy, 
  Check, 
  Scale, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Building2, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  BookmarkCheck,
  Languages
} from 'lucide-react';

interface TabType {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'transcription' | 'methodology' | 'criteres' | 'quiz' | 'fiches'>('transcription');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const tabs: TabType[] = [
    { id: 'transcription', label: 'Transcription Structurée', icon: <FileText className="w-4 h-4" /> },
    { id: 'methodology', label: 'Guide Méthodologique', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'criteres', label: 'Anomalies vs Irrégularités', icon: <Scale className="w-4 h-4" /> },
    { id: 'fiches', label: 'Fiche Synthétique & Forme (6 pts)', icon: <Award className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz d\'Entraînement', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const quizQuestions = [
    {
      id: 1,
      title: "Passation d'un marché sans appel d'offres en violation de l'article 53 du Code des marchés publics par le DG 'X' (période 2016-2018), passible de sanctions selon la loi.",
      options: [
        { label: "Irrégularité", value: "irreg", correct: true },
        { label: "Anomalie / Manquement", value: "anom", correct: false }
      ],
      explanation: "C'est une irrégularité car les 3 critères cumulatifs sont réunis : violation d'un texte précis, personne responsable formellement identifiée (DG 'X' durant son mandat), et sanction légale/réglementaire prévue."
    },
    {
      id: 2,
      title: "Absence de contrat de performance entre l'État et une société nationale contrôlée.",
      options: [
        { label: "Irrégularité", value: "irreg", correct: false },
        { label: "Anomalie / Manquement", value: "anom", correct: true }
      ],
      explanation: "C'est une anomalie (manquement organisationnel) : il n'y a pas de sanction répressive directe ou personnelle prévue contre un individu spécifique. Elle donne lieu à une recommandation visant à rationaliser et contractualiser les objectifs."
    },
    {
      id: 3,
      title: "Organigramme archaïque et anachronique ne reflétant plus les missions réelles de l'agence d'exécution.",
      options: [
        { label: "Irrégularité", value: "irreg", correct: false },
        { label: "Anomalie / Manquement", value: "anom", correct: true }
      ],
      explanation: "C'est une anomalie structurelle majeure qui porte atteinte à la performance et à la clarté hiérarchique. Elle exige une recommandation urgente de réactualisation et d'approbation d'un nouvel organigramme."
    },
    {
      id: 4,
      title: "Sur les 17 anomalies et 17 irrégularités relevées au brouillon préliminaire, combien devez-vous en traiter au maximum dans votre note de synthèse ?",
      options: [
        { label: "Toutes (les 34)", value: "all", correct: false },
        { label: "4 à 5 anomalies et 4 à 5 irrégularités majeures", value: "priorite", correct: true },
        { label: "1 seule de chaque", value: "one", correct: false }
      ],
      explanation: "La contrainte impérative d'espace (4 pages au total, dont 3 pour la note et 1 pour la lettre de transmission) impose une priorisation rigoureuse selon l'ordre de gravité et l'enjeu financier pour ne retenir que 4 à 5 cas majeurs."
    },
    {
      id: 5,
      title: "Que risque un candidat qui demande et utilise un intercalaire alors que la consigne exige de se limiter à la copie double ?",
      options: [
        { label: "Une pénalité de 2 points", value: "penalite", correct: false },
        { label: "Le rejet pur et simple ou l'annulation de sa copie (inaptitude à respecter la consigne)", value: "elimination", correct: true },
        { label: "Aucun risque si le contenu est excellent", value: "rien", correct: false }
      ],
      explanation: "Comme martelé par le formateur : le jury applique scrupuleusement la consigne. Dépasser les 4 pages ou insérer un intercalaire interdit conduit directement à l'écartement de la copie."
    }
  ];

  const handleQuizSelect = (qId: number, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      const correctOpt = q.options.find(o => o.correct)?.value;
      if (quizAnswers[q.id] === correctOpt) score++;
    });
    setQuizScore(score);
  };

  const copyTranscriptionToClipboard = () => {
    navigator.clipboard.writeText(fullTextTranscription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Banner */}
      <header className="border-b border-emerald-900/40 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-lg shadow-emerald-900/30 border border-emerald-500/30">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  Concours de la Cour des comptes du Sénégal
                </span>
                <span className="text-xs text-amber-400 font-medium hidden sm:inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Préparation Officielle
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Méthodologie de la Note de Synthèse & Lettre de Transmission
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyTranscriptionToClipboard}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-emerald-950 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Texte copié !' : 'Copier la transcription'}
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-1 py-1 border-t border-slate-800/80 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* TAB 1: TRANSCRIPTION STRUCTURÉE */}
        {activeTab === 'transcription' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header info badge */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-800/50 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Séance magistrale de préparation
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Transcription Pédagogique Intégrale & Nettoyée
                  </h2>
                  <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                    Intervention du formateur expert <strong>Pr. Thimbo Al Hassane</strong> et échanges avec les auditeurs (Diénaba Bâ, Pape Dieng, Boubacar Diop, Amidou Kane, Ndiogou Sylla, Ousmane Guey). Hésitations orales purgées, passages en <strong>wolof traduits et intégrés</strong>, notions juridiques et financières surlignées en gras.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start md:self-center">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Rechercher une notion..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-52 sm:w-64"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Card Styled like an Official Legal Course */}
            <article className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 leading-relaxed text-slate-200">
              
              <div className="border-b border-slate-800 pb-6 text-center space-y-2">
                <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                  RÉPUBLIQUE DU SÉNEGAL • COUR DES COMPTES
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
                  PRÉPARATION AU CONCOURS DE RECRUTEMENT DE LA COUR DES COMPTES
                </h1>
                <p className="text-sm text-slate-400 font-medium">
                  Module : Méthodologie Complète de la <strong>Note de Synthèse</strong> et de la <strong>Lettre de Transmission</strong>
                </p>
              </div>

              {/* SECTION I */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                    I
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Introduction générale et enjeux de l’épreuve pratique
                  </h2>
                </div>
                <div className="text-slate-300 space-y-3 pl-11 text-sm sm:text-base">
                  <p>
                    À la différence de la <strong>dissertation juridique ou économique</strong>, qui constitue une épreuve fondamentalement théorique et académique, l’exercice de la <strong>Note de synthèse</strong> au concours de la <strong>Cour des comptes du Sénégal</strong> (vérificateurs et magistrats) est une épreuve rigoureusement <strong>pratique et professionnelle</strong>.
                  </p>
                  <p>
                    Dans l'exercice quotidien de ses fonctions de contrôle juridictionnel ou non juridictionnel, le <strong>magistrat de la Cour des comptes</strong> ou le <strong>vérificateur</strong> est constamment appelé à instruire des rapports de contrôle, à analyser les comptes des <strong>ordonnateurs</strong> et <strong>comptables publics</strong>, et à synthétiser des dossiers volumineux (sociétés nationales, agences d'exécution, établissements publics de santé, collectivités territoriales ou ministères sectoriels).
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-900/40 text-sm space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <Languages className="w-4 h-4" />
                      <span>Éclairage pédagogique & traduction contextuelle du wolof</span>
                    </div>
                    <p className="text-slate-300 italic">
                      Le formateur rappelle avec insistance : <em>« Du ay caaxaan, da ngeen wara rentabiliser séén copie »</em> (« Ce n’est point un jeu ou un exercice de style abstrait, vous devez optimiser et rentabiliser chaque ligne de votre copie »). L’épreuve exige une <strong>économie stricte de l’espace</strong> et une <strong>gestion millimétrée du temps</strong>.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION II */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                    II
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    La structure formelle de la Note de Synthèse
                  </h2>
                </div>
                <div className="text-slate-300 space-y-3 pl-11 text-sm sm:text-base">
                  <p>
                    La <strong>Note de synthèse</strong> repose sur un équilibre binaire classique, mais comporte des spécificités fondamentales quant aux articulations :
                  </p>

                  <h3 className="text-lg font-semibold text-emerald-300 pt-2">
                    1. L'absence formelle de conclusion
                  </h3>
                  <p>
                    Contrairement à la dissertation, la <strong>Note de synthèse ne comporte pas de conclusion</strong> (sauf demande formelle et expresse dans le libellé du sujet). La note est par définition la synthèse et la conclusion même du dossier analysé. Ajouter une conclusion autonome constitue une redondance fautive et entraîne une déperdition d'espace précieux.
                  </p>

                  <h3 className="text-lg font-semibold text-emerald-300 pt-2">
                    2. L’Introduction en trois temps obligatoires
                  </h3>
                  <p>
                    L’introduction doit être rédigée sous la forme de <strong>trois paragraphes distincts</strong> bien matérialisés visuellement (retrait/alinéa net de 2 à 3 carreaux) :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
                    <li>
                      <strong>Premier paragraphe — Présentation de la structure contrôlée :</strong> Cadre juridique de création (loi ou décret de création), missions statutaires fondamentales, et statut juridique (société nationale, agence, établissement public, etc.). Cette présentation doit demeurer sobre et concise (maximum 3 à 4 lignes).
                    </li>
                    <li>
                      <strong>Deuxième paragraphe — Période sous revue et personnes dirigeantes :</strong> Rappel précis des exercices budgétaires et comptables audités (ex. : <em>« Durant la période sous revue allant de 2015 à 2018 »</em>) et identification des dirigeants (organes délibérants et exécutifs : Directeurs généraux, Présidents de conseil d'administration) avec leur <strong>intervalle exact de fonction</strong>.
                    </li>
                    <li>
                      <strong>Troisième paragraphe — Annonce du plan :</strong> L’annonce doit découler scrupuleusement de la consigne (ex. : <em>« La présente note s'articulera autour de deux axes : d'une part, l'examen des anomalies assorties de recommandations (I), et d'autre part, la mise en évidence des irrégularités, des personnes responsables et des sanctions encourues (II). »</em>).
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-emerald-300 pt-2">
                    3. La règle typographique des sauts de ligne
                  </h3>
                  <p>
                    Pour respecter la limitation stricte du nombre de pages, la règle d'or est la suivante :
                  </p>
                  <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-200 text-sm">
                    <strong>Règle intangible :</strong> On <strong>saute obligatoirement une ligne</strong> uniquement entre l’introduction et le développement, et entre les deux grandes parties (entre le Grand I et le Grand II). En revanche, <strong>on ne saute pas de ligne</strong> entre les sous-parties (A et B) ni après le chapeau introductif : on écrit l'intitulé, on le <strong>souligne obligatoirement</strong>, et l'on entame immédiatement la ligne suivante.
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    Formulation en wolof traduite : <em>« Bu fekkee ne bind nga ba ci digg ligne bi... da ngay dellu ci ligne bi te doo sauter ligne »</em> (« Si la ligne précédente s'arrête au milieu, vous revenez simplement à la ligne sans sauter d'interligne pour ne pas saturer l'espace de la copie »).
                  </p>

                  <h3 className="text-lg font-semibold text-emerald-300 pt-2">
                    4. Chapeaux introductifs et phrases de transition
                  </h3>
                  <p>
                    Chaque grande partie doit s’ouvrir par un <strong>chapeau introductif</strong> annonçant brièvement les subdivisions (A et B). De même, le passage d’une sous-partie à une autre exige une <strong>phrase de transition</strong> fluide. Une juxtaposition brutale des arguments (quitter abruptement l'argument A pour le B sans liaison) est sanctionnée par le correcteur.
                  </p>
                </div>
              </section>

              {/* SECTION III */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                    III
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    La distinction capitale : Anomalie vs Irrégularité
                  </h2>
                </div>
                <div className="text-slate-300 space-y-4 pl-11 text-sm sm:text-base">
                  <p>
                    C’est le cœur doctrinal et technique de l’évaluation. Les correcteurs de la <strong>Cour des comptes</strong> accordent une importance décisive à cette catégorisation, quel que soit le vocabulaire employé dans le dossier (manquements, dysfonctionnements, griefs).
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Carte Irrégularité */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-red-900/50 space-y-3">
                      <div className="flex items-center gap-2 text-red-400 font-bold text-base">
                        <AlertTriangle className="w-5 h-5" />
                        <span>L'IRRÉGULARITÉ (3 critères cumulatifs)</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Pour qu'un fait soit qualifié d’<strong>irrégularité</strong>, il doit impérativement satisfaire à trois conditions simultanées :
                      </p>
                      <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-200">
                        <li>
                          <strong>Violation formelle d’une disposition textuelle précise :</strong> La méconnaissance d'une loi organique (ex. <strong>loi organique sur la Cour des comptes</strong>, <strong>LOLF</strong>), du Code des marchés publics (décret), ou d'un règlement. Il ne suffit pas de dire « en violation des textes » : il faut viser l'<strong>article et l'alinéa exacts</strong>.
                        </li>
                        <li>
                          <strong>Imputabilité à une personne responsable identifiée :</strong> Le manquement doit être rattaché à une personne physique nominative ou à une autorité habilitée (ordonnateur, directeur général, gestionnaire de compte, DAF) en fonction <strong>durant l'intervalle exact</strong> où la faute a été commise.
                        </li>
                        <li>
                          <strong>Sanction textuellement prévue :</strong> La disposition légale doit prévoir une sanction répressive, financière (ex. <strong>amende</strong>, <strong>arrêt de débet</strong>, sanctions prévues par la <strong>LOLF</strong> ou la loi organique) ou disciplinaire/pénale. La sanction <strong>ne se présume pas et ne s'invente jamais</strong>.
                        </li>
                      </ol>
                    </div>

                    {/* Carte Anomalie */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-blue-900/50 space-y-3">
                      <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                        <Building2 className="w-5 h-5" />
                        <span>L'ANOMALIE OU LE DYSFONCTIONNEMENT</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Constitue une <strong>anomalie</strong> tout manquement qui ne réunit pas cumulativement les 3 critères ci-dessus :
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-200">
                        <li>
                          <strong>Absence de sanction textuelle directe :</strong> Même s'il y a violation de principe, s'il n'y a pas de régime de sanction punitif défini, il s'agit d'une anomalie.
                        </li>
                        <li>
                          <strong>Dysfonctionnements organisationnels :</strong> Absence d'organigramme, organigramme obsolète ou anachronique, défaut de contrat de performance entre l'État et la société, ou absence de manuel de procédures administratives.
                        </li>
                        <li>
                          <strong>Traitement approprié :</strong> Les anomalies ne débouchent pas sur des peines répressives mais appellent obligatoirement des <strong>recommandations</strong> formulées par la juridiction financière pour corriger la gestion et restaurer la bonne gouvernance.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION IV */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                    IV
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Le travail préliminaire : Recensement et Priorisation
                  </h2>
                </div>
                <div className="text-slate-300 space-y-3 pl-11 text-sm sm:text-base">
                  <p>
                    Le <strong>travail préliminaire</strong> est la phase la plus exigeante et décisive de l’épreuve.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                      <h4 className="font-semibold text-emerald-300 text-sm mb-1.5">Étape 1 : Le Recensement exhaustif</h4>
                      <p className="text-xs text-slate-300">
                        Dépouiller le dossier sur <strong>deux feuilles de brouillon séparées</strong> : une feuille dédiée exclusivement aux <strong>anomalies</strong>, et une feuille dédiée aux <strong>irrégularités</strong>. Lors de ce premier passage, le candidat peut recenser 15 à 20 anomalies et 15 à 20 irrégularités.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                      <h4 className="font-semibold text-emerald-300 text-sm mb-1.5">Étape 2 : La Priorisation impérative</h4>
                      <p className="text-xs text-slate-300">
                        Il est <strong>matériellement impossible</strong> de traiter 30 ou 40 constats dans un devoir limité à 4 pages. Le candidat doit impérativement <strong>prioriser et éliminer</strong> pour ne retenir que <strong>4 à 5 anomalies</strong> et <strong>4 à 5 irrégularités majeures</strong>.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-emerald-300 pt-2">
                    Les critères objectifs de priorisation :
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 pl-2">
                    <li>
                      <strong>L'ordre de gravité :</strong> Privilégier les faits d'une gravité supérieure (par analogie pénale entre crime, délit et contravention).
                    </li>
                    <li>
                      <strong>L'enjeu financier :</strong> En matière de commande publique, une irrégularité sur une <strong>Demande de Renseignement et de Prix avec compétition (DRP-CO)</strong> ou un marché par appel d'offres portant sur des dizaines de millions de FCFA prime absolument sur une DRP simple de quelques centaines de milliers de francs.
                    </li>
                    <li>
                      <strong>L'impact systémique sur l'organisation :</strong> L'absence d'organigramme (situation où <em>« personne ne sait qui commande qui, c'est l'armée mexicaine »</em>) est infiniment plus grave et prioritaire que l'absence d'un simple manuel de procédures.
                    </li>
                  </ol>
                </div>
              </section>

              {/* SECTION V */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                    V
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    La Lettre de Transmission : « La synthèse de la synthèse »
                  </h2>
                </div>
                <div className="text-slate-300 space-y-3 pl-11 text-sm sm:text-base">
                  <p>
                    La <strong>Lettre de transmission</strong> n'est pas une simple lettre d'accompagnement banale du style <em>« J'ai l'honneur de vous transmettre ci-joint... »</em>. Au concours, c’est le <strong>prolongement analytique direct du travail préliminaire</strong>.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
                    <li>
                      <strong>Rôle :</strong> Elle constitue la <strong>synthèse de la synthèse</strong>. Destinée à l'autorité hiérarchique ou de tutelle (Ministre, Directeur général), elle doit lui permettre d'appréhender l'essentiel du contrôle sans ouvrir immédiatement la note complète.
                    </li>
                    <li>
                      <strong>Contenu :</strong> Elle reprend de manière extrêmement concise les <strong>2 ou 3 irrégularités les plus gravissimes</strong> et les <strong>2 ou 3 anomalies majeures</strong> déjà traitées dans la note de synthèse.
                    </li>
                    <li>
                      <strong>Interdiction absolue d'ajouter des faits nouveaux :</strong> Tout élément figurant dans la lettre de transmission <strong>doit obligatoirement provenir de la note de synthèse</strong>. Introduire un fait nouveau dans la lettre constitue un <strong>hors-sujet sanctionné</strong>.
                    </li>
                    <li>
                      <strong>Format :</strong> La lettre de transmission ne doit <strong>jamais dépasser une page</strong>.
                    </li>
                  </ul>
                </div>
              </section>

              {/* SECTION VI */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                    VI
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Les exigences formelles et barème de présentation (Noté sur 6 points)
                  </h2>
                </div>
                <div className="text-slate-300 space-y-3 pl-11 text-sm sm:text-base">
                  <p>
                    La forme représente <strong>jusqu'à 5 ou 6 points sur 20</strong> dans le barème de correction de l’<strong>ENA</strong> et de la <strong>Cour des comptes</strong>. Ne pas négliger la forme : c'est un réservoir de points précieux.
                  </p>
                  
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-700/80 space-y-2 text-sm">
                    <h4 className="font-bold text-emerald-400 uppercase tracking-wide text-xs">
                      Les mentions obligatoires d'identification du document administratif :
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                      <div>1. <strong>Initiales du rédacteur</strong> (anonymisées au concours, ex: <em>CT1</em>)</div>
                      <div>2. <strong>En-tête / Timbre de l'État</strong> (République du Sénégal...)</div>
                      <div>3. <strong>Numéro d'enregistrement</strong> (ex: <em>N° 00../MSAS</em>)</div>
                      <div>4. <strong>Lieu et date</strong> (ex: <em>Dakar, le 23 août 2025</em>)</div>
                      <div>5. <strong>Titre / Destinataire</strong> (<em>Note à l'attention de...</em>)</div>
                      <div>6. <strong>Objet</strong> (Synthèse du rapport de contrôle de...)</div>
                      <div>7. <strong>Référence</strong> (si applicable aux correspondances)</div>
                      <div>8. <strong>Signature</strong> (mention manuscrite <em>« Signature »</em> sans vraie signature)</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-emerald-300 pt-2">
                    Règles d'or pour le jour de l'examen :
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
                    <li>
                      <strong>Respect scrupuleux de l'anonymat :</strong> Ne jamais apposer son vrai nom, sa vraie signature ou ses véritables initiales sous peine d’<strong>annulation immédiate de la copie pour fraude</strong>.
                    </li>
                    <li>
                      <strong>Zéro intercalaire si interdit par la consigne :</strong> La Note de synthèse (3 pages) et la Lettre de transmission (1 page) doivent impérativement tenir dans la <strong>copie double de 4 pages</strong>.
                    </li>
                    <li>
                      <strong>Tolérance zéro pour les fautes d'orthographe et de grammaire :</strong> Le formateur rappelle : <em>« Deux fautes et vous ne pouvez plus prétendre à la moyenne ! »</em>. Proscrire le blanco et les ratures inélégantes.
                    </li>
                    <li>
                      <strong>Gestion stricte de l'horloge :</strong> Sur 3 heures d'épreuve : 1h30 pour le travail préliminaire et le brouillon, 1h30 pour la rédaction finale. Un devoir inachevé est un devoir qui n'obtient jamais la moyenne.
                    </li>
                  </ul>
                </div>
              </section>

              {/* SECTION VII: RÉSUMÉ DES POINTS ESSENTIELS */}
              <section className="mt-8 pt-6 border-t border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <BookmarkCheck className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-xl font-bold text-white">
                    Résumé des points essentiels à retenir
                  </h2>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-3 text-sm text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Nature pratique du concours :</strong> L'épreuve teste l'aptitude d'un futur magistrat ou vérificateur à extraire, qualifier et présenter des faits de gestion avec précision et rigueur.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Triptyque de l'irrégularité :</strong> Violation d’un texte légal/réglementaire avec article et alinéa + Identification nominative de l’auteur avec ses dates d'exercice + Sanction textuellement prévue.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Régime des anomalies :</strong> Défauts de gouvernance et défaillances sans régime de sanction personnelle répressive ; elles doivent être traitées avec des recommandations correctives.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Priorisation obligatoire :</strong> Recenser tout au brouillon, puis ne retenir que 4 à 5 anomalies et 4 à 5 irrégularités majeures selon la gravité, l'enjeu financier et l'impact organisationnel.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Discipline des 4 pages :</strong> Répartir idéalement en 3 pages pour la note de synthèse et 1 page pour la lettre de transmission. Ne jamais utiliser d'intercalaire si la consigne ne l'autorise pas explicitement.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Perfection formelle :</strong> Titres soulignés, pas de conclusion dans la note, chapeaux et transitions soignés, en-tête complet, et zéro faute d'orthographe.
                    </p>
                  </div>
                </div>
              </section>

            </article>
          </div>
        )}

        {/* TAB 2: METHODOLOGIE PAS À PAS */}
        {activeTab === 'methodology' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Démarche Pédagogique Officielle (Méthode en 4 Phases)
              </h2>
              <p className="text-slate-300 text-sm">
                Guide méthodologique tiré des recommandations du formateur et des annales de l’École Nationale d’Administration (ENA) et de la Cour des comptes du Sénégal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/40">1</span>
                  <h3 className="font-bold text-white text-base">Phase d'approche du dossier (30 min)</h3>
                </div>
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside">
                  <li>Lecture attentive du libellé du sujet et des consignes impératives.</li>
                  <li>Identification de la structure sous contrôle (statut, missions, tutelle).</li>
                  <li>Repérage de la période sous contrôle (ex. 2015-2018).</li>
                  <li>Recherche de l'intention du commanditaire de la note.</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/40">2</span>
                  <h3 className="font-bold text-white text-base">Phase d'exploitation & Dépouillement (45 min)</h3>
                </div>
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside">
                  <li>Séparation sur deux feuilles de brouillon : <strong>Anomalies</strong> d'un côté, <strong>Irrégularités</strong> de l'autre.</li>
                  <li>Relevé des infractions textuelles avec référence de l'article.</li>
                  <li>Identification des personnes responsables et dates de mandat.</li>
                  <li>Recensement des sanctions expressément prévues par les textes.</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/40">3</span>
                  <h3 className="font-bold text-white text-base">Phase de priorisation & Plan détaillé (15 min)</h3>
                </div>
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside">
                  <li>Sélection stricte de 4 à 5 anomalies et 4 à 5 irrégularités majeures.</li>
                  <li>Critères : gravité pénale/financière, montants des marchés, impact sur la gouvernance.</li>
                  <li>Rédaction au brouillon des titres du plan (I.A, I.B, II.A, II.B).</li>
                  <li>Vérification du parallélisme et de l'équilibre des parties.</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/40">4</span>
                  <h3 className="font-bold text-white text-base">Phase de rédaction finale directe (90 min)</h3>
                </div>
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside">
                  <li>Rédaction directe au propre sur la copie (ne jamais rédiger tout le texte au brouillon !).</li>
                  <li>Introduction en 3 paragraphes nets.</li>
                  <li>Soulignement systématique des intitulés de parties et sous-parties.</li>
                  <li>Chapeaux introductifs et transitions soignées.</li>
                  <li>Rédaction de la Lettre de transmission sur la dernière page.</li>
                  <li>Relecture finale impérative pour éliminer la moindre faute de grammaire.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANOMALIES VS IRRÉGULARITÉS */}
        {activeTab === 'criteres' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                Matrice d'Évaluation : Irrégularité vs Anomalie
              </h2>
              <p className="text-slate-300 text-sm">
                La règle des trois critères cumulatifs formulée par le formateur pour sécuriser la notation devant les magistrats de la Cour des comptes.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-sm text-slate-300 bg-slate-900">
                <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Élément d'analyse</th>
                    <th className="py-3 px-4 text-red-400">L'Irrégularité</th>
                    <th className="py-3 px-4 text-blue-400">L'Anomalie / Manquement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Fondement textuel</td>
                    <td className="py-3 px-4 text-red-300">Violation directe d'une disposition précise (Loi organique, LOLF, Code des marchés) avec mention de l'article et de l'alinéa.</td>
                    <td className="py-3 px-4 text-blue-300">Défaut de conformité aux bonnes pratiques, défaillance structurelle sans violation de texte sanctionné.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Personne responsable</td>
                    <td className="py-3 px-4 text-red-300">Obligatoirement identifiée (Directeur général, DAF, Ordonnateur) avec correspondance temporelle exacte de son mandat.</td>
                    <td className="py-3 px-4 text-blue-300">Défaillance souvent institutionnelle ou collective (ex. CA inactif, organigramme inexistant).</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Sanction textuelle</td>
                    <td className="py-3 px-4 text-red-300">Sanction légale expresse prévue par la loi (Amende, Arrêt de débet, sanctions disciplinaires/pénales).</td>
                    <td className="py-3 px-4 text-blue-300">Aucune sanction répressive directe prévue par les textes en vigueur.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Issue du contrôle</td>
                    <td className="py-3 px-4 text-red-300">Poursuites, mise en cause personnelle, débet ou amendes devant la Chambre de discipline financière.</td>
                    <td className="py-3 px-4 text-blue-300">Formulation de <strong>recommandations</strong> administratives et de directives d'amélioration.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Exemples concrets</td>
                    <td className="py-3 px-4 text-red-300">Paiement sans service fait ; fractionnement de marchés pour contourner l'appel d'offres ; non-reversement de taxes collectées.</td>
                    <td className="py-3 px-4 text-blue-300">Absence de contrat de performance ; organigramme obsolète ; absence de manuel de procédures de gestion.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: FICHES MÉMO & FORME */}
        {activeTab === 'fiches' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Fiche Technique : Mentions de Forme & Barème (6 Points)
              </h2>
              <p className="text-slate-300 text-sm">
                Détail des 8 mentions obligatoires pour obtenir le maximum de points sur la forme administrative.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-bold text-emerald-400 text-base">Les 8 Mentions d'Identification (0,5 pt à 1 pt chacune)</h3>
                <ol className="text-xs sm:text-sm text-slate-300 space-y-2 list-decimal list-inside">
                  <li><strong>Initiales du rédacteur et de l’assistante :</strong> CT1 / assistante (ne jamais mettre de vraies initiales pour préserver l'anonymat du concours).</li>
                  <li><strong>L’en-tête / Le timbre :</strong> RÉPUBLIQUE DU SÉNÉGAL • Un Peuple - Un But - Une Foi • Ministère de... • Direction générale de...</li>
                  <li><strong>Numéro d’enregistrement :</strong> N° ____ / [Sigle du Ministère ou de la Direction] (ne pas inventer de faux chiffres arbitraires).</li>
                  <li><strong>Localité d’origine et date :</strong> Dakar, le [Date du concours ou date du sujet].</li>
                  <li><strong>Titre :</strong> NOTE À L'ATTENTION DE MONSIEUR LE MINISTRE (ou Directeur général).</li>
                  <li><strong>Objet :</strong> Synthèse du rapport définitif de contrôle de la structure [Nom].</li>
                  <li><strong>Référence :</strong> Référence de la commande de la note ou de la lettre de mission.</li>
                  <li><strong>Signature :</strong> La mention manuscrite en toutes lettres <em>« Signature »</em> (sans apposer de paraphe personnel).</li>
                </ol>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-bold text-amber-400 text-base">Les 5 Pièges Éliminatoires à Proscrire</h3>
                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/50">
                    <strong className="text-red-400">1. Dépasser les 4 pages :</strong>
                    <p>Si la consigne interdit les intercalaires, dépasser la feuille double entraîne le rejet ou une note sanction.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/50">
                    <strong className="text-red-400">2. Briser l'anonymat :</strong>
                    <p>Une signature, un nom ou des initiales identifiables annulent la copie sur le champ.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/50">
                    <strong className="text-red-400">3. Rédiger une conclusion dans la note :</strong>
                    <p>La note est une synthèse factuelle et analytique, elle n'appelle pas de conclusion morale ou personnelle.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/50">
                    <strong className="text-red-400">4. Deux fautes d'orthographe :</strong>
                    <p>Un magistrat ou vérificateur doit manier la langue avec une irréprochable précision. Deux fautes empêchent d'avoir la moyenne.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/50">
                    <strong className="text-red-400">5. Faits nouveaux dans la lettre de transmission :</strong>
                    <p>La lettre est un extrait concentré de la note. Tout élément non contenu dans la note constitue un hors-sujet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-400" />
                  Auto-Évaluation : Êtes-vous Prêt pour le Concours ?
                </h2>
                <p className="text-slate-300 text-sm mt-1">
                  Testez vos réflexes sur la qualification des griefs, la forme et les consignes strictes de la Cour des comptes.
                </p>
              </div>
              {quizScore !== null && (
                <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center">
                  <div className="text-xs uppercase font-bold tracking-wider">Votre score</div>
                  <div className="text-2xl font-extrabold">{quizScore} / {quizQuestions.length}</div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {quizQuestions.map((q, idx) => {
                const selected = quizAnswers[q.id];
                const isAnswered = selected !== undefined;
                const correctOption = q.options.find(o => o.correct)?.value;
                const isCorrect = selected === correctOption;

                return (
                  <div key={q.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-semibold text-white text-sm sm:text-base">{q.title}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 pl-9">
                      {q.options.map(opt => {
                        const isThisSelected = selected === opt.value;
                        let btnStyle = "bg-slate-800 hover:bg-slate-700/80 text-slate-300 border-slate-700";

                        if (isAnswered) {
                          if (opt.correct) {
                            btnStyle = "bg-emerald-950/80 text-emerald-300 border-emerald-500 font-semibold";
                          } else if (isThisSelected && !opt.correct) {
                            btnStyle = "bg-red-950/80 text-red-300 border-red-500";
                          }
                        }

                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleQuizSelect(q.id, opt.value)}
                            className={`p-3 rounded-lg border text-left text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt.label}</span>
                            {isAnswered && opt.correct && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className={`p-3 rounded-lg text-xs pl-9 mt-2 border ${isCorrect ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-amber-950/30 border-amber-800/40 text-amber-200'}`}>
                        <strong>{isCorrect ? 'Correct !' : 'Explication :'}</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={calculateScore}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition shadow-lg shadow-emerald-950 cursor-pointer"
              >
                Calculer mon résultat
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <p>Assistant pédagogique spécialisé pour le concours de la Cour des comptes du Sénégal • Conforme aux directives officielles</p>
      </footer>
    </div>
  );
}

const fullTextTranscription = `# COUR DE PRÉPARATION AU CONCOURS DE LA COUR DES COMPTES DU SÉNÉGAL
## Session : Méthodologie Complète de la Note de Synthèse et de la Lettre de Transmission
**Formateur :** Pr. Thimbo Al Hassane
**Intervenants :** Diénaba Bâ, Pape Dieng, Boubacar Diop, Amidou Mamby Kane, Ndiogou Sylla, Ousmane Guey.

---

# I. Introduction générale et nature de l'épreuve pratique

À la différence fondamentale de la **dissertation juridique ou économique**, qui est une épreuve purement théorique et doctrinale, la **Note de synthèse** au concours de la **Cour des comptes du Sénégal** (tant pour le corps des vérificateurs que pour celui des magistrats) est une épreuve rigoureusement **pratique et administrative**.

Dans son exercice quotidien au sein d'une juridiction financière, le contrôleur ou le magistrat est appelé à instruire des rapports de contrôle portant sur des entités publiques précises :
- Des **sociétés nationales** (ex. : SONACOS, SENELEC, etc.) ;
- Des **établissements publics** (hôpitaux, universités) ;
- Des **agences d'exécution** ;
- Des **collectivités territoriales** ou des **ministères**.

La note de synthèse simule exactement cet acte professionnel.

---

# II. La structure formelle et les règles de rédaction

## 1. L'absence de conclusion dans la note de synthèse
Dans une dissertation académique classique, on retrouve l'enchaînement : Introduction - Développement - Conclusion.
Dans la **Note de synthèse de la Cour des comptes**, **la conclusion n'est pas nécessaire et ne doit pas figurer**, sauf si le sujet vous le demande expressément. La note de synthèse est elle-même la conclusion et la synthèse du dossier. Elle se compose donc uniquement d'une **introduction** et d'un **développement**.

## 2. La règle typographique des sauts de ligne
- **Entre l'introduction et le développement :** Vous devez **sauter obligatoirement une ligne**.
- **Entre le Grand I et le Grand II :** Vous devez également **sauter obligatoirement une ligne**.
- **À l'intérieur des sous-parties (A et B) :** Vous ne sautez **aucune ligne**. Vous écrivez l'intitulé, vous le **soulignez impérativement**, et vous commencez immédiatement le corps du paragraphe à la ligne suivante.
*Traduction du wolof :* « Bu fekkee ne bind nga ba ci digg ligne bi... da ngay dellu ci ligne bi te doo sauter ligne » (« Même si vous écrivez jusqu'au milieu de la ligne, revenez à la ligne suivante sans sauter de ligne blanche afin d'économiser l'espace restreint de votre copie »).

## 3. L'Introduction en trois paragraphes obligatoires
L'introduction doit comporter **trois parties distinctes**, chacune matérialisée par un paragraphe et un alinéa net :
1. **La présentation de la structure contrôlée (3 à 4 lignes maximum) :**
   Rappeler la loi ou le décret de création de la structure, ses règles d'organisation et de fonctionnement, ainsi que sa mission principale (la mission la plus englobante).
2. **La période sous revue et les personnes dirigeantes :**
   Préciser les exercices comptables ou budgétaires audités (ex. : *« durant la période sous revue allant de 2015 à 2018 »*). Indiquer nominativement les dirigeants (Directeurs généraux, Présidents de conseil d'administration) en mentionnant scrupuleusement leur **intervalle exact de fonction** (date de prise de service et date de fin de fonction).
3. **L’annonce du plan :**
   L’annonce du plan doit être calquée fidèlement sur la consigne du sujet, articulée autour de deux axes principaux (Grand I et Grand II).

---

# III. La distinction conceptuelle cardinale : Anomalies vs Irrégularités

## 1. La qualification d'Irrégularité (Trois critères cumulatifs immuables)
Pour qu'un fait relevé dans le dossier soit qualifié d’**irrégularité**, il doit impérativement réunir **trois conditions cumulatives** :
1. **Une violation textuelle directe :** Violation d'une disposition formelle du Code des marchés publics, de la **Loi organique relative aux lois de finances (LOLF)**, ou de la loi organique sur la Cour des comptes. Il est obligatoire de viser précisément **l'article et l'alinéa** violés.
2. **Une personne responsable identifiée :** La faute doit être imputable à une personne physique clairement en fonction durant l'exercice incriminé.
3. **Une sanction légale ou réglementaire prévue :** La loi doit prévoir une sanction expresse (amende, arrêt de débet, sanction disciplinaire ou pénale). La sanction ne s'invente pas.

## 2. La qualification d'Anomalie (Dysfonctionnement ou manquement)
Tout manquement qui ne réunit pas cumulativement les trois critères précédents constitue une **anomalie**.
- Violation sans sanction textuelle expresse ;
- Défaut de contrat de performance entre l'État et la structure ;
- Organigramme obsolète, archaïque ou manquant ;
- Absence de manuel de procédures.
Ces anomalies appellent obligatoirement des **recommandations** correctives pour restaurer la performance.

---

# IV. Le travail préliminaire : Recensement et Priorisation

## 1. Le recensement exhaustif au brouillon
Prendre deux feuilles de brouillon distinctes :
- Une feuille pour le recensement des **anomalies** ;
- Une feuille pour le recensement des **irrégularités**.
On peut en relever initialement 15 à 20 de chaque côté.

## 2. La priorisation obligatoire (4 à 5 constats maximum)
Il est strictement impossible de tout traiter sur une copie de 4 pages. Il faut impérativement prioriser et ne retenir que **4 à 5 anomalies** et **4 à 5 irrégularités majeures** selon :
- **L’ordre de gravité** ;
- **L'enjeu financier :** En matière de commande publique, une Demande de Renseignement et de Prix avec compétition (DRP-CO) ou un appel d'offres de plusieurs dizaines de millions prime sur une DRP simple de faible montant ;
- **L'impact structurel :** L'absence d'organigramme (absence totale de formalisation hiérarchique) est prioritaire sur l'absence d'un simple manuel de procédures.

---

# V. La Lettre de Transmission : « La synthèse de la synthèse »
- **Définition :** Elle constitue la synthèse de la synthèse, destinée à éclairer immédiatement l'autorité destinataire (Ministre, Directeur général).
- **Contenu :** Elle reprend de manière condensée les 2 ou 3 irrégularités les plus graves et les 2 ou 3 anomalies majeures déjà développées dans la note.
- **Règle absolue :** Aucun fait nouveau ne doit y être introduit sous peine de hors-sujet. Tout ce qui figure dans la lettre doit provenir de la note.
- **Taille :** Ne doit jamais excéder une page.

---

# VI. Forme administrative et barème (Noté sur 5 à 6 points)
Les mentions obligatoires d'identification :
1. Initiales du rédacteur (anonymisées, ex. : CT1)
2. En-tête / Timbre (RÉPUBLIQUE DU SÉNÉGAL...)
3. Numéro d’enregistrement
4. Localité et date (Dakar, le...)
5. Titre / Destinataire
6. Objet
7. Référence
8. Mention manuscrite « Signature » (sans vraie signature pour préserver l'anonymat).

**Contraintes matérielles décisives :**
- Copie limitée strictement à 4 pages (3 pages pour la note + 1 page pour la lettre). Interdiction des intercalaires si la consigne ne les autorise pas.
- Gestion du temps : 1h30 pour le travail préliminaire, 1h30 pour la rédaction. Un devoir inachevé ne peut obtenir la moyenne.
- Tolérance zéro pour l'orthographe et les ratures. Deux fautes privent le candidat de la moyenne.
`;
