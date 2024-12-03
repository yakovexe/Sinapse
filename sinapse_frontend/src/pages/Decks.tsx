import { createSignal, For, Show, type Component } from "solid-js";
import FloatingButton from "../components/FloatingButton";
import AddIcon from "../assets/misc/AddIcon";
import Card from "../components/Card";
import { useNavigate } from "@solidjs/router";
import CreateDeckModal from "../components/CreateFlashcardModal";

const Decks: Component = () => {
  const [showModal, setShowModal] = createSignal(false);

  const navigate = useNavigate();

  const handleCreateDeck = () => {
    setShowModal(false);
  };

  const cards = [
    {
      id: 1,
      name: "Matemática",
    },
    {
      id: 2,
      name: "Inglês",
    },
    {
      id: 3,
      name: "Espanhol",
    },
  ];
  return (
    <div
      class="h-full w-full"
      style={{
        background:
          "linear-gradient(90deg, #F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, linear-gradient(#F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, #030001",
      }}
    >
      <Show when={showModal()}>
        <CreateDeckModal
          onCreate={handleCreateDeck}
          onClose={() => setShowModal(false)}
        ></CreateDeckModal>
      </Show>
      <h1 class="mx-auto mt-4 w-48 bg-white text-center text-4xl font-bold">
        Baralhos:
      </h1>
      <div class="grid grid-cols-1 gap-6 rounded-md p-8 text-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <For each={cards} fallback={<p>Carregando...</p>}>
          {(card) => (
            <Card
              id={card.id}
              title={card.name}
              text="Ver Baralho"
              onClick={() => {
                navigate(`/flashcards/${card.id}`);
              }}
            ></Card>
          )}
        </For>
      </div>
      <div class="fixed bottom-4 right-4">
        <FloatingButton
          Icon={AddIcon}
          Text="Novo Baralho"
          onClick={() => setShowModal(true)}
        ></FloatingButton>
      </div>
    </div>
  );
};

export default Decks;
