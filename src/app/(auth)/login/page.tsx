import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { Footer } from "../../footer";
import { Header } from "../../header";

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="max-w-screen max-h-screen mx-auto border border-gray-200 rounded-md shadow-sm p-6 bg-white">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[700px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-orange-500">
              Welcome back!
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials below to log in to your account.
            </p>
          </div>

          <Card className="max-auto flex w-full flex-col justify-center space-y-6 sm:w-[700px] s p-6 bg-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold tracking-tight text-orange-500">
                Sign in
              </CardTitle>
              <CardDescription>
                Choose a sign-in method below to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading login form...</div>}>
                <LoginForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
