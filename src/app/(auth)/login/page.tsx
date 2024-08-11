"use client";

import { loginUser } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Email format is invalid" }),
  password: z
    .string()
    .min(8, { message: "Password length must be 8 character(s) or more" }),
});

type FormFields = z.infer<typeof LoginFormSchema>;

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginFormSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data.error) {
        router.push("/");
      } else {
        toast.error(data.error);
      }
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center space-y-10 w-1/5 p-8 border-2 rounded-2xl">
        <img src="/images/logo.png" alt="" width={120} height={120} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full text-center"
        >
          <Input type="text" placeholder="Email" {...register("email")} />
          {errors.email && (
            <div className="text-red-500 text-center text-xs">
              {errors.email.message}
            </div>
          )}
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-red-500 text-center text-xs">
              {errors.password.message}
            </div>
          )}
          <Button
            className="w-full bg-slate-700"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="gap-2 flex items-center">
                {"Processing"}
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            ) : (
              "Login"
            )}
          </Button>
          <h1 className="text-gray-500 text-sm">
            {`Don't have account ? `}
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
