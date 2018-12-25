import { combineReducers } from "redux";
import getPostsReducer from "./getPostsReducer";
import createPostReducer from "./createPostReducer";
import { reducer as formReducer } from "redux-form";
import signupReducer from "./signupReducer";
import loginReducer from "./loginReducer";
import editPostReducer from "./editPostReducer";
import addLikeReducer from "./addLikeReducer";
import deletePostReducer from "./deletePostReducer";

export default combineReducers({
  getPosts: getPostsReducer,
  createPost: createPostReducer,
  editPost: editPostReducer,
  deletePost: deletePostReducer,
  form: formReducer,
  signup: signupReducer,
  login: loginReducer,
  likes: addLikeReducer
});
