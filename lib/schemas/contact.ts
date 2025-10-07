import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(120).optional(),
  project: z.string().min(10).max(2000),
  budget: z.string().max(120).optional(),
  locale: z.union([z.literal("en"), z.literal("fr")]),
});

export type ContactPayload = z.infer<typeof contactSchema>;
