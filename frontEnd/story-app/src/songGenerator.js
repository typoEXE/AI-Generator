import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import 'animate.css';

function SongGenerator({ onBack }) {
    const [style, setStyle] = useState('');
    const [topic, setTopic] = useState('');
    const [scene, setScene] = useState('');
    const [song, setSong] = useState('');
    const [letters, setLetters] = useState([]);
    const [isPressed, setIsPressed] = useState(false);

    const generateSong = () => {
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 200); // Resets after 100ms
        axios.post('/generate_custom_song', { style, topic, scene })
            .then(response => {
                setSong(response.data.song);
                setLetters([...response.data.song]);
            })
            .catch(error => {
                console.error('Error generating song', error);
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
        setStyle('');
        setTopic('');
        setScene('');
        setSong(''); 
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
                <select value={style} onChange={e => setStyle(e.target.value)} style={inputStyle}>
                    <option value="">Select Style</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hip-hop">Hip-Hop</option>
                </select>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter Topic" style={inputStyle} />
                <input type="text" value={scene} onChange={e => setScene(e.target.value)} placeholder="Enter Scene" style={inputStyle} />
            </div>
            <button className={`btn ${isPressed ? 'btn-pressed' : ''}`} onClick={generateSong}>Generate Song</button>
            <button className="btn" onClick={onBack}>Back</button>
            {song && (
                <div className="story-container">
                <div className="story-header">Your Song</div>
                <p className="story-content">{renderLetters()}</p>
                </div>
            )}
             {song && (
                <div>
                    <button className="btn" onClick={generateSong}>New Revision</button>
                    <button className="btn" onClick={resetInputs}>Generate a New Song</button>
                </div>
            )}
        </div>
    );
}

export default SongGenerator;
