import { Component, createSignal } from "solid-js";
import ModalBase from "./ModalBase";
import { CreateFlashcardProps } from "../models/props";

const CreateFlashcardModal: Component<CreateFlashcardProps> = (props) => {
  const [question, setQuestion] = createSignal("");
  const [answer, setAnswer] = createSignal("");

  return (
    <ModalBase onClose={props.onClose}>
      <h2 class="mb-6 text-center text-2xl font-bold">Criar Novo Flashcard:</h2>
      <input
        class="my-8 block w-full border-2 border-black p-2.5 focus:bg-gray-300 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        placeholder="Pergunta"
        onInput={(e) => setQuestion(e.currentTarget.value)}
      />
      <input
        class="my-8 block w-full border-2 border-black p-2.5 focus:bg-gray-300 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        placeholder="Resposta"
        onInput={(e) => setAnswer(e.currentTarget.value)}
      />
      <div class="mt-6 flex justify-end">
        <button
          class="h-12 border-2 border-black bg-[#FDFFF7] px-4 py-2 hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          onClick={() => props.onCreate(question(), answer())}
        >
          Criar Flashcard
        </button>
      </div>
    </ModalBase>
  );
};

export default CreateFlashcardModal;
