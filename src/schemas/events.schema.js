import { z } from "zod";

export const createEventsSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
  
});
