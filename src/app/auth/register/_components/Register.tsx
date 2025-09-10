'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, registerSchemaForm } from '@/schema/register.schema'

export default function Register() {

    const form = useForm<registerSchemaForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            rePassword: '',
            phone: ''
        }
    })



    async function onSubmit(data: registerSchemaForm) {
        try {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            console.log("Register response:", result);

            if (result.message === "success") {
                alert("successful");

            } else {
                alert(` Error ${result.message}`);
            }

        } catch (error) {
            console.error(" Error during registration:", error);
            alert("Error during registration");
        }
    }

    return (
        <>
            <h2 className='my-5'>Register Now:</h2>
            <Form {...form}>
                <form className='w-2/3 mx-auto ml-auto block' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name='name'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='my-5'>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />

                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <FormField
                        name='email'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='my-5'>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <div>
                                        <Input type='email' {...field} />
                                        <p>{field.value}</p>
                                    </div>
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />

                    <FormField
                        name='password'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='my-5'>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' autoComplete='off' {...field} />

                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <FormField
                        name='rePassword'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='my-5'>
                                <FormLabel>Repassword</FormLabel>
                                <FormControl>
                                    <Input type='password' autoComplete='off' {...field} />

                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <FormField
                        name='phone'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='my-5'>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type='phone' {...field} />

                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />

                    <Button className='bg-main text-white my-5 ml-auto block cursor-pointer'>Register now</Button>

                </form>
            </Form>

        </>
    )
}
