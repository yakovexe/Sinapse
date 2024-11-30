// Modal.tsx
import { Component, createSignal, Show } from "solid-js";
import { Flashcard } from "../models/flashcard";

interface ModalProps {
  card: Flashcard;
  onDelete: () => void;
  onClose: () => void;
}

const CardModal: Component<ModalProps> = (props) => {
  return (
    <div
      class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-10"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
    >
      <div class="w-1/3 rounded-md bg-white p-6">
        <h2 class="mb-2 text-xl font-bold">{props.card.question}</h2>
        <p class="text-lg">{props.card.answer}</p>
        <div class="mt-4 flex justify-end">
          <button
            class="h-12 border-2 border-black bg-[#FDFFF7] px-4 py-2 hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            onClick={props.onDelete}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
