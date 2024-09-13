"use client";
import { makeStore } from "@/lib/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}
