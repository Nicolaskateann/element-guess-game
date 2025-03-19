import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const elementFamilies = {
 "Alkali Metals": [
    { name: "Lithium", symbol: "Li" },
    { name: "Sodium", symbol: "Na" },
    { name: "Potassium", symbol: "K" },
    { name: "Rubidium", symbol: "Rb" },
    { name: "Cesium", symbol: "Cs" },
    { name: "Francium", symbol: "Fr" }
  ],
  "Alkaline Earth Metals": [
    { name: "Beryllium", symbol: "Be" },
    { name: "Magnesium", symbol: "Mg" },
    { name: "Calcium", symbol: "Ca" },
    { name: "Strontium", symbol: "Sr" },
    { name: "Barium", symbol: "Ba" },
    { name: "Radium", symbol: "Ra" }
  ],
  "Transition Metals": [
    { name: "Iron", symbol: "Fe" },
    { name: "Copper", symbol: "Cu" },
    { name: "Zinc", symbol: "Zn" },
    { name: "Silver", symbol: "Ag" },
    { name: "Gold", symbol: "Au" },
    { name: "Nickel", symbol: "Ni" }
  ],
  "Metalloids": [
    { name: "Boron", symbol: "B" },
    { name: "Silicon", symbol: "Si" },
    { name: "Germanium", symbol: "Ge" },
    { name: "Arsenic", symbol: "As" },
    { name: "Antimony", symbol: "Sb" },
    { name: "Tellurium", symbol: "Te" }
  ],
  "Nonmetals": [
    { name: "Hydrogen", symbol: "H" },
    { name: "Carbon", symbol: "C" },
    { name: "Nitrogen", symbol: "N" },
    { name: "Oxygen", symbol: "O" },
    { name: "Phosphorus", symbol: "P" },
    { name: "Sulfur", symbol: "S" }
  ],
  "Halogens": [
    { name: "Fluorine", symbol: "F" },
    { name: "Chlorine", symbol: "Cl" },
    { name: "Bromine", symbol: "Br" },
    { name: "Iodine", symbol: "I" },
    { name: "Astatine", symbol: "At" },
    { name: "Tennessine", symbol: "Ts" }
  ],
  "Noble Gases": [
    { name: "Helium", symbol: "He" },
    { name: "Neon", symbol: "Ne" },
    { name: "Argon", symbol: "Ar" },
    { name: "Krypton", symbol: "Kr" },
    { name: "Xenon", symbol: "Xe" },
    { name: "Radon", symbol: "Rn" }
  ],
  "Lanthanides": [
    { name: "Lanthanum", symbol: "La" },
    { name: "Cerium", symbol: "Ce" },
    { name: "Praseodymium", symbol: "Pr" },
    { name: "Neodymium", symbol: "Nd" },
    { name: "Samarium", symbol: "Sm" },
    { name: "Europium", symbol: "Eu" }
  ]
};

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export default function App() {
  const [category, setCategory] = useState(null);
  const [elementsData, setElementsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [userName, setUserName] = useState("");
  const [finalSubmitted, setFinalSubmitted] = useState(false);

  useEffect(() => {
    if (gameStarted && elementsData.length > 0) startNewRound();
  }, [currentIndex, gameStarted]);

  const startNewRound = () => {
    const currentElement = elementsData[currentIndex];
    const letters = shuffleArray([...currentElement.name.toUpperCase()]);
    setShuffledLetters(letters);
    setUserInput(new Array(letters.length).fill(" "));
  };

  const handleLetterClick = (letter) => {
    const inputIndex = userInput.indexOf(" ");
    if (inputIndex !== -1) {
      const newInput = [...userInput];
      newInput[inputIndex] = letter;
      setUserInput(newInput);
    }
  };

  const handleDelete = () => {
    const newInput = [...userInput];
    for (let i = newInput.length - 1; i >= 0; i--) {
      if (newInput[i] !== " ") {
        newInput[i] = " ";
        break;
      }
    }
    setUserInput(newInput);
  };

  const checkAnswer = () => {
    if (userInput.join("") === elementsData[currentIndex].name.toUpperCase()) {
      setScore(score + 1);
    }
    if (currentIndex + 1 < elementsData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  if (!gameStarted) {
    return (
        <div className="container text-center mt-5 p-5 bg-light border rounded shadow">
        <h1 className="display-4 text-primary">ELEMENTOLOGY</h1>
        <p className="lead">Elementology: A Gamified Learning Tool to Enhance Grade 8 Students Mastery and Familiarity with the Periodic Table of Elements</p>
        <p className="lead">A world full of elements</p>

        <div className="envelope-box">
          <div className="paper-message">
            <p className="lead">
              Hello, Grade 8! Let us dive into the world full of elements! Imagine 118 unique superheroes, each with its own incredible powers, working together in the grand science adventure of the periodic table! These elements are like building blocks of everything around us, each one playing a crucial role in the universe’s endless story.
              <br /> <br />
              So, gear up and get ready to unlock the secrets of the 118 elements—because with these heroes in our scientific world, we are about to discover a whole new world!
              <br /> <br />
              <strong>ARE YOU READYYYYYYY!?!?!?!?!</strong>
            </p>
          </div>
        </div>
        <p>Choose a category to start playing.</p>
        {Object.keys(elementFamilies).map((fam) => (
          <button className="btn btn-primary m-2" key={fam} onClick={() => { setCategory(fam); setElementsData(elementFamilies[fam]); setGameStarted(true); }}>
            {fam}
          </button>
        ))}
      </div>
    );
  }

  if (gameOver && !finalSubmitted) {
    return (
      <div className="container text-center mt-5">
        <h1>Thank you for Playing</h1>
        <p>Enter your name to see your score:</p>
        <input type="text" className="form-control w-50 mx-auto" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button className="btn btn-success mt-3" onClick={() => setFinalSubmitted(true)}>Submit</button>
      </div>
    );
  }

  if (finalSubmitted) {
    return (
      <div className="container text-center mt-5">
        <h1>{score >= 5 ? "Congratulations!" : "Try Again!"}</h1>
        <p>{userName}, your score is {score}.</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="container text-center mt-5">
      <h1>Guess the Element - {category}</h1>
      <p>Score: {score}</p>
      <h2>{elementsData[currentIndex].symbol}</h2>
      <div className="mt-3">
        {userInput.map((char, index) => (
          <span key={index} className="border px-3 py-2 mx-1 d-inline-block">{char}</span>
        ))}
      </div>
      <div className="mt-3">
        {shuffledLetters.map((letter, index) => (
          <button key={index} className="btn btn-primary mx-1" onClick={() => handleLetterClick(letter)}>
            {letter}
          </button>
        ))}
      </div>
      <button className="btn btn-danger mt-3 mx-2" onClick={handleDelete}>Delete</button>
      <button className="btn btn-success mt-3 mx-2" onClick={checkAnswer}>Submit</button>
    </div>
  );
}
