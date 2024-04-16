"use client";

import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PasswordBar from "./PasswordBar";
import { registerUser } from "@/app/lib/actions/authActions";
import { toast } from "react-toastify";

// SCHEMA
const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Please enter your first name.")
      .max(45, "First names can be up to 45 characters.")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    lastName: z
      .string()
      .min(1, "Please enter your last name.")
      .max(45, "Last names can be up to 45 characters.")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(10, "Passwords must be 10-25 characters.")
      .max(25, "Passwords must be 10-25 characters."),
    confirmPassword: z
      .string()
      .min(10, "Passwords must be 10-25 characters.")
      .max(25, "Passwords must be 10-25 characters."),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept the terms, busta.",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

//TYPES
type SignupInputType = z.infer<typeof FormSchema>;
//COMPONENT RENDER FUNCTION
const SignupForm = () => {
  // STATE AND HOOKS
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm<SignupInputType>({
    resolver: zodResolver(FormSchema),
  });
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
    console.log(passStrength);
  }, [watch().password]);

  // EVENT HANDLERS
  const toggleVisible = () => {
    setVisiblePassword((prev) => !prev);
  };

  const saveUser: SubmitHandler<SignupInputType> = async (data) => {
    const { confirmPassword, accepted, ...user } = data;
    try {
      const result = await registerUser(data);
      toast.success("Successfully registered!");
    } catch (error) {
      toast.error("Failed to register user.");
      console.error(error);
    }
  };

  // RENDER
  return (
    <>
      <form
        onSubmit={handleSubmit(saveUser)}
        className="grid grid-cols-2 gap-3 p-4 shadow border rounded-md"
      >
        <Input
          errorMessage={errors.firstName?.message}
          {...register("firstName")}
          label="First Name"
          startContent={<UserCircleIcon className="w-4" />}
          defaultValue=""
        />
        <Input
          errorMessage={errors.lastName?.message}
          {...register("lastName")}
          label="Last Name"
          startContent={<UserCircleIcon className="w-4" />}
          defaultValue=""
        />
        <Input
          errorMessage={errors.email?.message}
          {...register("email")}
          label="Email"
          className="col-span-2"
          startContent={<EnvelopeIcon className="w-4" />}
          defaultValue=""
        />
        <Input
          errorMessage={errors.password?.message}
          {...register("password")}
          label="Password"
          type={isVisiblePassword ? "text" : "password"}
          startContent={<KeyIcon className="w-4" />}
          defaultValue=""
          endContent={
            isVisiblePassword ? (
              <EyeSlashIcon
                className="w-4 cursor-pointer"
                onClick={toggleVisible}
              />
            ) : (
              <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisible} />
            )
          }
        />
        <Input
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          label="Confirm Password"
          type={isVisiblePassword ? "text" : "password"}
          defaultValue=""
          startContent={<KeyIcon className="w-4" />}
          endContent={
            isVisiblePassword ? (
              <EyeSlashIcon
                className="w-4 cursor-pointer"
                onClick={toggleVisible}
              />
            ) : (
              <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisible} />
            )
          }
        />

        <PasswordBar passStrength={passStrength} />

        <Button type="submit" className="col-span-2">
          Sign Up
        </Button>
        <Button type="submit" className="col-span-2" color="primary">
          <Link href="#" className=" text-white">
            {" "}
            Log In{" "}
          </Link>
        </Button>

        <Controller
          control={control}
          name="accepted"
          render={({ field }) => (
            <Checkbox
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="col-span-2 text-sm"
            >
              I solemnly swear that I am up to no good
            </Checkbox>
          )}
        />
        {!!errors.accepted && (
          <p className="text-xs col-span-2 text-next-iu-error-red">
            {errors.accepted.message}
          </p>
        )}
      </form>
    </>
  );
};

export default SignupForm;
