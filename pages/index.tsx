import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Input,
  Row,
  Text,
} from "@nextui-org/react";
import type { NextPage } from "next";
import { CloseSquare, Delete, Document, TickSquare } from "react-iconly";
import { Navbar } from "../components/navbar";

const Home: NextPage = () => {
  return (
    <Container sm>
      <Navbar />
      <Card>
        <Card.Header>
          <Text h3>
            <Document set="bold" size="small" primaryColor="blueviolet" /> ToDo
            List App
          </Text>
        </Card.Header>
        <Card.Body>
          <Row fluid align="center">
            <Input
              css={{ marginRight: 5 }}
              placeholder="Add Todo"
              bordered
              fullWidth
              size="md"
              rounded
            />
            <Button rounded auto size="md" color="gradient">
              Add
            </Button>
          </Row>
          <Row css={{ marginTop: 10 }}>
            <Col>
              <Row align="center">
                <Col css={{ flexGrow: 1 }}>
                  <Text>Add tRPC</Text>
                </Col>
                <Col css={{ display: "block", width: "auto" }}>
                  <Button
                    icon={<TickSquare set="light" />}
                    size="sm"
                    rounded
                    auto
                    ghost
                    color="success"
                  >
                    Done
                  </Button>
                </Col>
                <Col css={{ display: "block", width: "auto", marginLeft: 5 }}>
                  <Button
                    icon={<Delete set="light" />}
                    size="sm"
                    rounded
                    auto
                    ghost
                    color="error"
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
              <Row align="center" css={{ marginTop: 10 }}>
                <Col>
                  <Text del>Add NextUI</Text>
                </Col>
                <Col css={{ display: "block", width: "auto" }}>
                  <Button
                    icon={<CloseSquare set="light" />}
                    size="sm"
                    rounded
                    auto
                    ghost
                    color="warning"
                  >
                    Not Done
                  </Button>
                </Col>
                <Col css={{ display: "block", width: "auto", marginLeft: 5 }}>
                  <Button
                    icon={<Delete set="light" />}
                    size="sm"
                    rounded
                    auto
                    ghost
                    color="error"
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
