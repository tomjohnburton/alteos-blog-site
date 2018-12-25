import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

export default {
  service,

  createPost(data) {
    return service
      .post("/post/create-post", data)
      .then(res => {
        console.log("Success");
      })
      .catch(err => {
        console.log(err);
      });
  }
};
