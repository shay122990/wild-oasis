import { useEffect, useRef } from "react";

export function useClickOutside(close) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // If the modal exists AND the click was NOT inside the modal...
      if (ref.current && !ref.current.contains(e.target)) close();
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [ref, close]);

  return ref;
}
