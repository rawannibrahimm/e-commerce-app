"use client"

import { createCashOrder } from "@/app/_actions/checkout.actions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CheckoutSchema, CheckoutSchemaType } from "@/lib/validation/checkout.schema"
import { zodResolver } from "@hookform/resolvers/zod"
// import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function CashCheckoutDialog({cartId}:{cartId: string}) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const form = useForm({
        resolver: zodResolver(CheckoutSchema),
        mode:"all",
        defaultValues: {
            shippingAddress: {
                city:"",
                details:"",
                phone:""
            }
        },
    })
    
    async function handleShipppingInfo(values: CheckoutSchemaType) {
        const response = await createCashOrder(cartId, values);
        console.log(response)
        if (response.status =="success"){
            toast.success("Order created successfully")
            form.reset()
            queryClient.invalidateQueries({
                queryKey: ['cart'],
            })
            router.push("/allorders")
        } else {
            toast.error(response.message)
        }
    }

    return (
    <>
    <Dialog>
        <form>
        <DialogTrigger asChild>
            <button className="w-full cursor-pointer bg-[#2a5631] hover:bg-[#16371b] text-white py-3 rounded-full transition font-medium">
                Cash on delivery
            </button>
        </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add Shipping Information</DialogTitle>
                    <DialogDescription>
                        Please enter your shipping information to complete your order.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleShipppingInfo)}>
                    <div className="grid grid-cols-12 space-y-7">
                        <div className="col-span-12 px-10">
                            <Controller name="shippingAddress.city" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='text' {...field} id={field.name} placeholder="Enter your city"/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />)
                                    }
                                </Field>
                                )}
                            />
                        </div>
                        <div className="col-span-12 px-10">
                            <Controller name="shippingAddress.details" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='text' {...field} id={field.name} placeholder="Enter Details"/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />)
                                    }
                                </Field>
                                )}
                            />
                        </div>
                        <div className="col-span-12 px-10">
                            <Controller name="shippingAddress.phone" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='tel' {...field} id={field.name} placeholder="Enter your phone"/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />)
                                    }
                                </Field>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-10">
                    <DialogClose className="mt-6" asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                        <Button disabled={form.formState.isSubmitting} className="mt-6 w-30 bg-[#2a5631] hover:bg-[#16371b] p-3 cursor-pointer">
                            {form.formState.isSubmitting? <Spinner/> : ""}
                            Checkout
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </form>
    </Dialog>
    </>
    )
}
