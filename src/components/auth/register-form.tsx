"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { registerUser } from "@/server/actions/auth/register";

const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await registerUser(formData);

      if (!response.success) {
        setError(response.error || "An error occurred. Please try again.");
        return;
      }

      router.push("/login?registered=true");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-screen max-h-screen mx-auto border border-gray-200 rounded-md shadow-sm p-6 bg-white">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-lg font-medium text-orange-500">Informations générales</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium text-black">Nom complet <span className="text-orange-500">*</span></FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    autoComplete="name"
                    disabled={isLoading}
                    className="border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium text-black">Email <span className="text-red-500">*</span></FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    className="border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium text-black">Mot de passe <span className="text-red-500">*</span></FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium text-black">Confirmer le mot de passe <span className="text-red-500">*</span></FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-sm text-red-500 font-medium">{error}</div>
          )}

          <div className="flex justify-end pt-4 space-x-2 border-t border-gray-200">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isLoading && <Loader2 className="max-w-screen max-h-screen mx-auto border border-gray-200 rounded-md shadow-sm p-6 bg-white" />}
              Valider
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}