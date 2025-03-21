import { RegisterForm } from "@/components/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Footer } from "../../footer";
import { Header } from "../../header";
export default function RegisterPage() {
  return (
    <>
    <Header></Header>
    <div  className="max-w-screen max-h-screen mx-auto border border-gray-200 rounded-md shadow-sm p-6 bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[700px] bg-white">
      <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-orange-500">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create an account.
          </p>
        </div>
        <div>
      
          <Header></Header>
            <RegisterForm />
        </div>
       
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}
