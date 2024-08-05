"use client";

import { registerUser } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";

const Register = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (!data.error) {
        toast.success("User has been registered");
        router.push("/login");
      } else {
        toast.error(data.error);
      }
    },
  });

  async function register(formData: FormData) {
    try {
      const name = formData.get("name")?.toString().trim();
      const email = formData.get("email")?.toString().trim();
      const password = formData.get("password")?.toString().trim();
      const confirmPassword = formData
        .get("confirmPassword")
        ?.toString()
        .trim();

      if (!name || !email || !password || !confirmPassword)
        throw new Error("Please fill all the field");
      if (password !== confirmPassword)
        throw new Error("Password do not match");

      await registerMutation.mutateAsync({
        name: name,
        email: email,
        password: password,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center space-y-10 w-1/5 p-8 border-2 rounded-2xl">
        <img src="/images/logo.png" alt="" width={120} height={120} />

        <form action={register} className="space-y-4 w-full text-center">
          <Input required type="name" placeholder="Name" name="name" />
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
          <h1 className="text-gray-500 text-sm">
            {`Already have an account ? `}
            <Link className="font-bold underline" href={"/login"}>
              Sign In
            </Link>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Register;
