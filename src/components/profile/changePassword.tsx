"use client"
import { updateLoggeduserpassword } from "@/app/_actions/profile.actions"
import { ChangePasswordSchema, ChangePasswordSchemaType } from "@/lib/validation/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Card } from "../ui/card"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { signIn } from "next-auth/react"

export default function ChangePassword() {
  const form = useForm({
        resolver: zodResolver(ChangePasswordSchema),
        mode:"all",
        defaultValues: {
            currentPassword:"",
            password:"",
            rePassword:""
        },
    })
    async function handleChangePassword(values: ChangePasswordSchemaType) {
        const response = await updateLoggeduserpassword(values);
        console.log(response)
        if (response.message =="success"){
            toast.success("Password Changed Successfully")
            // refresh NextAuth session with new token
            await signIn("credentials", {
              email: response.user.email,
              password: values.password,   // new password
              redirect: false,
            });
            form.reset()
        } else {
            toast.error(response.message)
        }
    }
  return (
    <>
      <section className="flex flex-col items-center p-12 dark:bg-black ">
            <Card className='w-5xl mx-auto'>
                <form onSubmit={form.handleSubmit(handleChangePassword)}>
                    <div className="grid grid-cols-12 space-y-7">
                        <div className="col-span-12 md:col-span-6 px-10">
                            <Controller name="currentPassword" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='password' {...field} id={field.name} placeholder="Enter your current password"/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />)
                                    }
                                </Field>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 px-10">
                            <Controller name="password" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='password' {...field} id={field.name} placeholder="Enter your new password"/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />)
                                    }
                                </Field>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 px-10">
                            <Controller name="rePassword" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>Re-Password</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='password' {...field} id={field.name} placeholder="Enter your re-password"/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />)
                                    }
                                </Field>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button disabled={form.formState.isSubmitting} className="mt-6 w-40 bg-[#2a5631] hover:bg-[#16371b] p-3 cursor-pointer">
                            {form.formState.isSubmitting? <Spinner/> : ""}
                            Change Password
                        </Button>
                    </div>
                </form>
            </Card>
        </section>
    </>
  )
}
