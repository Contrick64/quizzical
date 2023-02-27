import { Col } from "react-bootstrap";
import Question from "../components/Question";

function Questions(props) {
  const questions = props.questions;

  const questionElements = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        q={question.question}
        a={question.answers}
        correctAnswer={question.correct_answer}
        chosenAnswer={question.chosen_answer}
        chooseAnswer={props.chooseAnswer}
        end={props.end}
      />
    );
  });

  return (
    <Col className={`questions${props.end ? " greyed" : ""}`}>
      {questionElements}
      {props.children}
    </Col>
  );
}

export default Questions;
