// task.schema.js
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  date: z.string().optional(),

  clientName: z.string({
    required_error: "Client name is required",
  }),
  phone: z.string({
    required_error: "Phone is required",
  }),
  startTime: z.string({
    required_error: "Start time is required",
  }),
  duration: z.string({
    required_error: "Duration is required",
  }),
  serviceType: z.string({
    required_error: "Service type is required",
  }),
  techAssistance: z.boolean().optional(),
  notes: z.string().optional(),
});

