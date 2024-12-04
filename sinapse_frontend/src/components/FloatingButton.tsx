import { Component, Show } from "solid-js";
import { FloatingButtonProps } from "../models/props";

// Generic floating button
const FloatingButton: Component<FloatingButtonProps> = (props) => {
  return (
    <div
      onClick={props.onClick}
      class="group relative left-[-5%] cursor-pointer rounded-full border-2 border-black bg-white p-4 text-black hover:bg-gray-200 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]"
    >
      <props.Icon />
      <span class="absolute bottom-full left-[35%] mb-2 hidden w-max -translate-x-1/2 transform rounded-md bg-gray-700 p-2 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
        <Show when={props.Text}>{props.Text}</Show>
      </span>
    </div>
  );
};

export default FloatingButton;
