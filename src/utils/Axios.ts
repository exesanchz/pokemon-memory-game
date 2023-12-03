import axios from "axios";
import axiosRetry from "axios-retry";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// Configura axios-retry con un máximo de 3 intentos y un intervalo de espera exponencial
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

export default api;
