import axios from "../../utils/Axios";
import { loadtv, removetv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    console.log("Fetching TV details for ID:", id);

    const [detail, externalid, recommendation, similar, translations, videos, watchproviders] =
      await Promise.all([
        axios.get(`/tv/${id}`),
        axios.get(`/tv/${id}/external_ids`),
        axios.get(`/tv/${id}/recommendations`),
        axios.get(`/tv/${id}/similar`),
        axios.get(`/tv/${id}/translations`),
        axios.get(`/tv/${id}/videos`),
        axios.get(`/tv/${id}/watch/providers`),
      ]);

    const theultimatedetail = {
      detail: detail.data,
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results?.IN || null,
    };

    console.log("TV API Response:", theultimatedetail);

    // ✅ Correct dispatch
    dispatch(loadtv(theultimatedetail));
  } catch (error) {
    console.error("Error loading TV details:", error);
  }
};
