import axios from "../../utils/Axios";
import { loadperson, removeperson } from "../reducers/personSlice";
export { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const combined_credits = await axios.get(`/person/${id}/combined_credits`);
        const tv_credits = await axios.get(`/person/${id}/tv_credits`);
        const movie_credits = await axios.get(`/person/${id}/movie_credits`);


        let theultimatedetail = {
            detail: detail.data,
            externalid: externalid.data,
            combined_credits: combined_credits.data,
            tv_credits: tv_credits,
            movie_credits: movie_credits,



        }
        dispatch(loadperson(theultimatedetail))
    } catch (error) {
        console.log("Error:", error)
    }
}