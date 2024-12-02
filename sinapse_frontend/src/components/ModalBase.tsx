// Modal.tsx
import { Component, JSXElement } from "solid-js";

interface ModalProps {
  onClose: () => void;
  children: JSXElement;
}

const ModalBase: Component<ModalProps> = (props) => {
  return (
    <div
      class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-15"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
    >
      <div class="w-fit min-w-96 max-w-[80%] rounded-md bg-white p-6">
        {props.children}
      </div>
    </div>
  );
};

export default ModalBase;
