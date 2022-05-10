import Cell from "./Box";

export default function Rows({ GuessWord, active, word }) {
  return (
    <div className={`row${active ? " active" : ""}`}>
      <Cell GuessWord={GuessWord} word={word} index={0} />
      <Cell GuessWord={GuessWord} word={word} index={1} />
      <Cell GuessWord={GuessWord} word={word} index={2} />
      <Cell GuessWord={GuessWord} word={word} index={3} />
      <Cell GuessWord={GuessWord} word={word} index={4} />
    </div>
  );
}
