import { useEffect, useState } from "react";
import { shuffleArray } from "./util";
import Question from "./components/Question";
import Loading from "./components/Loading";

// https://opentdb.com/api_config.php
const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [lockedIn, setLockedIn] = useState({});
  const [submit, setSubmit] = useState(false);

  const fetchQuestions = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data);
    const results = data.results.map((q) => ({
      ...q,
      allAnswers: shuffleArray([q.correct_answer, ...q.incorrect_answers]),
    }));
    setQuestions(results);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (questionIndex, ans) => {
    if (submit) return;
    setLockedIn((prev) => ({
      ...prev,
      [questionIndex]: prev[questionIndex] === ans ? null : ans,
    }));
  };

  const handleNewQuiz = () => {
    setSubmit(false);
    setLockedIn({});
    setQuestions([]);
    fetchQuestions();
  };

  const score = questions.filter(
    (q, i) => lockedIn[i] === q.correct_answer,
  ).length;

  const questionsJSX =
    questions.length !== 0
      ? questions.map((question, index) => (
          <Question
            key={question.question}
            index={index}
            category={question.category}
            question={question.question}
            correctAnswer={question.correct_answer}
            allAnswers={question.allAnswers}
            handleAnswer={handleAnswer}
            lockedIn={lockedIn[index]}
            submit={submit}
          />
        ))
      : null;

  return (
    <main className="container">
      <header className="header">
        <h1>Trivia King</h1>
        <p>Test your knowledge across a range of topics</p>
      </header>
      {questions.length === 0 ? <Loading /> : questionsJSX}
      <div className="footer">
        <span>
          {submit
            ? `Score: ${score}/${questions.length}`
            : `Answered: ${Object.values(lockedIn).filter(Boolean).length}/${questions.length}`}
        </span>
        <button
          className="submitBtn"
          onClick={submit ? handleNewQuiz : () => setSubmit(true)}
        >
          {submit ? "New Quiz" : "Submit"}
        </button>
      </div>
    </main>
  );
};

export default App;
