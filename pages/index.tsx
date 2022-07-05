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
import { Navbar } from "../components/navbar";

const Home: NextPage = () => {
  return (
    <Container sm>
      <Navbar />
      <Card>
        <Card.Header>
          <Text h3>Todo List App</Text>
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
              <Row>
                <Col css={{ flexGrow: 1 }}>Add tRPC</Col>
                <Col css={{ display: "block", width: "auto" }}>
                  <Button rounded auto ghost color="success">
                    Done
                  </Button>
                </Col>
                <Col css={{ display: "block", width: "auto", marginLeft: 5 }}>
                  <Button rounded auto ghost color="warning">
                    Remove
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>Add NextUI</Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
