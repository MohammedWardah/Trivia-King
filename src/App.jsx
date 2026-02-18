import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { shuffleArray } from "./util";
import Question from "./components/question";

const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple";

const App = () => {
  const [questions, setQuestions] = useState([]);
  console.log(questions);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setQuestions(data.results);
    };

    fetchQuestions();
  }, []);

  if (questions.length === 0) return <p>Loading...</p>;

  const questionsJSX = questions.map((question) => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    const shuffledAnswers = shuffleArray(answers);
    const id = nanoid();

    return (
      <Question
        category={question.category}
        question={question.question}
        allAnswers={shuffledAnswers}
        correctAnswer={question.correct_answer}
        id={id}
        key={id}
      />
    );
  });

  return <main className="container">{questionsJSX}</main>;
};

export default App;
