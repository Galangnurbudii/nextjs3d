"use client";

import { loginUser } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data.error) {
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data.error,
          className: "text-white",
        });
      }
    },
  });

  async function login(formData: FormData) {
    try {
      const email = formData.get("email")?.toString().trim();
      const password = formData.get("password")?.toString().trim();

      if (!email || !password) throw new Error("Please fill all the field");

      await loginMutation.mutateAsync({ email, password });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
        className: "text-white",
      });
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center space-y-10 w-1/5 p-8 border-2 rounded-2xl">
        <img src="/images/logo.png" alt="" width={120} height={120} />

        <form action={login} className="space-y-4 w-full text-center">
          <Input type="email" placeholder="Email" name="email" />
          <Input type="password" placeholder="Password" name="password" />
          <Button className="w-full bg-slate-700" type="submit">
            {loginMutation.isPending ? (
              <div className="gap-2 flex items-center">
                Processing{" "}
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            ) : (
              "Login"
            )}
          </Button>
          <h1 className="text-gray-500 text-sm">
            Don't have account ?{" "}
            <Link className="font-bold underline" href={"/register"}>
              Sign Up
            </Link>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
