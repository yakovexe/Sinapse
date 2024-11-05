import { A } from "@solidjs/router";
import type { Component } from "solid-js";

const About: Component = () => {
  return (
    <div
      class="flex h-full w-full flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(90deg, #F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, linear-gradient(#F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, #030001",
      }}
    >
      <div class="flex flex-col gap-4 rounded-md bg-white px-[15%] py-8 text-center">
        <h1 class="text-2xl font-bold">Sobre nós</h1>
        <p>*Coisas sobre o projeto*</p>
      </div>
    </div>
  );
};

export default About;
