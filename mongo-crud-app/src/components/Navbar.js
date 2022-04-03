import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Menu } from "semantic-ui-react";

export const Navbar = () => {
  const router = useRouter();

  return (
    <Menu
      inverted
      borderless
      style={{ padding: ".3rem", marginBottom: "20px" }}
      attached
    >
      <Container>
        <Menu.Item>
          <Link href={"/"}>
            <img src="/react.svg" />
          </Link>
        </Menu.Item>
        <Menu.Menu>
          <Button size="mini" primary onClick={() => router.push("/tasks/new")}>
            New Task
          </Button>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
