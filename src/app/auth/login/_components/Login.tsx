'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginSchemaForm } from '@/schema/login.schema'
import { signIn } from 'next-auth/react'


export default function Login() {

    const form = useForm<loginSchemaForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const firstError = Object.keys(form.formState.errors)[0]

    async function onSubmit(data: loginSchemaForm) {
     const res = await signIn('credentials',{
            email:data.email,
            password:data.password,
            redirect:false,
            callbackUrl:'/'
        })

        console.log("signIn response:", res)
        
        if(res?.ok)
         window.location.href=res?.url||''
        else
            console.log(res?.error)

    }

    function handleGitHubSignIn()
    {
        signIn('github',{
            callbackUrl:'/'
        })
    }

    return (
        <>
            <h2 className='my-5'>Login Now:</h2>
            <Form {...form}>
                <form className='w-2/3 mx-auto ml-auto block' onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        name='email'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='my-5'>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                        <Input type='email' {...field} />
                                        
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



                    <Button className='w-2/2 mx-auto bg-main text-white my-5 ml-auto block cursor-pointer'>Login</Button>

                </form>
            </Form>
            <div className='text-center'>
               <Button onClick={handleGitHubSignIn} className='w-2/3 mx-auto'> Login With GitHub <i className='fa-brands fa-github text-white'></i></Button>
            </div>
        </>
    )
}
