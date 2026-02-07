import z from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  displayname: z.string(),
  password: z
    .string()
    .min(8, { message: "Atleast 8 characters are required" })
    .max(20, { message: "Cannot execeed 20 characters" }),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Atleast 8 characters are required" })
    .max(20, { message: "Cannot execeed 20 characters" }),
});
