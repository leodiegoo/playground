import { Col, Container, Link, Row, Spacer } from "@nextui-org/react";
import { StyledNavContainer, StyledNavMainContainer } from "./styles";

import NextLink from "next/link";
import dynamic from "next/dynamic";

const Navbar = () => {
  return (
    <StyledNavMainContainer>
      <StyledNavContainer detached={false} showBlur={true}>
        <Container
          lg={true}
          as="nav"
          display="flex"
          wrap="nowrap"
          alignItems="center"
        >
          <Col
            className="navbar__logo-container"
            css={{
              "@mdMax": {
                width: "100%",
              },
            }}
          >
            <Row justify="flex-start" align="center">
              <NextLink href="/">
                <Link href="/">Playground</Link>
              </NextLink>
              <Spacer x={0.4} />
            </Row>
          </Col>
        </Container>
      </StyledNavContainer>
    </StyledNavMainContainer>
  );
};

export { Navbar };
