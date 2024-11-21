import React, { useContext, useEffect, useState } from 'react';
import '../../css/setup/WebSetUp.css';
import { Link } from 'react-router-dom';
import { Requested } from '../../App';
import instance from '../../shared/axios';

const FunctionSetUp = () => {

  instance.get(`http://${window.location.hostname}:3000/`);


  const [question, setQuestion] = useState("");
  const [grade, setGrade] = useState("");
  const ctx = useContext(Requested);

  const setReqCtx = () => {
    ctx.setData(question);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = {
          memberId: JSON.parse(sessionStorage.getItem('loginUser')).memberId,
      };

      try {
          const response = await fetch(`http://${window.location.hostname}:7777/grade`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          });

          if (!response.ok) {
              throw new Error("HTTP error! status: " + response.status);
          }

          const result = await response.json();

          if (response.status === 200) { // 성공 시 처리
              setGrade(result.payProduct);
          } else {
              alert("등급 조회에 실패했습니다.... 등급을 확인해 주세요.");
          }
      } catch (error) {
          console.error("Error fetching grade:", error);
          alert("등급 조회 중 오류가 발생했습니다.");
      }
  };

  fetchData();
}, []);

    return (
        <div className='websetup-container'>
          <div className="step-indicator">
            <Link to="/webSetUp"><span className="step">Web Page</span></Link>
            <Link to="/functionSetUp"><span className="step active">Function</span></Link>
            <Link to="/dbSetUp"><span className="step">DataBase</span></Link>
          </div>
          <div className="card">
            <h2>What type of business are you building?</h2>
            <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="만들고 싶은 웹사이트의 기능을 적어주세요..." />
            <Link to="form"><button className="next-btn" onClick={setReqCtx}>Next →</button></Link>
            <p className="suggestion">Not sure? <Link to="/suggestion">See some suggestions</Link> 🔮</p>
            
          </div>
          <br/>
          <div className="grade">
            회원님의 등급은 {grade}입니다.
          </div>
        </div>

    );
};

export default FunctionSetUp;
