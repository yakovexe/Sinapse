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
      <div class="flex flex-wrap gap-8 rounded-md p-8 text-center">
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
    </div>
  );
};

export default CardsHome;
