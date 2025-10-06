import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWExYWE2ZmRiMmM5NTc0N2JjNmFlZmYzODJjZjIxYSIsIm5iZiI6MTc1OTczNjkyMy40MDk5OTk4LCJzdWIiOiI2OGUzNzQ1YmFlMzEwOWQ3ODcyNWI0MmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FfwkV5HdjmpzvjQwSHFihPf8bzvr6tExaaTV5lG_gKo'
    }
})


export default instance