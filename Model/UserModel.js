const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profilePic: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: false },
  phone: { type: String, required: false },
  githubid: { type: String, required: false },
  admin: { type: Boolean, required: false },
  otherdetails:[
    { type: String, required: false },
  ],
  created_at:{ type: String, required: true },
  updated_at:{ type: String, required: true },
  account_status:{ type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;