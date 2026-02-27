import * as z from "zod";

export const ProfileSchema = z
    .object({
        name: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters long").max(30, "Name must be less than or equal to 30 characters long"),
        email: z
            .string()
            .nonempty("Email is required")
            .regex(/^(?=.*\d)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/, "Email must be valid"),
        phone: z
            .string()
            .nonempty("Phone number is required")
            // Egyptian numbers
            .regex(/^01[0125][0-9]{8}$/, "Phone number must be Egyptian"),
    })
    export type ProfileSchemaType = z.infer<typeof ProfileSchema>

export const ChangePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .nonempty("Current Password is required")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"),
        password: z
            .string()
            .nonempty("Password is required")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"),
        rePassword: z.string().nonempty("Re-Password is required"),
    })
    .refine((formData) => formData.password === formData.rePassword, {
        path: ["rePassword"],
        error: "Re-password must match password",
    });
    export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>