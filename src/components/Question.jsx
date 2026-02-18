import { useState } from "react";
import he from "he";
import clsx from "clsx";

const Question = ({ category, question, allAnswers, correctAnswer, id }) => {
  const [answer, setAnswer] = useState(null);
  const isAnswered = answer === null ? false : true;

  return (
    <div className="question">
      <h2>{he.decode(category)}</h2>
      <p>{he.decode(question)}</p>
      {/* Answer buttons */}
      <div className="answers">
        {allAnswers.map((ans) => {
          return (
            <button
              disabled={isAnswered}
              className={clsx(
                answer === null && "default",
                answer !== null && ans === correctAnswer && "correct",
                answer !== null &&
                  ans === answer &&
                  ans !== correctAnswer &&
                  "wrong",
              )}
              key={ans}
              onClick={() => setAnswer(ans)}
            >
              {he.decode(ans)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
