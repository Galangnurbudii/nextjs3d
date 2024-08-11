"use client";

import { registerUser } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email format is invalid"),
    password: z
      .string()
      .min(8, "Password length must be 8 character(s) or more"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof RegisterFormSchema>;

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(RegisterFormSchema),
  });

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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await registerMutation.mutateAsync({
        name: data.name,
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
          <Input type="text" placeholder="Name" {...register("name")} />
          {errors.name && (
            <div className="text-red-500 text-left text-xs">
              {errors.name.message}
            </div>
          )}

          <Input type="text" placeholder="Email" {...register("email")} />
          {errors.email && (
            <div className="text-red-500 text-left text-xs">
              {errors.email.message}
            </div>
          )}

          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-red-500 text-left text-xs">
              {errors.password.message}
            </div>
          )}

          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-left text-xs">
              {errors.confirmPassword.message}
            </div>
          )}

          <Button
            className="w-full bg-slate-700"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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
