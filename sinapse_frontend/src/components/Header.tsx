import { createEffect, createSignal, type Component } from "solid-js";
import { A, useLocation } from "@solidjs/router";

const Header: Component = () => {
  let [isPrivateRoute, setIsPrivateRoute] = createSignal(false);
  const location = useLocation();

  createEffect(() => {
    setIsPrivateRoute(
      location.pathname.startsWith("/decks") ||
        location.pathname.startsWith("/flashcards"),
    );
  });

  const navItems = [
    {
      href: "/login",
      label: "Entrar",
    },
    {
      href: "/register",
      label: "Registrar",
    },
  ];

  return (
    <header class="absolute flex h-[70px] w-full items-center justify-between border-b-2 border-black bg-white px-2">
      <A class="text-3xl font-bold text-black" href="/">
        Sinapse
      </A>

      <nav>
        <ul class="flex h-full items-center gap-1 sm:gap-2">
          <li>
            <A
              href="/about"
              class="bg-[#FDFFF7 sm:text-md h-12 border-2 border-black p-2 text-sm hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:p-2.5"
            >
              Sobre nós
            </A>
          </li>
          {isPrivateRoute() ? null : (
            <div class="flex h-full items-center gap-1 sm:gap-2">
              {navItems.map((item) => (
                <li>
                  <A
                    href={item.href}
                    class="sm:text-md h-12 border-2 border-black bg-[#FDFFF7] p-2 text-sm hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:p-2.5"
                  >
                    {item.label}
                  </A>
                </li>
              ))}
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
