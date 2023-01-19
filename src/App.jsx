import { useEffect, useState } from "react";
import "./App.scss";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import { nanoid } from "nanoid";
import { Col, Row, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

function App() {
  const [gamePhase, setGamePhase] = useState("start");
  const [quizData, setQuizData] = useState([]);
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [quizSettings, setQuizSettings] = useState({ amount: 10 });

  function shuffle(array) {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  async function fetchQuestions(settings, callback) {
    const url = `https://opentdb.com/api.php?amount=${settings.amount}${
      settings.category ? "&category=" + settings.category : ""
    }${
      settings.difficulty ? "&difficulty=" + settings.difficulty : ""
    }&encode=url3986`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    setQuizData(structureQuizData(data.results));
    callback();
  }

  function structureQuizData(questions) {
    return questions.map((question) => {
      const correct_answer_id = nanoid();
      const answers = shuffle([
        { id: correct_answer_id, value: question.correct_answer },
        ...question.incorrect_answers.map((answer) => {
          return {
            id: nanoid(),
            value: answer,
          };
        }),
      ]);
      return {
        id: nanoid(),
        question: question.question,
        answers: answers,
        correct_answer: correct_answer_id,
        chosen_answer: "",
      };
    });
  }

  function newQuiz() {
    fetchQuestions(quizSettings, () => {
      setGamePhase("quiz");
      setNumberCorrect(0);
    });
  }

  function chooseAnswer(qid, aid) {
    if (gamePhase === "end") return;
    setQuizData((prevState) => {
      const newState = prevState.map((question) => {
        if (question.id !== qid) {
          return question;
        }

        return {
          ...question,
          chosen_answer: aid,
        };
      });

      return newState;
    });
  }

  function checkAnswers() {
    setNumberCorrect(
      quizData.filter((q) => q.chosen_answer === q.correct_answer).length
    );

    setGamePhase("end");
  }

  return (
    <Container className="m-auto align-self-center">
      <Row className="app p-3 py-4">
        <Col lg={5}>
          {(() => {
            if (gamePhase === "start") {
              return (
                <StartScreen
                  startGame={newQuiz}
                  title="Quizzical"
                  desc="Random questions from the Open Trivia Database"
                  setQuizSettings={setQuizSettings}
                />
              );
            } else {
              return (
                <div className="quiz">
                  <Questions
                    questions={quizData}
                    chooseAnswer={chooseAnswer}
                    end={gamePhase === "end"}
                  />
                  {gamePhase === "quiz" && (
                    <Button className="" onClick={checkAnswers}>
                      Check
                    </Button>
                  )}
                  {gamePhase === "end" && (
                    <Button as="button" onClick={newQuiz}>
                      {" "}
                      Play Again
                    </Button>
                  )}
                </div>
              );
            }
          })()}
        </Col>
        {gamePhase === "end" && (
          <div className="results">
            <hr />
            {numberCorrect === quizData.length && <h1>You Win!</h1>}
            <p>
              You got {numberCorrect}/{quizData.length} question
              {quizData.length !== 1 && "s"} correct.
            </p>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default App;
