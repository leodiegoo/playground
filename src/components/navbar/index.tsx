import { Col, Container, Link, Row, Spacer } from "@nextui-org/react";
import { StyledNavContainer, StyledNavMainContainer } from "./styles";

import { signIn, signOut, useSession } from "next-auth/react";

import NextLink from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

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
                <Link href="/">Home</Link>
              </NextLink>
              <Spacer x={0.4} />
              {session ? (
                <Link onClick={() => signOut()}>Logout</Link>
              ) : (
                <Link onClick={() => signIn()}>Login</Link>
              )}
            </Row>
          </Col>
        </Container>
      </StyledNavContainer>
    </StyledNavMainContainer>
  );
};

export { Navbar };
