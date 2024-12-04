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
import { useNavigate } from "@solidjs/router";
import CreateDeckModal from "../components/CreateDeckModal";
import { getIdFromStorage } from "../utils";
import { DeckService } from "../services/DeckService";
import { UserService } from "../services/UserService";
import { Deck } from "../models/deck";

const Decks: Component = () => {
  const [showModal, setShowModal] = createSignal(false);
  const [userInfo, setUserInfo] = createSignal({
    id: "",
    username: "",
  });
  const [deckInfo, setDeckInfo] = createSignal<Deck[]>([]);
  const deckService = new DeckService();
  const userService = new UserService();
  let id: string;

  const navigate = useNavigate();

  const handleCreateDeck = (name: string) => {
    console.log("name ", name);
    deckService
      .createDeck(id, name)
      .then((data) => (window.location.href = "/decks"));
    setShowModal(false);
  };

  createEffect(() => {
    const idStorage = getIdFromStorage();
    if (!idStorage) navigate("/");
    id = idStorage!;

    userService.getUser(id).then((data) => setUserInfo(data));
    deckService.getDecks(id).then((data) => setDeckInfo(data));
  });

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
          onCreate={(name) => handleCreateDeck(name)}
          onClose={() => setShowModal(false)}
        ></CreateDeckModal>
      </Show>
      <div class="flex flex-col flex-wrap items-center justify-around bg-white text-center">
        <h1 class="m-4 w-72 text-center text-2xl font-bold">
          Informações do usuário:
        </h1>
        <div class="flex w-full flex-wrap justify-around gap-8">
          <div class="flex flex-col justify-center bg-white text-center">
            <span class="text-xl font-bold">Nome:</span>
            <span>{userInfo().username}</span>
          </div>
          <div class="flex flex-col justify-center bg-white text-center">
            <span class="text-xl font-bold">Id:</span>
            <span>{userInfo().id}</span>
          </div>
        </div>
      </div>
      <h1 class="mx-auto mt-4 w-48 bg-white text-center text-4xl font-bold">
        Baralhos:
      </h1>
      <div class="grid grid-cols-1 gap-6 rounded-md p-8 text-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <For
          each={deckInfo()}
          fallback={
            <p class="bold relative left-0 bg-white text-center text-2xl md:left-1/2 xl:left-full">
              Sem Baralhos. Crie algum!
            </p>
          }
        >
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
