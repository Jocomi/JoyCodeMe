import { useEffect } from 'react';
import '../../css/user/ProjectHistory.css';
import instance from '../../shared/axios';

const ProjectHistory = () => {
  useEffect(() => {
    instance.get("http://localhost:3000/");
  }, []);
  
    return(
        <>
          <div className="history-main">
            <h1>사용기록 관리</h1>
            <hr />
              <div className="history-list">
                <table>
                  <tr>
                    <th>의뢰 내용</th>
                    <th>의뢰 날짜</th>
                    <th>의뢰 기능</th>
                    <th>답변 페이지</th>
                    <th>코드 보기</th>
                    
                  </tr>
                  <tr>
                    <td>회사 홈페이지 만들어줘</td>
                    <td>2024년 10월 30일</td>
                    <td>풀스택</td>
                    <td>UI 미리보기</td>
                    <td>코드 다운로드</td>
                  </tr>
                  <tr>
                    <td>쇼핑몰 페이지 만들어줘</td>
                    <td>2024년 12월 30일</td>
                    <td>풀스택</td>
                    <td>UI 미리보기</td>
                    <td>코드 다운로드</td>
                  
                  </tr>
                  <tr>
                    <td>쇼핑몰 상품 상세 페이지 만들어줘</td>
                    <td>2025년 1월 17일</td>
                    <td>UI</td>
                    <td>UI 미리보기</td>
                    <td>코드 다운로드</td>
                  
                  </tr>
                  <tr>
                    <td>쇼핑몰 상품 목록 페이지 만들어줘</td>
                    <td>2024년 1월 27일</td>
                    <td>UI</td>
                    <td>UI 미리보기</td>
                    <td>코드 다운로드</td>
                  
                  </tr>
                </table>
              </div>
          </div>
        </>
    )
}

export default ProjectHistory;