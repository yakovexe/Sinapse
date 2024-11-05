import type { Component } from "solid-js";

const CardsHome: Component = () => {
  const cards = ["Matemática", "Inglês", "Espanhol"];
  return (
    <div
      class="h-full w-full"
      style={{
        background:
          "linear-gradient(90deg, #F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, linear-gradient(#F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, #030001",
      }}
    >
      <div class="grid grid-cols-1 gap-6 rounded-md p-8 text-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {cards.map((card) => (
          <div class="h-full w-80 rounded-md border-2 border-black bg-white hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <a href="" class="block cursor-pointer">
              <article class="h-full w-full">
                <div class="h-full px-6 py-5 text-left">
                  <h1 class="mb-4 text-[32px]">{card}</h1>
                  <strong>Ver Baralho</strong>
                </div>
              </article>
            </a>
          </div>
        ))}
      </div>
      <div class="fixed bottom-4 right-4">
        <div class="group relative cursor-pointer rounded-full border-2 border-black bg-white p-4 text-black hover:bg-gray-200 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          <svg
            class="size-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span class="absolute bottom-full left-[35%] mb-2 hidden w-max -translate-x-1/2 transform rounded-md bg-gray-700 p-2 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
            Adicionar Baralho
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardsHome;
