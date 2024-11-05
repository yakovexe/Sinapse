import { useLocation, useNavigate } from "@solidjs/router";
import { createRenderEffect, createSignal, JSX, on, ParentProps, Show } from "solid-js";

async function fakeAuth() {
    setTimeout(() => {}, 1000);
    return true;
}

export function AuthGuard(props: ParentProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function performAuthCheck() {
    setIsAuthenticated(false);
    const auth = await fakeAuth();
    if (auth) {
      setIsAuthenticated(true);
      console.log(`Authenticated: ${new Date()}`);
    } else {
      navigate("/login");
    }
  }

  createRenderEffect(on(() => location.pathname, performAuthCheck));

  return (
    <>
      <Show when={isAuthenticated()} fallback={<div>FALLLBACK</div>}>
        {props.children}
      </Show>
    </>
  );
}