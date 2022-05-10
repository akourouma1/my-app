import "./App.css";
import Rows from "./Rows";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useState } from "react";

import words from "./words";

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}


const keyboardLayout = {
  default: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L {bksp}",
    "Z X C V B N M {enter}",
  ],
};


const keyboardDisplay = {
  
  "{bksp}": "Delete",
  "{enter}": "Enter",
};

function getDefaultButtonTheme() {
  return [
    {
      class: "correct",
      
      buttons: "",
    },
    {
      class: "present",
      buttons: "",
    },
    {
      class: "not-found",
      buttons: "",
    },
  ];
}

function App() {
  const [rows, setRows] = useState(0);

  const [data, setData] = useState(["", "", "", "", "", ""]);

  const [GuessWord, setGuessWord] = useState(getRandomWord());

  const [buttonTheme, setButtonTheme] = useState(getDefaultButtonTheme());

  function getCurrentWord() {
    return data[rows];
  }
  function setCurrentWord(word) {
    data[rows] = word;
    // updates the state
    setData([...data]);
  }

  function keyboardPressed(key) {
    if (key === "{enter}") {
      if (words.includes(getCurrentWord())) {
        const correctLetters = [];
        const presentLetters = [];
        const notFoundLetters = [];

        for (let i = 0; i < getCurrentWord().length; i++) {
          const char = getCurrentWord().charAt(i);
          if (GuessWord.charAt(i) === char) {
            correctLetters.push(char);
          } else if (GuessWord.includes(char)) {
            presentLetters.push(char);
          } else {
            notFoundLetters.push(char);
          }
        }

        buttonTheme[0].buttons += " " + correctLetters.join(" ");
        buttonTheme[1].buttons += " " + presentLetters.join(" ");
        buttonTheme[2].buttons += " " + notFoundLetters.join(" ");

        buttonTheme[0].buttons.split(" ").forEach((letter) => {
          buttonTheme[1].buttons = buttonTheme[1].buttons
            .split(" ")
            .filter((letter2) => letter2 !== letter)
            .join(" ");
        });

        if (rows === 5) {
          setTimeout(() => {
            // end of the game
            if (getCurrentWord() === GuessWord) {
              alert("You win.");
            } else {
              alert("You lost. Correct word: " + GuessWord);
            }
            setGuessWord(getRandomWord());
            setData(["", "", "", "", "", ""]);
            setRows(0);
            setButtonTheme(getDefaultButtonTheme());
          }, 1000);
        }

        setRows(rows + 1);
      } else {
        // an invalid word got entered
      }
      return;
    
    }

    if (key === "{bksp}") {
      if (getCurrentWord().length === 0) return;
      setCurrentWord(getCurrentWord().slice(0, -1));
      return;
    }

    if (getCurrentWord().length !== 5) {
      setCurrentWord(getCurrentWord() + key);
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="field">
          <Rows
            active={rows === 0}
            word={data[0]}
           GuessWord={rows > 0 ? GuessWord : null}
          />
          <Rows
            active={rows === 1}
            word={data[1]}
            GuessWord={rows > 1 ? GuessWord : null}
          />
          <Rows
            active={rows === 2}
            word={data[2]}
            GuessWord={rows > 2 ? GuessWord : null}
          />
          <Rows
            active={rows === 3}
            word={data[3]}
            GuessWord={rows > 3 ? GuessWord : null}
          />
          <Rows
            active={rows === 4}
            word={data[4]}
            GuessWord={rows > 4 ? GuessWord : null}
          />
        </div>

        <div className="keyboard">
          <Keyboard
            onKeyPress={keyboardPressed}
            layout={keyboardLayout}
            display={keyboardDisplay}
            buttonTheme={buttonTheme}
          >
            {JSON.stringify(buttonTheme)}
          </Keyboard>
        </div>
      </div>
    </div>
  );
}

export default App;
