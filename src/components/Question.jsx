import he from "he";
import clsx from "clsx";

const Question = ({
  index,
  category,
  question,
  allAnswers,
  correctAnswer,
  handleAnswer,
  lockedIn,
  submit,
}) => {
  return (
    <div className="question">
      <h2>{he.decode(category)}</h2>
      <p>{he.decode(question)}</p>
      <div className="answers">
        {allAnswers.map((ans) => (
          <button
            className={clsx({
              lockedIn: !submit && lockedIn === ans,
              correct: submit && ans === correctAnswer,
              wrong: submit && ans !== correctAnswer && lockedIn === ans,
            })}
            key={ans}
            onClick={() => handleAnswer(index, ans)}
          >
            {he.decode(ans)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
