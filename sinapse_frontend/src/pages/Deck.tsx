import { useNavigate, useParams } from "@solidjs/router";
import { createSignal, For, Show, type Component } from "solid-js";
import FloatingButton from "../components/FloatingButton";
import AddIcon from "../assets/misc/AddIcon";
import Card from "../components/Card";
import CardModal from "../components/CardModal";
import { Flashcard } from "../models/flashcard";
import CreateFlashcardModal from "../components/CreateFlashcardModal";

const Deck: Component = () => {
  const [showFlashcardInfoModal, setShowFlashcardInfoModal] =
    createSignal(false);
  const [showCreateFlashcardModal, setShowCreateFlashcardModal] =
    createSignal(false);
  const [modalValue, setModalValue] = createSignal<Flashcard>({
    id: 0,
    deckId: 0,
    question: "",
    answer: "",
  });

  const handleCreateFlashcard = () => {
    setShowCreateFlashcardModal(false);
  };

  const createModal = (card: Flashcard) => {
    setModalValue(card);
    setShowFlashcardInfoModal(true);
  };

  const params = useParams();
  const cards: Flashcard[] = [
    {
      id: 1,
      deckId: 1,
      question: "Quem?",
      answer: "Eu",
    },
    {
      id: 2,
      deckId: 1,
      question:
        "O que é? O que é? O que é? O que é?O que é? O que é? O que é? O que é? O que é? O que é? O que é?  O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? O que é? ",
      answer: "Aquilo",
    },
    {
      id: 3,
      deckId: 1,
      question: "Quando?",
      answer: "Agora",
    },
  ];

  return (
    <div
      class="h-full w-full overflow-auto"
      style={{
        background:
          "linear-gradient(90deg, #F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, linear-gradient(#F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, #030001",
      }}
    >
      <Show when={showFlashcardInfoModal()}>
        <CardModal
          card={modalValue()}
          onDelete={() => {}}
          onClose={() => setShowFlashcardInfoModal(false)}
        ></CardModal>
      </Show>
      <Show when={showCreateFlashcardModal()}>
        <CreateFlashcardModal
          onClose={() => setShowCreateFlashcardModal(false)}
          onCreate={handleCreateFlashcard}
        ></CreateFlashcardModal>
      </Show>
      <h1 class="mx-auto mt-4 w-56 bg-white text-center text-4xl font-bold">
        Flashcards:
      </h1>
      <div class="grid grid-cols-1 gap-4 rounded-md p-8 text-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <For each={cards} fallback={<p>Carregando...</p>}>
          {(card) => (
            <>
              <Card
                id={card.id}
                title={card.question}
                text="Ver Flashcard"
                onClick={() => createModal(card)}
              ></Card>
            </>
          )}
        </For>
      </div>
      <div class="fixed bottom-4 right-4">
        <FloatingButton
          Icon={AddIcon}
          Text="Novo Flashcard"
          onClick={() => setShowCreateFlashcardModal(true)}
        ></FloatingButton>
      </div>
    </div>
  );
};

export default Deck;
