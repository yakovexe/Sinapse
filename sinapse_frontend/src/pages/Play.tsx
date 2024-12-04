import { A, useParams } from "@solidjs/router";
import { createEffect, createSignal, Show, type Component } from "solid-js";
import { Flashcard } from "../models/flashcard";
import { DeckService } from "../services/DeckService";

const Home: Component = () => {
  const deckService = new DeckService();
  const params = useParams();

  const [currentCard, setCurrentCard] = createSignal<Flashcard>({
    deck_id: "",
    question: "",
    answer: "",
  });
  const [showAnswer, setShowAnswer] = createSignal(false);
  const [cardsInfo, setCardsInfo] = createSignal<Flashcard[]>([]);
  const [cardsFinished, setCardsFinished] = createSignal(false);

  let pageLoaded = false;

  const getRandomCardIndex = () => {
    if (cardsInfo().length <= 0) {
      console.log("fim");
      setCardsFinished(true);
      return -1;
    }

    const randomIndex = Math.floor(Math.random() * cardsInfo().length);

    return randomIndex;
  };

  const nextCard = () => {
    console.log("length", cardsInfo().length);
    if (cardsInfo().length <= 0) {
      setCardsFinished(true);
      return;
    }
    const randomIndex = getRandomCardIndex();
    console.log("a");
    if (randomIndex !== -1) {
      setShowAnswer(false);
      console.log(cardsInfo()[randomIndex]);
      setCurrentCard(cardsInfo()[randomIndex]);
      cardsInfo().splice(randomIndex, 1);
    }
  };

  const toggleAnswerVisibility = () => {
    setShowAnswer(!showAnswer());
  };

  createEffect(() => {
    if (!pageLoaded) {
      pageLoaded = true;
      deckService.getDeck(params.id).then((data) => {
        console.log(data);
        const test = data;
        setCardsInfo(data);
        nextCard();
      });
    }
  });

  return (
    <div
      class="flex h-full w-full flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(90deg, #F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, linear-gradient(#F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, #030001",
      }}
    >
      <div class="flex h-full flex-col justify-evenly text-center">
        <Show
          when={!cardsFinished()}
          fallback={
            <>
              <p class="bold bg-white p-4 text-4xl">
                Você Completou Todos os Flashcards!
              </p>
              <A
                href="/decks"
                class="text-md h-12 border-2 border-black bg-[#FDFFF7] p-2.5 hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              >
                Voltar à pagina de decks
              </A>
            </>
          }
        >
          <span class="bg-white p-2 text-3xl font-bold">
            {currentCard().question}
          </span>
          <Show
            when={showAnswer()}
            fallback={
              <button
                class="text-md h-12 border-2 border-black bg-[#FDFFF7] p-2.5 hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                onClick={toggleAnswerVisibility}
              >
                Mostrar Resposta
              </button>
            }
          >
            <span class="bg-white p-2 text-2xl">{currentCard().answer}</span>
            <button
              class="text-md h-12 border-2 border-black bg-[#FDFFF7] p-2.5 hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              onClick={nextCard}
            >
              Próximo
            </button>
          </Show>
        </Show>
      </div>
    </div>
  );
};

export default Home;
