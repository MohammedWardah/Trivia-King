const Loading = () => (
  <div className="loading-screen">
    <div className="loading-letters">
      {"LOADING".split("").map((letter, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
          {letter}
        </span>
      ))}
    </div>
  </div>
);

export default Loading;
