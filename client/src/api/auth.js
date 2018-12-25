import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000",
  withCredentials: true
});

export default {
  service,

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },
  currentUser(user) {
    return localStorage.user.includes(user);
  },
  isAdmin() {
    return localStorage.user.includes("Admin");
  },

  logout() {
    window.localStorage.clear();
    return service.get("/auth/logout");
  }
};
