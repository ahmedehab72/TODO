
import { z } from "zod";
// Define the schema for the form using Zod
export const todoFormSchema = z.object({
    title: z.string().min(5, { message: "title must be at least 5 characters long" }).max(30, { message: "title must be at most 30 characters long" }),
    body: z.string().max(80, { message: "body must be at most 80 characters long" }).optional(),
    completed : z.boolean(),
    user_id: z.string()
});

// Type for the form values based on the schema
export type TodoFormValue = z.infer<typeof todoFormSchema>;

