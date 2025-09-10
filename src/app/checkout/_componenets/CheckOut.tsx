"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addressSchema, addressSchemaForm } from "@/schema/address.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { checkoutOnline } from "../_actions/checkout.action"

export default function CheckOut({ cartId }: { cartId: string }) {

  const form = useForm<addressSchemaForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      details: '',
      city: '',
      phone: '',
    }

  })

  async function OnSubmit(data: addressSchemaForm) {
    const shippingAddress = data
    const res = await checkoutOnline(cartId, '', shippingAddress)
    console.log(res)
    if (res?.status === 'success')
      window.location.href = res?.session?.url


  }
  return (<>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(OnSubmit)} className="w-2/3 mx-auto my-5">

    <FormField
      control={form.control}
      name="details"
      render={({ field }) => (
        <FormItem className="my-3">
          <FormLabel>Details</FormLabel>
          <FormControl>
            <Input type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem className="my-3">
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem className="my-3">
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input type="tel" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <Button type="submit">Submit</Button>
  </form>
</Form>

  </>)


}