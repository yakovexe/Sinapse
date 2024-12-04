import { useNavigate, useParams } from "@solidjs/router";
import {
  createEffect,
  createSignal,
  For,
  Show,
  type Component,
} from "solid-js";
import FloatingButton from "../components/FloatingButton";
import AddIcon from "../assets/misc/AddIcon";
import Card from "../components/Card";
import CardModal from "../components/CardModal";
import { FlashcardWithId } from "../models/flashcard";
import CreateFlashcardModal from "../components/CreateFlashcardModal";
import PlayIcon from "../assets/misc/PlayIcon";
import { FlashcardService } from "../services/FlashcardService";
import { DeckService } from "../services/DeckService";

const Flashcards: Component = () => {
  const navigate = useNavigate();
  const flashcardService = new FlashcardService();
  const deckService = new DeckService();

  const params = useParams();

  const [flashcardsInfo, setFlashcardsInfo] = createSignal<FlashcardWithId[]>(
    [],
  );

  const [showFlashcardInfoModal, setShowFlashcardInfoModal] =
    createSignal(false);
  const [showCreateFlashcardModal, setShowCreateFlashcardModal] =
    createSignal(false);

  const [modalValue, setModalValue] = createSignal<FlashcardWithId>({
    id: "",
    deck_id: "",
    question: "",
    answer: "",
  });

  createEffect(() => {
    loadFlashcards();
  });

  const loadFlashcards = () => {
    flashcardService.getFlashcards(params.id).then((data) => {
      setFlashcardsInfo(data);
    });
  };

  const handleCreateFlashcard = (question: string, answer: string) => {
    console.log(question, answer);
    flashcardService
      .createFlashcard(params.id, question, answer)
      .then((data) => {
        window.location.href = `/flashcards/${params.id}`;
      });
    setShowCreateFlashcardModal(false);
  };

  // Set modal values of the clicked flashcard then shows it
  const createModal = (card: FlashcardWithId) => {
    setModalValue(card);
    setShowFlashcardInfoModal(true);
  };

  const handleDeleteFlashcard = (id: string) => {
    flashcardService.deleteFlashcard(id).then((data) => {
      window.location.href = `/flashcards/${params.id}`;
    });
  };

  const handleDeleteDeck = () => {
    deckService
      .deleteDeck(params.id)
      .then((data) => (window.location.href = `/decks`));
  };

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
          onDelete={(id) => handleDeleteFlashcard(id)}
          onClose={() => setShowFlashcardInfoModal(false)}
        ></CardModal>
      </Show>
      <Show when={showCreateFlashcardModal()}>
        <CreateFlashcardModal
          onClose={() => setShowCreateFlashcardModal(false)}
          onCreate={(q, a) => handleCreateFlashcard(q, a)}
        ></CreateFlashcardModal>
      </Show>
      <h1 class="mx-auto mt-4 w-56 bg-white text-center text-4xl font-bold">
        Flashcards:
      </h1>
      <div class="grid grid-cols-1 gap-4 rounded-md p-8 text-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <For
          each={flashcardsInfo()}
          fallback={
            <p class="bold relative left-0 bg-white text-center text-2xl md:left-1/2 xl:left-full">
              Sem Flashcards. Crie algum!
            </p>
          }
        >
          {(card, index) => (
            <>
              <Card
                id={index.toString()}
                title={card.question}
                text="Ver Flashcard"
                onClick={() => createModal(card)}
              ></Card>
            </>
          )}
        </For>
      </div>
      <button
        onClick={() => handleDeleteDeck()}
        class="mx-auto mb-8 mt-8 block h-12 border-2 border-black bg-black p-2.5 text-white hover:bg-gray-700 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
      >
        Deletar Baralho
      </button>

      <Show when={flashcardsInfo().length > 0}>
        <div class="fixed bottom-24 right-4">
          <FloatingButton
            Icon={PlayIcon}
            Text="Jogar Baralho"
            onClick={() => navigate("/play/" + params.id)}
          ></FloatingButton>
        </div>
      </Show>
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

export default Flashcards;
