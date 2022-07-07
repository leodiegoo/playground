import {
  Col,
  Container,
  Link,
  Row,
  Spacer,
  useBodyScroll,
} from "@nextui-org/react";
import { StyledNavContainer, StyledNavMainContainer } from "./styles";

import { signIn, signOut, useSession } from "next-auth/react";

import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks/use-media-query";

const Navbar = () => {
  const { data: session } = useSession();

  const [expanded, setExpanded] = useState(false);

  const isMobile = useMediaQuery(960);
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });

  const [scrollPosition, setScrollPosition] = useState(0);

  const detached = scrollPosition > 0;

  useEffect(() => {
    setScrollPosition(
      (typeof window !== "undefined" && window.pageYOffset) || 0
    );
    window.addEventListener("scroll", onScroll.bind(this));
    return () => {
      window.removeEventListener("scroll", onScroll.bind(this));
    };
  }, []);

  const onScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.pageYOffset);
    });
  };

  const showBlur = !!expanded || !!detached;

  useEffect(() => {
    if (!isMobile) {
      setExpanded(false);
      setBodyHidden(false);
    }
  }, [isMobile]);

  return (
    <StyledNavMainContainer id="navbar-container">
      <StyledNavContainer detached={detached} showBlur={showBlur}>
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
