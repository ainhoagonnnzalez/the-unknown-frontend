import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      statusValues: {
        Legend: "Legend",
        Unsolved: "Unsolved",
        Solved: "Solved",
        Disputed: "Disputed",
      },
      translation: {
        home: "HOME",
        archive: "THE ARCHIVE",
        explore: "EXPLORE CASE",
        story: "THE STORY",
        exploreLabel: "THE COLLECTION",
        exploreTitle: "THE ARCHIVE",
        exploreDescription:
          "Explore the world's most intriguing unsolved mysteries.",
        searchPlaceholder: "SEARCH THE ARCHIVE...",
        searchBar: "SEARCH MYSTERIES",
        allCategories: "ALL CATEGORIES",
        casesFound: "CASES FOUND",
        loadingCases: "LOADING CASES...",
        errorCases: "UNABLE TO LOAD THE ARCHIVE.",
        errorCasesDescription:
          "WE COULDN'T LOAD THE MYSTERIES. PLEASE TRY AGAIN LATER",
        noCases: "NO CASES FOUND.",
        noCasesDescription: "TRY A DIFFERENT SEARCH OR CATEGORY",
        exploreCase: "EXPLORE CASE",
        caseFile: "CASE FILE",
        status: "STATUS",
        location: "LOCATION",
        year: "YEAR",
        category: "CATEGORY",
        timeline: "TIMELINE",
        evidence: "EVIDENCE",
        unansweredQuestions: "UNANSWERED QUESTIONS",
        documentedTheories: "DOCUMENTED THEORIES",
        communityTheories: "COMMUNITY THEORIES",
        submitTheory: "SUBMIT A THEORY",
        editTheory: "EDIT",
        deleteTheory: "DELETE",
        noCommunityTheories: "NO COMMUNITY THEORIES YET.",
        theories: "THEORIES",
        loadingMystery: "Loading mystery...",
        mysteryNotFound: "Mystery not found.",
        mysteryError: "We couldn't load this mystery.",
        backToExplore: "Back to Explore →",
        backToArchive: "← BACK TO THE ARCHIVE",

        documentedDescription:
          "Existing explanations and hypotheses surrounding this case.",

        proposedBy: "PROPOSED BY",

        communityDescription:
          "Every mystery has more than one explanation. Share yours with the archive.",

        communityContribution: "COMMUNITY CONTRIBUTION",
        submittedBy: "SUBMITTED BY",

        beFirst: "Be the first to share your explanation.",

        confirmDelete: "Are you sure you want to delete this theory?",

        // HOME PAGE
        heroLabel: "AN ARCHIVE OF THE UNEXPLAINED",
        heroSubtitle: "Beyond what is known, lies what remains hidden.",
        heroButton: "ENTER THE ARCHIVE →",

        featuredLabel: "01 / THE ARCHIVE",
        featuredTitle: "FEATURED CASES",
        featuredDescription:
          "Discover the stories that continue to defy explanation.",
        viewAll: "VIEW ALL CASES →",
      },
    },

    es: {
      statusValues: {
        Legend: "Leyenda",
        Unsolved: "Sin resolver",
        Solved: "Resuelto",
        Disputed: "Controvertido",
      },
      translation: {
        home: "INICIO",
        archive: "EL ARCHIVO",
        explore: "EXPLORAR CASO",
        story: "LA HISTORIA",
        exploreLabel: "LA COLECCIÓN",
        exploreTitle: "EL ARCHIVO",
        exploreDescription:
          "Explora los misterios sin resolver más intrigantes del mundo.",
        searchPlaceholder: "BUSCAR EN EL ARCHIVO...",
        searchBar: "BUSCAR MISTERIOS",
        allCategories: "TODAS LAS CATEGORÍAS",
        casesFound: "CASOS ENCONTRADOS",
        loadingCases: "CARGANDO CASOS...",
        errorCases: "NO SE HA PODIDO CARGAR EL ARCHIVO.",
        errorCasesDescription:
          "NO HEMOS PODIDO CARGAR LOS MISTERIOS. PORFAVOR PRUEBA OTRA VEZ",
        noCases: "NO SE HAN ENCONTRADO CASOS.",
        noCasesDescription: "PRUEBA UNA BUSQUEDA O CATEGORÍA DIFERENTE",
        exploreCase: "EXPLORAR CASO",

        caseFile: "EXPEDIENTE",
        status: "ESTADO",
        location: "UBICACIÓN",
        year: "AÑO",
        category: "CATEGORÍA",
        timeline: "CRONOLOGÍA",
        evidence: "EVIDENCIAS",
        unansweredQuestions: "PREGUNTAS SIN RESPUESTA",
        documentedTheories: "TEORÍAS DOCUMENTADAS",
        communityTheories: "TEORÍAS DE LA COMUNIDAD",
        submitTheory: "PROPONER UNA TEORÍA",
        editTheory: "EDITAR",
        deleteTheory: "ELIMINAR",
        noCommunityTheories: "TODAVÍA NO HAY TEORÍAS DE LA COMUNIDAD.",
        theories: "TEORÍAS",
        loadingMystery: "Cargando misterio...",
        mysteryNotFound: "Misterio no encontrado.",
        mysteryError: "No hemos podido cargar este misterio.",
        backToExplore: "Volver a Explorar →",
        backToArchive: "← VOLVER AL ARCHIVO",

        documentedDescription:
          "Explicaciones e hipótesis existentes sobre este caso.",

        proposedBy: "PROPUESTO POR",

        communityDescription:
          "Cada misterio tiene más de una explicación. Comparte la tuya con el archivo.",

        communityContribution: "CONTRIBUCIÓN DE LA COMUNIDAD",
        submittedBy: "ENVIADO POR",

        beFirst: "Sé el primero en compartir tu explicación.",

        confirmDelete: "¿Seguro que quieres eliminar esta teoría?",

        // HOME PAGE
        heroLabel: "UN ARCHIVO DE LO INEXPLICABLE",
        heroSubtitle:
          "Más allá de lo conocido, se encuentra lo que permanece oculto.",
        heroButton: "ENTRAR AL ARCHIVO →",

        featuredLabel: "01 / EL ARCHIVO",
        featuredTitle: "CASOS DESTACADOS",
        featuredDescription:
          "Descubre las historias que siguen desafiando toda explicación.",
        viewAll: "VER TODOS LOS CASOS →",
      },
    },
  },

  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
