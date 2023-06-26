import React from "react";
import "@/styles/globals.css";
import "@/styles/custom.scss";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { RouterTransition } from "@/components/RouterTransition";

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Inter, sans-serif",
      }}
      withNormalizeCSS
    >
      <RouterTransition />
      <Notifications position="top-center" containerWidth={350} />
      <Component {...pageProps} />
    </MantineProvider>
  );
}