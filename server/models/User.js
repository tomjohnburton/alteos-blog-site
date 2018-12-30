// User model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    roles: { type: String, enum: ["Admin", "User"], default: "User" },
    posts: { type: [Schema.Types.ObjectId], ref: "Post" },
    likedPosts: { type: [Schema.Types.ObjectId], ref: "Post", default: [] }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
