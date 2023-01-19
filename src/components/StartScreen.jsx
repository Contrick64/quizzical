import { Button, Form } from "react-bootstrap";
import { Row } from "react-bootstrap/esm";

export default function StartScreen(props) {
  return (
    <Row className="start-screen p-4 text-center">
      <h1 className="display-5 fw-bold">{props.title}</h1>
      {props.desc && <p className="fs-4">{props.desc}</p>}
      <Form>
        <Button as="button" className="btn-lg" onClick={props.startGame}>
          Start quiz
        </Button>
      </Form>
    </Row>
  );
}
