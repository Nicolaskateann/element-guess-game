import React, { useState, useEffect,useCallback  } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { FaTrash, FaCheck, FaLightbulb, FaHome } from "react-icons/fa";


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
    { name: "Scandium", symbol: "Sc" },
    { name: "Titanium", symbol: "Ti" },
    { name: "Vanadium", symbol: "V" },
    { name: "Chromium", symbol: "Cr" },
    { name: "Manganese", symbol: "Mn" },
    { name: "Iron", symbol: "Fe" },
    { name: "Cobalt", symbol: "Co" },
    { name: "Nickel", symbol: "Ni" },
    { name: "Copper", symbol: "Cu" },
    { name: "Zinc", symbol: "Zn" },
    { name: "Yttrium", symbol: "Y" },
    { name: "Zirconium", symbol: "Zr" },
    { name: "Niobium", symbol: "Nb" },
    { name: "Molybdenum", symbol: "Mo" },
    { name: "Technetium", symbol: "Tc" },
    { name: "Ruthenium", symbol: "Ru" },
    { name: "Rhodium", symbol: "Rh" },
    { name: "Palladium", symbol: "Pd" },
    { name: "Silver", symbol: "Ag" },
    { name: "Cadmium", symbol: "Cd" },
    { name: "Hafnium", symbol: "Hf" },
    { name: "Tantalum", symbol: "Ta" },
    { name: "Tungsten", symbol: "W" },
    { name: "Rhenium", symbol: "Re" },
    { name: "Osmium", symbol: "Os" },
    { name: "Iridium", symbol: "Ir" },
    { name: "Platinum", symbol: "Pt" },
    { name: "Gold", symbol: "Au" },
    { name: "Mercury", symbol: "Hg" },
    { name: "Rutherfordium", symbol: "Rf" },
    { name: "Dubnium", symbol: "Db" },
    { name: "Seaborgium", symbol: "Sg" },
    { name: "Bohrium", symbol: "Bh" },
    { name: "Hassium", symbol: "Hs" },
    { name: "Meitnerium", symbol: "Mt" },
    { name: "Darmstadtium", symbol: "Ds" },
    { name: "Roentgenium", symbol: "Rg" },
    { name: "Copernicium", symbol: "Cn" }
  ],
  "Post-Transition Metals": [
    { name: "Aluminum", symbol: "Al" },
    { name: "Gallium", symbol: "Ga" },
    { name: "Indium", symbol: "In" },
    { name: "Tin", symbol: "Sn" },
    { name: "Thallium", symbol: "Tl" },
    { name: "Lead", symbol: "Pb" },
    { name: "Bismuth", symbol: "Bi" },
    { name: "Nihonium", symbol: "Nh" },
    { name: "Flerovium", symbol: "Fl" },
    { name: "Moscovium", symbol: "Mc" },
    { name: "Livermorium", symbol: "Lv" }
  ],
  "Metalloids": [
    { name: "Boron", symbol: "B" },
    { name: "Silicon", symbol: "Si" },
    { name: "Germanium", symbol: "Ge" },
    { name: "Arsenic", symbol: "As" },
    { name: "Antimony", symbol: "Sb" },
    { name: "Tellurium", symbol: "Te" },
    { name: "Polonium", symbol: "Po" }
  ],
  "Nonmetals": [
    { name: "Hydrogen", symbol: "H" },
    { name: "Carbon", symbol: "C" },
    { name: "Nitrogen", symbol: "N" },
    { name: "Oxygen", symbol: "O" },
    { name: "Phosphorus", symbol: "P" },
    { name: "Sulfur", symbol: "S" },
    { name: "Selenium", symbol: "Se" }
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
    { name: "Radon", symbol: "Rn" },
    { name: "Oganesson", symbol: "Og" }
  ],
  "Lanthanides": [
    { name: "Lanthanum", symbol: "La" },
    { name: "Cerium", symbol: "Ce" },
    { name: "Praseodymium", symbol: "Pr" },
    { name: "Neodymium", symbol: "Nd" },
    { name: "Promethium", symbol: "Pm" },
    { name: "Samarium", symbol: "Sm" },
    { name: "Europium", symbol: "Eu" },
    { name: "Gadolinium", symbol: "Gd" },
    { name: "Terbium", symbol: "Tb" },
    { name: "Dysprosium", symbol: "Dy" },
    { name: "Holmium", symbol: "Ho" },
    { name: "Erbium", symbol: "Er" },
    { name: "Thulium", symbol: "Tm" },
    { name: "Ytterbium", symbol: "Yb" },
    { name: "Lutetium", symbol: "Lu" }
  ],
  "Actinides": [
    { name: "Actinium", symbol: "Ac" },
    { name: "Thorium", symbol: "Th" },
    { name: "Protactinium", symbol: "Pa" },
    { name: "Uranium", symbol: "U" },
    { name: "Neptunium", symbol: "Np" },
    { name: "Plutonium", symbol: "Pu" },
    { name: "Americium", symbol: "Am" },
    { name: "Curium", symbol: "Cm" },
    { name: "Berkelium", symbol: "Bk" },
    { name: "Californium", symbol: "Cf" },
    { name: "Einsteinium", symbol: "Es" },
    { name: "Fermium", symbol: "Fm" },
    { name: "Mendelevium", symbol: "Md" },
    { name: "Nobelium", symbol: "No" },
    { name: "Lawrencium", symbol: "Lr" }
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
    const [hintsLeft, setHintsLeft] = useState(3);
  
    // ✅ Fix: Use useCallback to prevent unnecessary re-renders
    const startNewRound = useCallback(() => {
      if (elementsData.length === 0) return;
      const currentElement = elementsData[currentIndex];
      const letters = shuffleArray([...currentElement.name.toUpperCase()]);
      setShuffledLetters(letters);
      setUserInput(new Array(letters.length).fill(" "));
    }, [elementsData, currentIndex]);
  
    // ✅ Fix: Include 'elementsData.length' & 'startNewRound' in dependencies
    useEffect(() => {
      if (gameStarted && elementsData.length > 0) {
        startNewRound();
      }
    }, [elementsData.length, startNewRound]); // ✅ Fix applied here
  
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
  
    const handleHint = () => {
      if (hintsLeft > 0) {
        const correctAnswer = elementsData[currentIndex].name.toUpperCase();
        const newInput = [...userInput];
        for (let i = 0; i < correctAnswer.length; i++) {
          if (newInput[i] === " ") {
            newInput[i] = correctAnswer[i];
            setHintsLeft(hintsLeft - 1);
            break;
          }
        }
        setUserInput(newInput);
      }
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
  
    const restartGame = () => {
      setCategory(null);
      setElementsData([]);
      setCurrentIndex(0);
      setScore(0);
      setGameStarted(false);
      setGameOver(false);
      setUserName("");
      setFinalSubmitted(false);
      setHintsLeft(3);
    };
  
    if (!gameStarted) {
      return (
        <div className="container text-center mt-5 p-5 bg-light border rounded shadow">
          <div className="welcome-container">
            <h1 className="welcome-title">ELEMENTOLOGY</h1>
            <p className="welcome-subtitle">
              A Gamified Learning Tool to Enhance Grade 8 Students' Mastery and Familiarity with the Periodic Table of Elements
            </p>
            <p className="welcome-tagline">A world full of elements</p>
          </div>
  
          <div className="category-container">
            <p className="category-text">Choose 1 group of elements you want to play.</p>
            <div className="category-box">
              {Object.keys(elementFamilies).map((fam) => (
                <button className="category-button" key={fam} onClick={() => {
                  setCategory(fam);
                  setElementsData(elementFamilies[fam]);
                  setGameStarted(true);
                }}>
                   {fam}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }
  
    if (gameOver && !finalSubmitted) {
      return (
        <div className="container text-center mt-5 p-5 bg-light border rounded shadow">
          <h1 className="display-4 text-success">Thank you for Playing</h1>
          <p className="lead">Enter your name to see your score:</p>
          <input type="text" className="form-control w-50 mx-auto text-center shadow-sm" 
            value={userName} onChange={(e) => setUserName(e.target.value)} 
            placeholder="Your Name" />
          <button className="btn btn-success mt-3 shadow" onClick={() => setFinalSubmitted(true)}>Submit</button>
        </div>
      );
    }
  
    if (finalSubmitted) {
      return (
        <div className="container text-center mt-5 p-5 bg-light border rounded shadow">
          <h1 className="display-4 text-success">{score >= 3 ? "Congratulations!" : "Try Again!"}</h1>
          <p className="lead">{userName}, your score is {score}.</p>
          <button className="btn btn-primary shadow" onClick={restartGame}>Play Again</button>
        </div>
      );
    }
  
    return (
      <div className="container text-center mt-5 border rounded shadow">
        <h1> {category}</h1>
        <p>Score: {score} | Hints Left: {hintsLeft}</p>
        <h1 className="element-box">{elementsData[currentIndex].symbol}</h1>
        <div className="mt-3">
          {userInput.map((char, index) => (
            <span key={index} className="answer-box">{char}</span>
          ))}
        </div>
        <div className="mt-3">
          {shuffledLetters.map((letter, index) => (
            <button key={index} className="btn btn-primary mx-1" onClick={() => handleLetterClick(letter)}>
              {letter}
            </button>
          ))}
        </div>
  
        <button className="btn custom-btn btn-danger mt-3 mx-2" onClick={handleDelete}>
          <FaTrash className="icon" /> Delete
        </button>
        <button className="btn custom-btn btn-success mt-3 mx-2" onClick={checkAnswer}>
          <FaCheck className="icon" /> Submit
        </button>
        <button className="btn custom-btn btn-warning mt-3 mx-2" onClick={handleHint} disabled={hintsLeft === 0}>
          <FaLightbulb className="icon" /> Hint ({hintsLeft})
        </button>
        <button className="btn custom-btn btn-secondary mt-3 mx-2" onClick={restartGame}>
          <FaHome className="icon" /> Home
        </button>
      </div>
    );
  }