"use client";

import { registerUser } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const { toast } = useToast();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (!data.error) {
        toast({
          variant: "default",
          title: "Success !",
          description: "User has been registered",
          className: "bg-green-500 text-white",
        });
        router.push("/login");
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

  async function register(formData: FormData) {
    try {
      const email = formData.get("email")?.toString().trim();
      const password = formData.get("password")?.toString().trim();
      const confirmPassword = formData
        .get("confirmPassword")
        ?.toString()
        .trim();

      if (!email || !password || !confirmPassword)
        throw new Error("Please fill all the field");
      if (password !== confirmPassword)
        throw new Error("Password do not match");

      await registerMutation.mutateAsync({
        email: email,
        password: password,
      });
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

        <form action={register} className="space-y-4 w-full text-center">
          <Input required type="email" placeholder="Email" name="email" />
          <Input
            required
            type="password"
            placeholder="Password"
            name="password"
          />
          <Input
            required
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <Button className="w-full bg-slate-700" type="submit">
            {registerMutation.isPending ? (
              <div className="gap-2 flex items-center">
                Processing{" "}
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
