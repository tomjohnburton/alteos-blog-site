import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000",
  withCredentials: true
});

export const getPosts = () => async dispatch => {
  const res = await service.get("/api/post/list-posts");
  dispatch({
    type: "GET_POSTS",
    payload: res.data.sort(function(a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    })
  });
};
// export const getPosts = () => async dispatch => {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//   dispatch({ type: "GET_POSTS", payload: res.data });
// };

export const createPost = data => async dispatch => {
  const res = await service.post("/api/post/create-post", data);
  dispatch({ type: "CREATE_POST", payload: res });
};
export const editPost = data => async dispatch => {
  const res = await service.patch("/api/post/edit-post", data);
  dispatch({ type: "EDIT_POST", payload: res });
};
export const deletePost = _id => async dispatch => {
  const res = await service.post("/api/post/delete-post", { _id });
  dispatch({ type: "DELETE_POST", payload: res });
};

export const signup = user => async dispatch => {
  const res = await service.post("/signup", user);
  dispatch({ type: "SIGNUP", payload: res });
};
export const login = user => async dispatch => {
  const res = await service.post("/login", user);
  dispatch({ type: "LOGIN", payload: res });
};

export const addLike = _id => async dispatch => {
  const res = await service.patch("/api/post/add-like", { _id });
  dispatch({ type: "ADD_LIKE", payload: res });
};
