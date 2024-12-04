import { useLocation, useNavigate } from "@solidjs/router";
import {
  createRenderEffect,
  createSignal,
  JSX,
  on,
  ParentProps,
  Show,
} from "solid-js";

// Verify if there is a user id in the localStorage
async function verifyId() {
  return localStorage.getItem("id") !== null;
}

// Prevents users not authenticated from accessing private routes
export function AuthGuard(props: ParentProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function performAuthCheck() {
    setIsAuthenticated(false);
    const auth = await verifyId();
    if (auth) {
      setIsAuthenticated(true);
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
