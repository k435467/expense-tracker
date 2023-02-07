import React from "react";
import { Container } from "./Container";
import { NavMenu } from "./NavMenu";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Container>{children}</Container>
      <div className="absolute bottom-0 left-0 right-0">
        <Container>
          <NavMenu />
        </Container>
      </div>
    </>
  );
};
