import React from "react";
import { Container } from "./Container";
import { NavMenu } from "./NavMenu";
import { Toast } from "./Toast";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Toast />
      <Container>{children}</Container>
      <div className="fixed bottom-0 left-0 right-0">
        <Container>
          <NavMenu />
        </Container>
      </div>
    </>
  );
};
