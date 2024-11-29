import { For, type Component } from "solid-js";
import FloatingButton from "../components/FloatingButton";
import AddIcon from "../assets/misc/AddIcon";
import Card from "../components/Card";

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
        <For each={cards} fallback={<p>Loading...</p>}>
          {(name, index) => (
            <Card
              id={index()}
              title={name}
              text="Ver Baralho"
              onClick={() => {}}
            ></Card>
          )}
        </For>
      </div>
      <div class="fixed bottom-4 right-4">
        <FloatingButton
          Icon={AddIcon}
          Text="Novo Baralho"
          onClick={() => {}}
        ></FloatingButton>
      </div>
    </div>
  );
};

export default CardsHome;
