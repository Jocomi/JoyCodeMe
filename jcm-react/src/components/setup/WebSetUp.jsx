import React from 'react';
import '../../css/setup/WebSetUp.css';
import { Link } from 'react-router-dom';

const WebSetUp = () => {

    return (
        <div className='websetup-container'>
        <div class="step-indicator">
      <span class="step active">Industry</span>
      <span class="step">View</span>
      <span class="step">Export</span>
    </div>
    <div class="card">
      <h2>What type of business are you building?</h2>
      <input type="text" placeholder="만들고 싶은 웹사이트의 주제를 적어주세요..." />
      <Link to="form"><button class="next-btn">Next →</button></Link>
      <p class="suggestion">Not sure? <a href="#">See some suggestions</a> 🔮</p>
      
    </div>
        </div>
    );
};

export default WebSetUp;
