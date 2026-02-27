import * as z from "zod";

export const CheckoutSchema = z.object({
  shippingAddress: z.object({
    city: z
      .string()
      .nonempty("City is required")
      .min(3, "City must be at least 3 characters long")
      .max(30, "City must be less than or equal to 30 characters long"),

    details: z.string().nonempty("Details is required"),

    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^01[0125][0-9]{8}$/, "Phone number must be Egyptian"),
  }),
});

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;