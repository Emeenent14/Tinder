// App.jsx
import React, { useState } from 'react';
import './App.css';
import { Heart, ArrowRight, Sparkles, Shuffle, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [match, setMatch] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  // Hardcoded department members
  const boys = [
    { name: "Neo", image: null },
    { name: "Mysterio", image: null },
    { name: "Alpha toxxic", image: null },
    { name: "thebridgeone", image: null },
    { name: "Di maria", image: null },
    { name: "Wishot", image: null },
    { name: "Davidbanks", image: null },
    { name: "Joshua the great", image: null },
    { name: "Triple k", image: null },
    { name: "Brian", image: null },
    { name: "Odypro", image: null },
    { name: "Okwosha Meanim", image: null },
    { name: "Lil D B", image: null },
    { name: "Chimex", image: null },
    { name: "Mayor", image: null },
    { name: "Hater", image: null },
    { name: "Chaba Aiai", image: null },
  ];

  const girls = [
    { name: "Ammy Spark", image: null },
    { name: "Chimdiya", image: null },
    { name: "Ebube", image: null },
    { name: "Krystal", image: null },
    { name: "Destine", image: null },
    { name: "Judith", image: null },
    { name: "Daisy Nwosu", image: null },
    { name: "EmberFlynn", image: null },
    { name: "Koby", image: null },
    { name: "Precious", image: null },
    { name: "Iheoma", image: null },
    { name: "Thelma", image: null },
    { name: "Lil 1", image: null },
  ];

  const Trans = [
    { name: "Godlyking Matilda", image: null },
  ];

  // Fun, silly questions
  const funOptions = [
    "Can eat an entire pizza in one sitting",
    "Has a secret talent they're embarrassed about",
    "Would survive a zombie apocalypse",
    "Believes in aliens and has 'evidence'",
    "Has gone 48+ hours without sleep",
    "Owns more than 5 pairs of the same shoes",
    "Would trade their sense of taste for $1 million",
    "Can recite movie lines perfectly on first attempt",
    "Has a playlist specifically for shower singing",
    "Still sleeps with a childhood stuffed animal",
    "Has fallen asleep in a public place",
    "Would rather fight 100 duck-sized horses than 1 horse-sized duck",
    "Has a conspiracy theory they genuinely believe",
    "Would go skydiving if it was free",
    "Has named an inanimate object in their home"
  ];

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = () => {
    setIsMatching(true);
    
    // Simulate processing time for a more dramatic reveal
    setTimeout(() => {
      // Match the user with a random person based on gender selection
      let potentialMatches;
      
      if (gender === 'male') {
        potentialMatches = girls;
      } else if (gender === 'female') {
        potentialMatches = boys;
      } else { // Trans
        potentialMatches = Trans.filter(person => 
          person.name !== name // Avoid matching with self
        );
      }
      
      const randomIndex = Math.floor(Math.random() * potentialMatches.length);
      setMatch(potentialMatches[randomIndex]);
      
      setIsMatching(false);
      setShowResult(true);

      // Scroll to top for better animation viewing
      window.scrollTo(0, 0);

      // Launch confetti in stages for a more impressive effect
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6, x: 0.3 }
        });
        
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 100,
            origin: { y: 0.6, x: 0.7 }
          });
        }, 250);
        
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 160,
            origin: { y: 0.5, x: 0.5 }
          });
        }, 500);
      }, 600);
    }, 2000);
  };

  const handleStartOver = () => {
    setStep(1);
    setName('');
    setGender('');
    setSelectedOptions([]);
    setMatch(null);
    setShowResult(false);
  };

  // Validation for proceeding to next step
  const canProceedToOptions = name.trim().length > 0 && gender !== '';
  const canFindMatch = selectedOptions.length >= 3;

  return (
    <div className="app">
      <div className="bg-gradient"></div>
      <div className="bg-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <header className="header">
        <h1>Department Matchmaker</h1>
        <h4>You cant be lonely on an easter</h4>
        <div className="sparkle-icon">
          <Sparkles size={24} />
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!showResult ? (
          isMatching ? (
            <motion.div 
              key="matching"
              className="matching-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loader">
                <Heart size={64} />
                <div className="loader-text">Finding your perfect match...</div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key={`step-${step}`}
              className="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {step === 1 && (
                <div className="card">
                  <div className="card-header">
                    <h2>About You</h2>
                    <div className="step-indicator">1/2</div>
                  </div>
                  <div className="card-body">
                    <div className="input-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="input-group">
                      <label>Your Gender</label>
                      <div className="gender-options">
                        <label className={`gender-option ${gender === 'male' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                          />
                          <span>Male</span>
                        </label>
                        <label className={`gender-option ${gender === 'female' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                          />
                          <span>Female</span>
                        </label>
                        <label className={`gender-option ${gender === 'Trans' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="gender"
                            value="Trans"
                            checked={gender === 'Trans'}
                            onChange={() => setGender('Trans')}
                          />
                          <span>Trans</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button 
                      className="button primary"
                      disabled={!canProceedToOptions}
                      onClick={() => setStep(2)}
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="card">
                  <div className="card-header">
                    <h2>Fun Questions</h2>
                    <div className="step-indicator">2/2</div>
                  </div>
                  <div className="card-body">
                    <p className="instruction">Select at least 3 options that describe you:</p>
                    <div className="options-container">
                      {funOptions.map((option, index) => (
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
                    <div className="selection-counter">
                      <span>{selectedOptions.length}/3</span> selected
                    </div>
                  </div>
                  <div className="card-footer dual-buttons">
                    <button 
                      className="button secondary"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button 
                      className="button primary match-button"
                      disabled={!canFindMatch}
                      onClick={handleSubmit}
                    >
                      Find Match <Heart size={18} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )
        ) : (
          <motion.div 
            key="result"
            className="result-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <div className="match-card">
              <div className="match-header">
                <div className="match-title">
                  <Heart size={28} className="match-icon" />
                  <h2>Perfect Match!</h2>
                </div>
                <div className="match-subtitle">The stars have aligned</div>
              </div>
              
              <div className="match-content">
                <div className="match-profiles">
                  <div className="profile">
                    <div className="profile-avatar">
                      <User size={24} />
                      <div className="profile-letter">{name.charAt(0).toUpperCase()}</div>
                    </div>
                    <div className="profile-name">{name}</div>
                  </div>
                  
                  <div className="match-heart-container">
                    <Heart size={40} className="match-heart" />
                  </div>
                  
                  <div className="profile">
                    <div className="profile-avatar">
                      <User size={24} />
                      <div className="profile-letter">{match?.name.charAt(0).toUpperCase()}</div>
                    </div>
                    <div className="profile-name">{match?.name}</div>
                  </div>
                </div>
                
                <div className="match-details">
                  <p className="match-message">
                    What a perfect pairing! You two are meant for each other.
                  </p>
                  <div className="match-stats">
                    <div className="stat">
                      <span className="stat-label">Compatibility</span>
                      <span className="stat-value">98%</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Chemistry</span>
                      <span className="stat-value">Electric</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="match-footer">
                <button onClick={handleStartOver} className="button primary">
                  <Shuffle size={18} />
                  Try Again
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="footer">
        <p>Enjoy your easter! ---Mysterio.</p>
      </footer>
    </div>
  );
}

export default App;