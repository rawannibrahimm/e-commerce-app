"use client"
import { updateLoggeduserData, } from "@/app/_actions/profile.actions"
import {  ProfileSchema, ProfileSchemaType } from "@/lib/validation/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Card } from "../ui/card"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { useSession } from "next-auth/react"

export default function UpdateInfo() {
    const { update } = useSession()
    const form = useForm({
        resolver: zodResolver(ProfileSchema),
        mode:"all",
        defaultValues: {
            name:"",
            email:"",
            phone:""
        },
    })

    async function handleUpdateInfo(values: ProfileSchemaType) {
        try {
            const response = await updateLoggeduserData(values);
            console.log("Update response:", response);

            if (response?.message === "success") {
                toast.success("Information Updated Successfully");
                await update({
                    user: response.user
                });
                form.reset(response.user)
            } else {
                toast.error(response?.message || "Update failed");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Something went wrong");
        } finally{
            form.reset();
        }
    }
    return (
    <>
        <section className="flex flex-col items-center p-12 dark:bg-black ">
            <Card className='w-5xl mx-auto'>
                <form onSubmit={form.handleSubmit(handleUpdateInfo)}>
                    <div className="grid grid-cols-12 space-y-7">
                        <div className="col-span-12 md:col-span-6 px-10">
                            <Controller name="name" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='text' {...field} id={field.name} placeholder="Enter your name"/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />)
                                    }
                                </Field>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 px-10">
                            <Controller name="email" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='email' {...field} id={field.name} placeholder="Enter your email"/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />)
                                    }
                                </Field>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 px-10 ">
                            <Controller name="phone" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='tel' {...field} id={field.name} placeholder="Enter your phone number"/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />)
                                    }
                                </Field>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button disabled={form.formState.isSubmitting} className="mt-6 w-55 bg-[#2a5631] hover:bg-[#16371b] p-3 cursor-pointer `">
                            {form.formState.isSubmitting? <Spinner/> : ""}
                            Update Personal Information
                        </Button>
                    </div>
                </form>
            </Card>
        </section>
    </>
  )
}
