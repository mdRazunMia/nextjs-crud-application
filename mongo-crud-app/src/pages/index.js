import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, Container, Grid } from "semantic-ui-react";
export default function Home({ tasks = [] }) {
  const router = useRouter();
  if (tasks.length === 0) {
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There is no Task present. Please create a new task.</h1>
            <div>
              <Button
                size="mini"
                primary
                onClick={() => router.push("/tasks/new")}
              >
                Create Task
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    return (
      <Container>
        <Card.Group>
          {tasks &&
            tasks.map((task) => (
              <Card key={task._id}>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/tasks/${task._id}`}>
                      <a>{task.title}</a>
                    </Link>
                  </Card.Header>
                  <p>{task.description}</p>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    color="orange"
                    onClick={() => router.push(`/tasks/${task._id}`)}
                  >
                    View
                  </Button>
                  <Button
                    color="blue"
                    onClick={() => router.push(`/tasks/${task._id}/edit`)}
                  >
                    Edit
                  </Button>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Container>
    );
  }
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/tasks/");
  const tasks = await response.json();
  return {
    props: {
      tasks,
    },
  };
}
