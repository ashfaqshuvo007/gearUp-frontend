"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { registerAction } from "../_actions/authActions"
import { toast } from "sonner"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectLabel } from "radix-ui/select"

export const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? ""
  const [state, action, pending] = useActionState(registerAction.bind(null, redirectTo), false)

  useEffect(()=> {
    if(!state) return;
    if(!state.success){
        toast.error(state.message || "Registration failed");
    }
  }, [state]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription className="text-sm text-red-300">
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <Select name="role" defaultValue="CUSTOMER">
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="w-full max-w-48">
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                    <SelectItem value="PROVIDER">Provider</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                Select your role. Defaults to Customer role.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">
                  { pending ? "Submitting..." : "Create Account"}
                  
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
