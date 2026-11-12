import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/LoadingSpinner";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const API_URL = `${import.meta.env.VITE_API_URL}/mysteries`;

// GOLD MARKER
const goldMarker = L.divIcon({
  className: "custom-marker",
  html: `
    <div class="gold-map-marker"></div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// GET MYSTERY IMAGE
const getMysteryImage = (mystery) => {
  const image = mystery.image || mystery.imageUrl || mystery.images?.[0];

  if (!image) return null;

  if (typeof image !== "string") return null;

  if (image.startsWith("http")) return image;

  return image.startsWith("/") ? image : `/${image}`;
};

function MysteryMapPage() {
  const { t, i18n } = useTranslation();

  const [mysteries, setMysteries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isSpanish = i18n.language.startsWith("es");

  // FETCH MYSTERIES
  useEffect(() => {
    const fetchMysteries = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(API_URL);

        setMysteries(response.data);
        console.log("Primer misterio:", response.data[0]);

console.log("Coordenadas:", response.data[0]?.coordinates);
      } catch (err) {
        console.error("Error loading mysteries:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMysteries();
  }, []);

  // TRANSLATE MYSTERY
  const translateMystery = (mystery) => {
    if (!isSpanish || !mystery.translations?.es) {
      return mystery;
    }

    return {
      ...mystery,
      ...mystery.translations.es,
    };
  };

  // VALID COORDINATES
  // VALID COORDINATES

const mysteriesWithCoordinates = mysteries

  .map((mystery) => {

    const lat = Number(mystery.coordinates?.lat);

    const lng = Number(mystery.coordinates?.lng);

    return {

      ...mystery,

      coordinates: { lat, lng },

    };

  })

  .filter((mystery) => {

    const { lat, lng } = mystery.coordinates;

    return (

      Number.isFinite(lat) &&

      Number.isFinite(lng) &&

      lat >= -90 &&

      lat <= 90 &&

      lng >= -180 &&

      lng <= 180

    );

  });

  // CATEGORIES
  const categories = [
    ...new Set(
      mysteriesWithCoordinates
        .map((mystery) => mystery.category)
        .filter(Boolean),
    ),
  ];

  // FILTER MYSTERIES
  const filteredMysteries = mysteriesWithCoordinates.filter((mystery) => {
    return selectedCategory === "ALL" || mystery.category === selectedCategory;
  });

  // TRANSLATE CATEGORY
  const getCategoryLabel = (category) => {
    if (!isSpanish) return category;

    const mystery = mysteriesWithCoordinates.find(
      (item) => item.category === category,
    );

    return mystery?.translations?.es?.category || category;
  };

  return (
    <main className="min-h-screen bg-[#111210] text-[#F0EDE5]">
      {/* HEADER */}
      <section className="px-8 pb-14 pt-40 md:px-20">
        <p className="mb-6 text-xs tracking-[0.35em] text-[#B49A6C]">
          {t("mapLabel")}
        </p>

        <h1 className="font-mystery mb-6 text-[3.2rem] leading-none tracking-[0.04em] md:text-[6rem] lg:text-[7rem]">
          {t("mapTitle")}
        </h1>

        <p className="max-w-2xl text-base leading-8 text-[#A8A8A3]">
          {t("mapDescription")}
        </p>
      </section>

      {/* MAP INFORMATION */}
      <section className="flex flex-col gap-6 border-y border-white/10 px-8 py-7 md:flex-row md:items-center md:justify-between md:px-20">
        {/* CASE COUNTER */}
        <div className="flex items-center gap-4">
          <span className="h-2 w-2 rounded-full bg-[#B49A6C] shadow-[0_0_12px_#B49A6C]" />

          <p className="text-xs tracking-[0.2em] text-[#A8A8A3]">
            {filteredMysteries.length} {t("mapCasesLocated")}
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex items-center gap-4">
          <span className="hidden text-xs tracking-[0.2em] text-[#A8A8A3] md:block">
            {t("category")}
          </span>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="max-w-full cursor-pointer border border-[#B49A6C]/40 bg-[#171815] px-5 py-3 text-xs tracking-[0.12em] text-[#E8DDC7] outline-none transition-colors hover:border-[#B49A6C]"
          >
            <option value="ALL">{t("allCategories")}</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {getCategoryLabel(category)}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* MAP */}
      <section className="relative">
        {loading ? (
          <LoadingSpinner text={t("loadingCases")} />
        ) : error ? (
          <div className="flex h-[600px] items-center justify-center">
            <p className="text-xs tracking-[0.2em] text-[#B49A6C]">
              {t("errorCases")}
            </p>
          </div>
        ) : (
          <MapContainer
            center={[20, 0]}
            zoom={2}
            minZoom={2}
            maxZoom={12}
            zoomControl={false}
            scrollWheelZoom={true}
            className="h-[600px] w-full md:h-[750px]"
            style={{
              background: "#111210",
              zIndex: 0,
            }}
          >
            {/* MAP TILES */}
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* ZOOM */}
            <ZoomControl position="bottomright" />

            {/* MARKERS */}
            {filteredMysteries.map((mystery) => {
              const translatedMystery = translateMystery(mystery);

              const mysteryImage = getMysteryImage(mystery);

              return (
                <Marker
                  key={mystery.id}
                  position={[mystery.coordinates.lat, mystery.coordinates.lng]}
                  icon={goldMarker}
                >
                  <Popup
                    maxWidth={310}
                    minWidth={240}
                    className="mystery-popup"
                  >
                    <div className="mystery-popup-content">
                      {/* IMAGE */}
                      {mysteryImage && (
                        <div className="mystery-popup-image">
                          <img
                            src={mysteryImage}
                            alt={translatedMystery.title}
                            loading="lazy"
                          />

                          <div className="mystery-popup-image-overlay" />
                        </div>
                      )}

                      {/* INFORMATION */}
                      <div className="mystery-popup-info">
                        {/* CASE NUMBER */}
                        <p className="mystery-popup-case">
                          {t("caseFile")} /{" "}
                          {String(mystery.id).padStart(3, "0")}
                        </p>

                        {/* TITLE */}
                        <h3 className="mystery-popup-title">
                          {translatedMystery.title}
                        </h3>

                        {/* LOCATION */}
                        <div className="mystery-popup-location">
                          <span className="mystery-popup-dot" />

                          <span>{translatedMystery.location}</span>
                        </div>

                        {/* YEAR */}
                        {translatedMystery.year && (
                          <p className="mystery-popup-year">
                            {translatedMystery.year}
                          </p>
                        )}

                        {/* CATEGORY */}
                        <p className="mystery-popup-category">
                          {getCategoryLabel(mystery.category)}
                        </p>

                        {/* LINK */}
                        <Link
                          to={`/mysteries/${mystery.id}`}
                          className="mystery-popup-link"
                        >
                          <span>{t("exploreCase")}</span>

                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </section>

      {/* FOOTER */}
      <section className="border-t border-white/10 px-8 py-12 text-center md:px-20">
        <p className="text-xs tracking-[0.2em] text-[#A8A8A3]">
          {t("mapFooter")}
        </p>
      </section>
    </main>
  );
}

export default MysteryMapPage;
