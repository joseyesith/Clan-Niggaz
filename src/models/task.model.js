import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    // Campos adicionales de la reserva:
    clientName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    techAssistance: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
