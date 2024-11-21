import React, { useContext, useEffect, useState } from 'react';
import '../../css/setup/WebSetUp.css';
import { Link } from 'react-router-dom';
import { Requested } from '../../App';
import instance from '../../shared/axios';

const WebSetUp = () => {

  instance.get(`http://${window.location.hostname}:3000/`);


  const [question, setQuestion] = useState("");
  const ctx = useContext(Requested);

  const setReqCtx = () => {
    ctx.setData(question);
  }

    return (
        <div className='websetup-container'>
          <div className="step-indicator">
            <Link to="/webSetUp"><span className="step active">Web Page</span></Link>
            <Link to="/functionSetUp"><span className="step">Function</span></Link>
            <Link to="/dbSetUp"><span className="step">DataBase</span></Link>
          </div>
          <div className="card">
            <h2>What type of business are you building?</h2>
            <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="만들고 싶은 웹사이트의 주제를 적어주세요..." />
            <Link to="form"><button className="next-btn" onClick={setReqCtx}>Next →</button></Link>
            <p className="suggestion">Not sure? <Link to="/suggestion">See some suggestions</Link> 🔮</p>
            
          </div>
        </div>
    );
};

export default WebSetUp;
