import { Component } from "solid-js";

export interface FloatingButtonProps {
  Icon: Component;
  Text: string;
  onClick: () => void;
}

export interface CardProps {
  id: number;
  text: string;
  title: string;
  onClick: () => void;
}

export interface CreateModalProps {
  onCreate: () => void;
  onClose: () => void;
}
