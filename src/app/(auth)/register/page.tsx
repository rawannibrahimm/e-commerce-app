"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card,} from "@/components/ui/card"
import { Field, FieldError, FieldLabel,} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { registerSchema, registerSchemaType } from '@/lib/validation/auth.schema'
import { signUpUser } from '@/services/auth.services'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'

export default function Register() {
    // instead of react useNavigate
    const router = useRouter()
    
    // step 1: 
    const form = useForm({
        resolver: zodResolver(registerSchema),
        mode:"all",
        defaultValues: {
            name:"",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },
    })

    // values must have type, so into the authSchema zod helps us so much by making types 
    async function handleRegister(values: registerSchemaType) {
        const response = await signUpUser(values);
        console.log(response)
        if (response.message =="success"){
            toast.success("Signed-Up Successfully")
            router.push('/login')
        } else {
            toast.error(response.message)
        }
    }

    return (
    <>
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
        <main className="flex min-h-screen w-full flex-col items-center p-12 dark:bg-black ">
            <div className="heading text-center">
                <h1 className="text-5xl text-black font-bold">Welcome to <span className="text-[#B58D47]">Comercio</span></h1>
                <div className="heading-info my-4">
                    <p className="font-semibold text-lg text-stone-600">Sign-up right now & get best of offers.</p>
                </div>
            </div>
            <Card className='w-5xl mx-auto'>
                <form onSubmit={form.handleSubmit(handleRegister)}>
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
                        <div className="col-span-12 md:col-span-6 px-10">
                            <Controller name="password" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='password' {...field} id={field.name} placeholder="Enter your password"/>
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
                                    <FieldLabel htmlFor={field.name}>Re-password</FieldLabel>
                                    <Input className=" focus-visible:ring-[#2a5631]/30 focus-visible:border-[#2a5631]" type='password' {...field} id={field.name} placeholder="Enter Re-password"/>
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
                        <Button className="mt-6 w-30 bg-[#2a5631] hover:bg-[#16371b] p-3 cursor-pointer">
                            {form.formState.isSubmitting? <Spinner/> : ""}
                            Sign-up
                        </Button>
                    </div>
                </form>
            </Card>
        </main>
    </div>
    </>
    )
}
