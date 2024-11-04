import type { Component } from "solid-js";
import Header from "./components/Header";
import { RouteSectionProps } from "@solidjs/router";

const App: Component<RouteSectionProps<unknown>> = (
  props: RouteSectionProps<unknown>,
) => {
  return (
    <div class="max-h-max min-h-screen">
      <Header />
      <div class="flex h-screen overflow-y-hidden pt-[70px]">
        {props.children}
      </div>
    </div>
  );
};

export default App;
