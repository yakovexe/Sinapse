import { createEffect, createSignal, Show, type Component } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";

const Header: Component = () => {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [isPrivateRoute, setIsPrivateRoute] = createSignal(false);
  const navigate = useNavigate();
  const location = useLocation();

  createEffect(() => {
    setIsAuthenticated(localStorage.getItem("id") !== null);
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

  const handleLogout = () => {
    localStorage.removeItem("id");
    window.location.href = "/";
  };

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
          <Show
            when={!isAuthenticated()}
            fallback={
              <>
                <li>
                  <span
                    onClick={() => navigate("/decks")}
                    class="bg-[#FDFFF7 sm:text-md h-12 cursor-pointer border-2 border-black p-2 text-sm hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:p-2.5"
                  >
                    Baralhos
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => handleLogout()}
                    class="bg-[#FDFFF7 sm:text-md h-12 cursor-pointer border-2 border-black p-2 text-sm hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:p-2.5"
                  >
                    Sair
                  </span>
                </li>
              </>
            }
          >
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
          </Show>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
