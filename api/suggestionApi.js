import axios from "axios";

export const getSuggestions = (data) =>
  axios.post("http://localhost:8000/api/v1/suggestions/resume", data);
