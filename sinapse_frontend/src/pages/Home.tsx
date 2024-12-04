import { A } from "@solidjs/router";
import { createEffect, createSignal, type Component } from "solid-js";

const Home: Component = () => {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  createEffect(() => {
    setIsAuthenticated(localStorage.getItem("id") !== null);
  });

  return (
    <div
      class="flex h-full w-full flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(90deg, #F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, linear-gradient(#F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, #030001",
      }}
    >
      <div class="rounded-md bg-white px-[15%] py-8 text-center">
        <h1 class="mb-4 text-6xl font-bold text-black">Sinapse</h1>
        <p class="mb-8 text-lg text-gray-600">Aprenda com flashcards</p>
        <A
          href={isAuthenticated() ? "/decks" : "/register"}
          class="h-12 border-2 border-black bg-[#FDFFF7] p-2.5 hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          Comece Agora!
        </A>
      </div>
    </div>
  );
};

export default Home;
