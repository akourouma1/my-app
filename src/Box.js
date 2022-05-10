export default function Box({ GuessWord, word, index }) {
  const char = word.charAt(index);

  let className = "Box";

  if (GuessWord != null) {
    if (GuessWord.charAt(index) === char) {
      className += " correct";
    } else if (GuessWord.includes(char)) {
      className += " present";
    } else {
      className += " not-found";
    }
  }

  return <div className={className}>{char}</div>;
}
