import React from "react";
import "@/styles/globals.css";
import "@/styles/custom.scss";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export default function App({ Component, pageProps }) {
  const [supabase] = React.useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <MantineProvider
        theme={{
          fontFamily: "Inter, sans-serif",
        }}
        withNormalizeCSS
      >
        <Notifications position="top-right" containerWidth={350} />
        <Component {...pageProps} />
      </MantineProvider>
    </SessionContextProvider>
  );
}