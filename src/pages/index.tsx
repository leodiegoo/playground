import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import { CloseSquare, Delete, Document, TickSquare } from "react-iconly";
import { GenericActionButton } from "../components/buttons/genericAction";
import { RemoveButton } from "../components/buttons/remove";
import { Navbar } from "../components/navbar";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["task.getAll"]);
  const addTask = trpc.useMutation(["task.add"], {
    async onSuccess() {
      await utils.invalidateQueries(["task.getAll"]);
      setTaskDescription("");
    },
  });

  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addTask.mutateAsync({
        description: taskDescription,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <Row fluid align="center">
              <Input
                css={{ marginRight: 5 }}
                placeholder="Add Todo"
                bordered
                fullWidth
                size="md"
                rounded
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <Button
                disabled={addTask.isLoading}
                type="submit"
                rounded
                auto
                size="md"
                color="gradient"
              >
                {addTask.isLoading ? (
                  <Loading color="currentColor" size="sm" />
                ) : (
                  "Add"
                )}
              </Button>
            </Row>
          </form>

          <Spacer y={1} />

          <Row>
            <Col>
              {data &&
                data.map((task) => (
                  <Row align="center" key={task.id}>
                    <Col>
                      <Row align="center">
                        <Col css={{ flexGrow: 1 }}>
                          <Text del={task.done}>{task.description}</Text>
                        </Col>
                        <Col css={{ display: "block", width: "auto" }}>
                          <GenericActionButton
                            done={task.done}
                            taskId={task.id}
                          />
                        </Col>
                        <Col
                          css={{
                            display: "block",
                            width: "auto",
                            marginLeft: 5,
                          }}
                        >
                          <RemoveButton taskId={task.id} />
                        </Col>
                      </Row>
                      <Spacer y={1} />
                    </Col>
                  </Row>
                ))}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
