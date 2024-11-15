import React, { useContext, useEffect, useState } from 'react';
import '../../css/setup/WebSetUp.css';
import { Link } from 'react-router-dom';
import { Requested } from '../../App';
import instance from '../../shared/axios';

const DBSetUp = () => {
  useEffect(() => {
    instance.get("http://localhost:3000/");
  }, []);

  const [question, setQuestion] = useState("");
  const ctx = useContext(Requested);

  const setReqCtx = () => {
    ctx.setData(question);
  }

    return (
        <div className='websetup-container'>
          <div class="step-indicator">
            <Link to="/webSetUp"><span class="step">Web Page</span></Link>
            <Link to="/functionSetUp"><span class="step">Function</span></Link>
            <Link to="/dbSetUp"><span class="step active">DataBase</span></Link>
          </div>
          <div class="card">
            <h2>What type of business are you building?</h2>
            <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="만들고 싶은 웹사이트의 데이터베이스를 입력해 주세요..." />
            <Link to="form"><button class="next-btn" onClick={setReqCtx}>Next →</button></Link>
            <p class="suggestion">Not sure? <Link to="/suggestion">See some suggestions</Link> 🔮</p>
            
          </div>
        </div>
    );
};

export default DBSetUp;
