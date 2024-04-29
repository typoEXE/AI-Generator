import React from 'react';
import './App.css';
import StoryGenerator from './StoryGenerator';
import 'animate.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Story Generator</h1>
        <StoryGenerator />
      </header>
    </div>
  );
}

export default App;
