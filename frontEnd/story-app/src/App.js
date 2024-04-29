import React, { useState } from 'react';
import './App.css';
import StoryGenerator from './StoryGenerator';
import SongGenerator from './songGenerator'; // This will be used similarly in future steps
import 'animate.css';

function App() {
    const [showGenerators, setShowGenerators] = useState(true);
    const [title, setTitle] = useState('AI Generator');
    const [page, setPage] = useState('');

    const handleStoryClick = () => {
        setTitle('AI Story Generator');
        setShowGenerators(false);
        setPage('story');
    };

    const handleSongClick = () => {
        setTitle('AI Song Generator'); // Assuming similar functionality for the song generator
        setShowGenerators(false);
        setPage('song');
    };

    const handleBack = () => {
        setShowGenerators(true);
        setPage('');
        setTitle('AI Generator');
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>{title}</h1>
                {showGenerators && (
                    <div className="button-container">
                        <button onClick={handleStoryClick} className="btn">Story Generator</button>
                        <button onClick={handleSongClick} className="btn">Song Generator</button>
                    </div>
                )}
                {page === 'story' && <StoryGenerator onBack={handleBack} />}
                {page === 'song' && <SongGenerator onBack={handleBack} />}
            </header>
        </div>
    );
}

export default App;
