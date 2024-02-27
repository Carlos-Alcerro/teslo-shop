"use client";

import Link from "../../../../../node_modules/next/link";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { login, registerUser } from "@/actions/index";
import { useState } from "react";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setErrorMessage("");
    const { name, email, password } = data;
    console.log({ name, email, password });
    const res = await registerUser(name, email, password);

    if (!res.ok) {
      setErrorMessage(res.message);
      return;
    }
    await login(email.toLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/*  {errors.name?.type === "required" && (
        <span className="text-red-500 text-sm">
          * El campo nombre es obligatorio *
        </span>
      )} */}

      <label htmlFor="name">Nombre Completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.name,
        })}
        type="text"
        {...register("name", { required: true })}
        autoFocus
      />
      <label htmlFor="email">Email</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        type="email"
        {...register("email", {
          required: true,
          pattern:
            /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
        })}
      />
      <label htmlFor="password">Contrasena</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 8 })}
      />

      <span className="text-red-500 text-sm">{errorMessage}</span>

      <button type="submit" className="btn-primary">
        Crear Cuenta
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};

export default RegisterForm;
