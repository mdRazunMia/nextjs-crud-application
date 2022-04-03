import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";

const CreateTask = () => {
  const { push, query } = useRouter();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const { title, description } = newTask;
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  // This function will get single data based on the id to populate the form input value.

  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${query.id}`
      );
      const data = await response.json();
      setNewTask({ title: data.title, description: data.description });
    };
    if (query.id) {
      getTask();
    }
  }, [query.id]);

  const validate = () => {
    let errors = {};
    if (!title) {
      errors.title = "Title is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    console.log("Ok");
    e.preventDefault();
    let errors = validate();
    // console.log(errors);
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }
    await push("/");
  };

  const updateTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(errors);
    }
  };

  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{query.id ? "Update Task" : "Create Task"}</h1>
          <div>
            {isSubmit ? (
              <Loader active inline="centered" />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  error={
                    errors.title ? { content: "Pease enter a title" } : null
                  }
                  type="text"
                  label="Title"
                  placeholder="Enter Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
                <Form.TextArea
                  error={
                    errors.description
                      ? { content: "Pease enter a description" }
                      : null
                  }
                  type="text"
                  label="Description"
                  placeholder="Enter Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
                <Button primary type="submit">
                  {query.id ? "Update" : "Submit"}
                </Button>
              </Form>
            )}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateTask;
