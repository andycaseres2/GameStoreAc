import { SignOut } from "../services/SignOut";
import { useStore } from "../store/store";

export function useSignOut() {
  const { setUser, setSession } = useStore();

  async function handleSignOut() {
    try {
      await SignOut();
      await setUser(null);
      await setSession(null);
      window.location.href = "/";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return handleSignOut;
}
