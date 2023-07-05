import React from "react";
import "@/styles/globals.css";
import "@/styles/custom.scss";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { RouterTransition } from "@/components/RouterTransition";
import TitleProvider from "@/context/titleContext";
import UserProvider from "@/context/userContext";
import DrawerProvider from "@/context/drawerContext";
import RatingProvider from "@/context/ratingContext";

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
      <UserProvider>
        <TitleProvider>
          <RatingProvider>
            <DrawerProvider>
              <Component {...pageProps} />
            </DrawerProvider>
          </RatingProvider>
        </TitleProvider>
      </UserProvider>
    </MantineProvider>
  );
}