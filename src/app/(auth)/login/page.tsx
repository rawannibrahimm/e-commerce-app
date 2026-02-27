"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card,} from "@/components/ui/card"
import { Field, FieldError, FieldLabel,} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { logInSchema, logInSchemaType} from '@/lib/validation/auth.schema'
// import { signInUser } from '@/services/auth.services'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"


export default function Login() {
    // instead of react useNavigate
    const router = useRouter()
    
    const form = useForm({
        resolver: zodResolver(logInSchema),
        mode:"all",
        defaultValues: {
            email:"",
            password:"",
        },
    })

    // values must have type, so into the authSchema zod helps us so much by making types 
    async function handleRegister(values: logInSchemaType) {
        // Before next-auth
        // const response = await signInUser(values);
        // console.log(response)
        // if (response.message =="success"){
        //     toast.success("Signed-In Successfully")
        //     router.push('/')
        // } else {
        //     toast.error(response.message)
        // }

        // After Next auth
        const response = await signIn("credentials",{
            email: values.email,
            password: values.password,
            redirect: false,
        })
        if(response?.ok){
            toast.success("Signed-In Successfully")
            router.replace("/") 
        } else {
            toast.error(response?.error)
        }
    }

    return (
    <>
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
        <main className="flex min-h-screen w-full flex-col items-center p-12 dark:bg-black ">
            <div className="heading text-center">
                <h1 className="text-5xl text-black font-bold">Welcome to <span className="text-[#B58D47]">Comercio</span></h1>
                <div className="heading-info my-4">
                    <p className="font-semibold text-lg text-stone-600">Log-in right now & get best of offers.</p>
                </div>
            </div>
            <Card className='w-5xl mx-auto'>
                <form onSubmit={form.handleSubmit(handleRegister)}>
                    <div className="grid grid-cols-12 space-y-7">
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
                    </div>
                    <div className="flex justify-center">
                        <Button className="mt-6 w-30 bg-[#2a5631] hover:bg-[#16371b] p-3 cursor-pointer">
                            {form.formState.isSubmitting? <Spinner/> : ""}
                            Sign-in
                        </Button>
                    </div>
                </form>
            </Card>
        </main>
    </div>
    </>
    )
}
