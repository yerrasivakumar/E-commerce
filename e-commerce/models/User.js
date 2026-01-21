  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      mobileNumber: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      },
      profileImage: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
      }
    },
    { timestamps: true }
  );

  export default mongoose.model("User", userSchema);
