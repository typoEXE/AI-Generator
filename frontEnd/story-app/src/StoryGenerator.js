import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import 'animate.css';

function StoryGenerator() {
    const [genre, setGenre] = useState('');
    const [characters, setCharacters] = useState('');
    const [setting, setSetting] = useState('');
    const [story, setStory] = useState('');
    const [letters, setLetters] = useState([]);
    const [isPressed, setIsPressed] = useState(false);

    const generateStory = () => {
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 200); // Resets after 100ms
        axios.post('/generate_custom_story', { genre, characters, setting })
            .then(response => {
                setStory(response.data.story);
                setLetters([...response.data.story]);
            })
            .catch(error => {
                console.error('Error generating story', error);
            });
    };  

    const renderLetters = () => {
        return letters.map((letter, index) => (
            <span 
                key={index}
                style={{
                    opacity: 0,
                    animation: `fadeIn 0.1s ${index * 0.01}s forwards`
                }}
                className="animate__animated"
            >
                {letter}
            </span>
        ));
    };

    const resetInputs = () => {
        setGenre('');
        setCharacters('');
        setSetting('');
        setStory(''); 
    };
    
    const inputContainerStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: '20px' 
    };

    const inputStyle = {
        width: '300px',
        height: '40px', 
        marginBottom: '10px', 
        fontSize: '16px' 
    };

    return (
        <div>
            <div style={inputContainerStyle}>
                <select value={genre} onChange={e => setGenre(e.target.value)} style={inputStyle}>
                    <option value="">Select Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="mystery">Mystery</option>
                    <option value="sci-fi">Sci-Fi</option>
                </select>
                <input type="text" value={characters} onChange={e => setCharacters(e.target.value)} placeholder="Enter Characters" style={inputStyle} />
                <input type="text" value={setting} onChange={e => setSetting(e.target.value)} placeholder="Enter Setting" style={inputStyle} />
            </div>
            <button className={`btn ${isPressed ? 'btn-pressed' : ''}`} onClick={generateStory}>Generate Story</button>
            {story && (
                <div className="story-container">
                <div className="story-header">Your Story</div>
                <p className="story-content">{renderLetters()}</p>
                </div>
            )}
             {story && (
                <div>
                    <button className="btn" onClick={generateStory}>New Revision</button>
                    <button className="btn" onClick={resetInputs}>Generate a New Story</button>
                </div>
            )}
        </div>
    );
}

export default StoryGenerator;
