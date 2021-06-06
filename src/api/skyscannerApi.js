import axiosClient from "./axiosClient";
export const skyscannerApi = {
  searchPlaces: (data) => {
    return axiosClient.post("/search-places", data);
  },
  getQuotes: (data) => {
    return axiosClient.post("/quotes", data);
  },
};
