import { useNavigate } from "@solidjs/router";
import type { Component } from "solid-js";

const Register: Component = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login");
    navigate("/cardshome");
  };

  return (
    <div
      class="flex h-full w-full flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(90deg, #F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, linear-gradient(#F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, #030001",
      }}
    >
      <div class="flex flex-col gap-4 rounded-md bg-white p-12 text-center">
        <h1 class="text-2xl font-bold">Registrar</h1>
        <div class="flex flex-col gap-2 text-left">
          <label for="email" class="text-lg font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            class="w-64 border-2 border-black p-2.5 focus:bg-gray-300 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            placeholder="email@exemplo.com"
          />
        </div>

        <div class="flex flex-col gap-2 text-left">
          <label for="password" class="text-lg font-semibold">
            Senha
          </label>
          <input
            id="password"
            type="password"
            class="w-64 border-2 border-black p-2.5 focus:bg-gray-300 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          />
        </div>

        <div class="flex flex-col gap-2 text-left">
          <label for="confirm-password" class="text-lg font-semibold">
            Confirmar Senha
          </label>
          <input
            id="confirm-password"
            type="password"
            class="w-64 border-2 border-black p-2.5 focus:bg-gray-300 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          />
        </div>

        <button
          onClick={() => handleLogin()}
          class="mt-4 h-12 border-2 border-black bg-black p-2.5 text-white hover:bg-gray-700 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Register;
