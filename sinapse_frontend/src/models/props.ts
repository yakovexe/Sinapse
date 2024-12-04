import { Component } from "solid-js";

export interface FloatingButtonProps {
  Icon: Component;
  Text: string;
  onClick: () => void;
}

export interface CardProps {
  id: string;
  text: string;
  title: string;
  onClick: () => void;
}

export interface CreateDeckProps {
  onCreate: (name: string) => void;
  onClose: () => void;
}

export interface CreateFlashcardProps {
  onCreate: (question: string, answer: string) => void;
  onClose: () => void;
}
