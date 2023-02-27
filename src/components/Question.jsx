import { Button } from "react-bootstrap";
import { Row, Stack } from "react-bootstrap/esm";

function Question(props) {
  const answerElements = props.a.map((answer) => {
    let variant = props.chosenAnswer !== answer.id ? "outline-" : "";
    if (props.end && props.correctAnswer === answer.id) {
      variant = "success";
    } else if (props.end) {
      variant += "danger";
    } else {
      variant += "secondary";
    }
    return (
      <Button
        key={answer.id}
        className={`answer`}
        variant={variant}
        as="button"
        onClick={() => props.chooseAnswer(props.id, answer.id)}
        disabled={props.end}
      >
        {decodeURIComponent(answer.value)}
      </Button>
    );
  });

  return (
    <div className="question">
      <p className="question--q">{decodeURIComponent(props.q)}</p>
      <Stack direction="horizontal" gap={2} className="answers">
        {answerElements}
      </Stack>
    </div>
  );
}

export default Question;
