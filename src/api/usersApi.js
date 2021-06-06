import axiosClient from "./axiosClient";
export const usersApi = {
  login: (data) => {
    return axiosClient.post("/login", data);
  },
  signup: (data) => {
    return axiosClient.post("/signup", data);
  },
  updateProfilePicture: (data) => {
    return axiosClient.post("/updateProfilePicture", data);
  },
  favorites: (data) => {
    return axiosClient.put("/favorites", data);
  },
};
