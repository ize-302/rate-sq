import { useDisclosure } from "@mantine/hooks";
import * as React from "react";

export const DrawerContext = React.createContext(null);

const DrawerProvider = ({
  children,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <DrawerContext.Provider
      value={{
        opened,
        open,
        close
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;