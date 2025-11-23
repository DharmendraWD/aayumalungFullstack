import mongoose from "mongoose";
const clientMessageSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      message: { type: String, required: true },
      date: { type: Date, default: Date.now },
}, { timestamps: true });

export const ClientMessage = mongoose.model("ClientMessage", clientMessageSchema);
