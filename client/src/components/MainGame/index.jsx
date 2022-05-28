import React, { useState, useEffect, useReducer } from "react";
import Timer from "../Timer";
import "bulma/css/bulma.min.css";

const MainGame = ({ socket, username, room }) => {
  // socket.emit('print-all-rooms');

  useEffect(() => {
    socket.on("add-letter", addLetter);
    socket.on("append-word", appendWord);
    socket.on("clear-letters", clearLetters);
    // socket.on("set-game-state", setGameState);
    socket.on("your-turn", () => setTurn(true));

    return () => {
      socket.disconnect();
    };
  }, []);

  // variables
  const [btnDivDisplay, setBtnDivDisplay] = useState("");
  const [lettersInput, setLettersInput] = useState("");
  const [letters, setLetters] = useReducer(
    letterReducer,
    new Array(9).fill("")
  );
  const [words, setWords] = useReducer(wordReducer, []);
  const [isYourTurn, setTurn] = useState(false);
  const [activeTimer, setActiveTimer] = useState(false);
  const [playersArr, setPlayersArr] = useReducer(playersReducer, []);

  // functions
  function letterReducer(letters, action) {
    let newLetters;
    switch (action.type) {
      case "PUSH":
        const { letter, index } = action;
        newLetters = [
          ...letters.slice(0, index),
          letter,
          ...letters.slice(index + 1),
        ];
        break;
      case "CLEAR":
        newLetters = new Array(9).fill("");
        break;
      case "RENDER_LETTERS":
        newLetters = [...action.letters];
        break;
      default:
        throw new Error();
    }
    return newLetters;
  }

  function wordReducer(words, action) {
    let newWordsArr;
    switch (action.type) {
      case "PUSH":
        const { word, username, score } = action;
        newWordsArr = [...words, { word, username, score }];
        break;
      case "CLEAR":
        newWordsArr = [];
        break;
      case "RENDER_WORDS":
        newWordsArr = [...action.words];
        break;
      default:
        throw new Error();
    }
    return newWordsArr;
  }

  function playersReducer(playersArr, action) {
    let newPlayersArr;
    switch (action.type) {
      case "PUSH":
        const { player, room } = action;
        newPlayersArr = [...playersArr, { player, username, room }];
        break;
      default:
        throw new Error();
    }
    return newPlayersArr;
  }

  // TODO add backend functionality to get players in room and wire to socket.
  const displayPlayers = (player, room) => {};

  const addVowel = (event) => {
    socket.emit("add-vowel", room);
  };

  const addConsonant = (event) => {
    socket.emit("add-consonant", room);
  };

  const addLetter = (letter, index) => {
    setLetters({
      type: "PUSH",
      letter,
      index,
    });
    if (index === 8) {
      setActiveTimer(true);
      setBtnDivDisplay("hidden");
    }
    console.log(index);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setLettersInput(inputValue);
  };

  const submitWord = (event) => {
    event.preventDefault();
    const word = lettersInput;
    setLettersInput("");
    socket.emit("submit-word", word, username, room);
  };

  const restartLetters = (event) => {
    socket.emit("restart-letters", room);
    setActiveTimer(false);
    setBtnDivDisplay("");
  };

  const appendWord = (word, username, score) => {
    setWords({ type: "PUSH", word, username, score });
  };

  const clearLetters = () => {
    setLetters({ type: "CLEAR" });
    setWords({ type: "CLEAR" });

    setLettersInput("");
    setTurn(false);
    setActiveTimer(false);
  };

  const setGameState = (letters, words) => {
    // clearLetters();
    setLetters({ type: "RENDER_LETTERS", letters });
    setWords({ type: "RENDER_WORDS", words });
  };

  return (
    <div>
      <h1 className="room-name has-text-centered is-size-4">
        You are playing in: {room}
      </h1>
      {/* TODO remove this */}
      <h2>{isYourTurn ? "It is your turn" : "It is not your turn"}</h2>

      {/* TODO add players in room */}
      {/* TODO add active turn highlighted */}
      <div className="players">
        <ul>{}</ul>
      </div>
      {/*  */}

      <div className="rendered-letters column m-0 p-0">
        <ul>
          {letters.map((letter, index) => (
            <li className="letter-box" key={index}>
              <span className="letter-span">{letter}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="timer m-3">{activeTimer ? <Timer /> : ""}</div>

      <div className="field m-3 has-text-centered">
        <div className={"letters-buttons " + btnDivDisplay}>
          <button className="button mr-3 is-warning" onClick={addVowel}>
            Vowel
          </button>
          <button className="button is-warning" onClick={addConsonant}>
            Consonant
          </button>
        </div>
      </div>

      <div className="field m-3">
        <form>
          <div className="field has-addons mt-3 is-justify-content-center">
            <div className="control">
              <input
                onChange={handleInputChange}
                className="input is-warning"
                type="text"
                value={lettersInput}
                placeholder="Your word here"
              />
            </div>

            <div className="control">
              <input
                className="button is-warning"
                type="submit"
                value="Submit"
                onClick={submitWord}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="p-5">
        <ul>
          {words.map((word, index) => (
            <li key={index}>
              {word.username}: {word.word}: {word.score} points
            </li>
          ))}
        </ul>
      </div>

      <div className="m-3 has-text-centered">
        <button className="button is-warning m-2" onClick={restartLetters}>
          Restart
        </button>

        <button
          className="button is-warning m-2"
          onClick={() => socket.emit("next-round", room)}
        >
          Next Round
        </button>
      </div>
    </div>
  );
};

export default MainGame;
