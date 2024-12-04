import { Component } from "solid-js";
import { CardProps } from "../models/props";

// Base card for decks and flashcards
const Card: Component<CardProps> = (props) => {
  return (
    <div
      onClick={props.onClick}
      class="m-auto h-full w-72 rounded-md border-2 border-black bg-white hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
    >
      <div class="block h-full cursor-pointer">
        <article class="h-full w-full">
          <div class="flex h-full flex-col justify-between px-6 py-5 text-left">
            <h1 class="mb-4 text-[32px]">{props.title}</h1>
            <strong>{props.text}</strong>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Card;
