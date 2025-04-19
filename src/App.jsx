// App.jsx
import React, { useState } from 'react';
import './App.css';
import { Heart, ArrowRight, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [match, setMatch] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Hardcoded department members (replace with actual members)
  const boys = [
    { name: "Michael", image: null },
    { name: "David", image: null },
    { name: "John", image: null },
    { name: "Chris", image: null },
    { name: "Daniel", image: null },
    { name: "Robert", image: null },
    { name: "mysterio", image: null },
    { name: "thebridgeone", image: null },
    { name: "alpha toxic", image: null },
    { name: "KEB", image: null },
    { name: "Neo", image: null },
    { name: "davidbanks", image: null },
    { name: "godlykind matilda", image: null },
    { name: "chaba aiai", image: null },
  ];

  const girls = [
    { name: "Ammy Spark", image: null },
    { name: "Chimdiya", image: null },
    { name: "Ebube", image: null },
    { name: "krystal", image: null },
    { name: "Destine", image: null },
    { name: "Judith", image: null },
    { name: "EmberFlynn", image: null },
    { name: "Koby", image: null },
    { name: "Precious", image: null },
    { name: "Thelma", image: null },
    { name: "Iheoma", image: null },
    { name: "Precious", image: null },
  ];

  // Easter-themed fun options
  const easterOptions = [
    "Prefers chocolate bunnies over real bunnies",
    "Expert at egg hunting",
    "Dyes Easter eggs in neon colors",
    "Believes in the Easter Bunny",
    "Would wear bunny ears to work",
    "Eats Peeps candy year-round",
    "Thinks egg hunts should be competitive sports",
    "Has eaten an entire chocolate bunny in one sitting",
    "Decorates their desk for Easter",
    "Thinks carrot cake is the superior Easter dessert"
  ];

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = () => {
    // Match the user with a random person of the opposite gender
    const potentialMatches = gender === 'male' ? girls : boys;
    const randomIndex = Math.floor(Math.random() * potentialMatches.length);
    setMatch(potentialMatches[randomIndex]);
    setShowResult(true);

    // Scroll to top for better animation viewing
    window.scrollTo(0, 0);

    // Launch confetti after a short delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setAnimationComplete(true);
    }, 1000);
  };

  const handleStartOver = () => {
    setStep(1);
    setName('');
    setGender('');
    setSelectedOptions([]);
    setMatch(null);
    setShowResult(false);
    setAnimationComplete(false);
  };

  // Validation for proceeding to next step
  const canProceedToOptions = name.trim().length > 0 && gender !== '';
  const canFindMatch = selectedOptions.length >= 3;

  return (
    <div className="app">
      <header className="header">
        <h1>Easter Department Matchmaking</h1>
        <div className="egg-decoration"></div>
      </header>

      {!showResult ? (
        <div className="content">
          {step === 1 && (
            <div className="step-container">
              <h2>Step 1: Tell us about yourself</h2>
              <div className="input-group">
                <label htmlFor="name">Your Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="input-group">
                <label>Your Gender:</label>
                <div className="radio-group">
                  <label className={`radio-option ${gender === 'male' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                    />
                    <span>Male</span>
                  </label>
                  <label className={`radio-option ${gender === 'female' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>
              <button 
                className="next-button"
                disabled={!canProceedToOptions}
                onClick={() => setStep(2)}
              >
                Next <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-container">
              <h2>Step 2: Select at least 3 options that describe you</h2>
              <div className="options-container">
                {easterOptions.map((option, index) => (
                  <label key={index} className={`option-checkbox ${selectedOptions.includes(option) ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionToggle(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <div className="buttons-row">
                <button 
                  className="back-button"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button 
                  className="match-button"
                  disabled={!canFindMatch}
                  onClick={handleSubmit}
                >
                  Find My Match <Heart size={18} />
                </button>
              </div>
              <div className="selection-counter">
                Selected: {selectedOptions.length}/3 minimum
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="result-container">
          <div className={`match-card ${animationComplete ? 'show' : ''}`}>
            <div className="heart-icon">
              <Heart size={64} fill="#ff6b6b" stroke="#ff6b6b" />
            </div>
            <h2>It's a Match!</h2>
            <div className="match-pair">
              <div className="match-person">
                <div className="match-avatar">
                  {name ? name.charAt(0).toUpperCase() : <img src="/default-avatar.png" alt="avatar" />}
                </div>
                <div className="match-name">{name}</div>
              </div>
              <div className="match-heart">
                <Heart size={32} fill="#ff6b6b" stroke="#ff6b6b" />
              </div>
              <div className="match-person">
                <div className="match-avatar">
                  {match?.name ? match.name.charAt(0).toUpperCase() : <img src="/default-avatar.png" alt="avatar" />}
                </div>
                <div className="match-name">{match?.name}</div>
              </div>
            </div>
            <div className="match-message">
              <p>Your Easter Department Match has been found!</p>
              <p>May your Easter celebrations be filled with joy!</p>
            </div>
            <div className="match-decoration">
              <Gift size={24} />
            </div>
            <button className="restart-button" onClick={handleStartOver}>
              Try Again
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Happy Easter! This is just for fun.</p>
      </footer>
    </div>
  );
}

export default App