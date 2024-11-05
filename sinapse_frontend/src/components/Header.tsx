import type { Component } from "solid-js";
import { A } from "@solidjs/router";

const Header: Component = () => {
  return (
    <header class="absolute flex h-[70px] w-full items-center justify-between border-b-2 border-black bg-white px-2">
      <A class="text-3xl font-bold text-black" href="/">
        Sinapse
      </A>
      <nav>
        <ul class="flex h-full items-center gap-2">
          <li>
            <A
              href="/about"
              class="h-12 border-2 border-black bg-[#FDFFF7] p-2.5 hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              Sobre nós
            </A>
          </li>
          <li>
            <A
              href="/login"
              class="h-12 border-2 border-black bg-black p-2.5 px-4 text-white hover:bg-gray-700 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              Entrar
            </A>
          </li>
          <li>
            <A
              href="/register"
              class="h-12 border-2 border-black bg-black p-2.5 text-white hover:bg-gray-700 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              Registrar
            </A>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
