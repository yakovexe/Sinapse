import { Component } from "solid-js";
import { FlashcardWithId } from "../models/flashcard";
import ModalBase from "./ModalBase";

interface CardModalProps {
  card: FlashcardWithId;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const CardModal: Component<CardModalProps> = (props) => {
  return (
    <ModalBase onClose={props.onClose}>
      <h2 class="mb-2 text-xl font-bold">{props.card.question}</h2>
      <p class="text-lg">{props.card.answer}</p>
      <div class="mt-4 flex justify-end">
        <button
          class="h-12 border-2 border-black bg-[#FDFFF7] px-4 py-2 hover:bg-gray-200 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          onClick={() => props.onDelete(props.card.id)}
        >
          Deletar
        </button>
      </div>
    </ModalBase>
  );
};

export default CardModal;
