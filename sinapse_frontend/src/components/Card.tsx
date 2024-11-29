import { Component } from "solid-js";
import { CardProps } from "../models/props";

const Card: Component<CardProps> = (props) => {
  return (
    <div
      onClick={props.onClick}
      class="h-full w-80 rounded-md border-2 border-black bg-white hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
    >
      <a href="" class="block cursor-pointer">
        <article class="h-full w-full">
          <div class="h-full px-6 py-5 text-left">
            <h1 class="mb-4 text-[32px]">{props.title}</h1>
            <strong>{props.text}</strong>
          </div>
        </article>
      </a>
    </div>
  );
};

export default Card;
