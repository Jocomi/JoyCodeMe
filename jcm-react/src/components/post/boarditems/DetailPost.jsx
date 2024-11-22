import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../css/post/DetailPost.css';
import PostMenu from './PostMenu';
import { useParams } from 'react-router-dom';
import instance from '../../../shared/axios';
import { div } from 'framer-motion/client';

const DetailPost = () => {

  const navigate = useNavigate();
  const { boardType, postNo } = useParams();
  const [post, setPost] = useState(null);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [isWriteReplyVisible, setIsWriteReplyVisible] = useState(null);
  const [recommend, setRecommend] = useState();
  const [isRecommend, setIsRecommend] = useState(false);
  const [isRepliesVisible, setIsRepliesVisible] = useState(false); // 답글 표시 여부 상태 관리
  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const [recomments, setRecomments] = useState({}); // 댓글 번호별 답글 저장
  const [isLoading, setIsLoading] = useState(false);
  const [replyTexts, setReplyTexts] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const idFilters = /^[a-zA-Z](?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/;
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const fetchComment = async () => {
    if (boardType !== 'announcement') {
      try {
        const url = `http://${window.location.hostname}:7777/comment/${boardType}/${postNo}`;
        const response = await axios.get(url);
         // 댓글을 시간순으로 정렬 (가장 오래된 댓글이 위로)
      const sortedComments = response.data.sort((a, b) => new Date(a.commentTime) - new Date(b.commentTime));
      setComments(sortedComments);
        
      } catch (error) {
        console.error('댓글을 불러오는 데 실패했습니다:', error);
      }
    }
  };
  const fetchPost = async () => {
      try {
        const url = `http://${window.location.hostname}:7777/detail/${boardType}/${postNo}?memberId=${loginUser ? loginUser.memberId : ''}`;
        const response = await axios.get(url);
        setPost(response.data);
      } catch (error) {
        console.error('게시글 데이터를 가져오는 데 실패했습니다:', error);
      }
  };
  
  useEffect(() => {
   
    fetchPost();
    fetchComment();
  }, []);

  useEffect(()=>{
    if (post !== null) {
      setRecommend(post.recommend);
      setIsRecommend(post.isRecommend === 'true');
    }
  
  }, [post]);

  //로그인 체크 함수
  const checkLogin = () => {
    if (!loginUser) {
      alert('로그인 후 작성할 수 있습니다.');
      return false;
    }
    return true;
  };



  const deactivatePost = async () => {
    try {
      const response = await axios.put(`http://${window.location.hostname}:7777/${boardType}/${postNo}/deactivate`);
      alert(response.data);
      goBack();
    } catch (error) {
      console.error('게시글 비활성화 실패:', error);
      alert('비활성화 중 오류가 발생했습니다.');
    }
  };

  const goBack = () => {
    navigate(-1);
  };


  const report = async (postNo) => {
    if (!loginUser) {
      alert('로그인 후 게시물을 신고할 수 있습니다.');
      return;
    }
    const confirmReport = window.confirm("이 게시물을 신고하시겠습니까?");
  
    if (!confirmReport) {
        // 사용자가 신고를 취소하면 종료
       
        alert("신고가 취소되었습니다.");
        return;
    }
    
    // 이미 신고된 게시물인지 확인
    try {
        const response = await axios.get(`http://${window.location.hostname}:7777/select/report`);
        const existingReports = response.data; // 이미 신고된 게시물 목록

        // 로그인된 사용자 정보
        const memberId = loginUser ? loginUser.memberId : '';
        console.log(response.data);
        
        // 이미 신고한 게시물인지 확인
        const isAlreadyReported = existingReports.some(report => 
            report.reportId === memberId && 
            report.postNo === postNo && 
            report.boardType.toUpperCase() === boardType.toUpperCase()
        );

        if (isAlreadyReported) {
            alert("이미 신고한 게시물입니다.");
            return; // 이미 신고한 경우 신고를 진행하지 않음
        }

      
    } catch (error) {
        console.error("신고 데이터 가져오기 실패:", error);
        alert('신고 데이터를 가져오는 데 실패했습니다.');
    }
    openModalHandler();
}
const goReport = async () => {
  let reportText = document.getElementById('report-text').value;
  const memberId = loginUser ? loginUser.memberId : '';
 
  const data = {
    reportId : memberId,
    reportText :  reportText
  }
  console.log(data);
   // 신고가 이루어지지 않았다면 새로운 신고 처리
   try {
    const postResponse = await axios.post(
        `http://${window.location.hostname}:7777/${boardType}/${postNo}/report`, data
    );
    alert('게시물이 신고 되었습니다.');
    openModalHandler();
} catch (error) {
    console.error('게시글 신고 실패:', error);
    alert('게시글 신고 중 오류가 발생했습니다.');
}
}
  const toggleAttachment = () => {
    setIsAttachmentOpen(!isAttachmentOpen);
  };

  const addComment = async () => {
    let commentText = document.getElementById('comment-text').value;
    if (commentText.trim() === '') return;

    const commentData = {
      memberId: loginUser.memberId,
      postNo,
      commentText,
    };
   

    try {
      const response = await axios.post(`http://${window.location.hostname}:7777/comment/${boardType}/${postNo}/add`, commentData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.result === 1) {
        
        document.getElementById('comment-text').value = '';
        fetchComment();
      } else {
        alert('댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 작성에 실패했습니다:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  const deleteComent = async (commentNo) =>{
    const Data ={
      commentNo : commentNo,
      boardType
    }
    try {
      const response = await axios.put(`http://${window.location.hostname}:7777/comment/${boardType}/${commentNo}/delete`, Data, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data === 1) {
        
        alert('댓글이 성공적으로 삭제되었습니다.');

        
        fetchComment();
      } else {
        alert('댓글 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 작성에 실패했습니다:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  }

  const toggleReply = (commentId) => {
    if (boardType === 'enquiry') return;  // 답글 작성 비활성화
    setIsWriteReplyVisible(isWriteReplyVisible === commentId ? null : commentId);
  };

        // 답글 작성
        const recomment = async (commentNo) => {
          let recommentText = document.getElementById(`recomment-${commentNo}`).value;
          if (!loginUser) {
            alert('로그인 후 답글을 작성할 수 있습니다.');
            return;
          }

          const replyData = {
            memberId: loginUser.memberId,
            postNo,
            commentNo,
            recommentText 
          };

          try {
            const response = await axios.post(
              `http://${window.location.hostname}:7777/recomment/${boardType}/${commentNo}/add`,
              replyData,
              { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.result === 1) {
              
              setReplyTexts('');
              setIsWriteReplyVisible(null);
              fetchComment();
              fetchRecomments(commentNo);
            } else {
              alert('답글 작성에 실패했습니다.');
            }
          } catch (error) {
            console.error('답글 작성에 실패했습니다:', error);
            alert('답글 작성 중 오류가 발생했습니다.');
          }
        };

 

  const navigateToEdit = () => {
    navigate('/enrollPost', {
      state: {
        postNo,
        boardType,
        postTitle: post.postTitle,
        postContent: post.postContent,
        status: post.status
      }
    });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const fetchCommend = async () => {
    if (!loginUser) {
      alert('로그인 후 추천을 누를 수 있습니다.');
      return;
    }
    const commendData = {
      memberId: loginUser.memberId,
      postNo,
      boardType
    };
    try {
      const response = await axios.post(`http://${window.location.hostname}:7777/recommend`, commendData, {
        headers: { 'Content-Type': 'application/json' },
      });

      
        
        
      if(!isRecommend){
        setRecommend(recommend+1);
      } else{
        setRecommend(recommend-1);
      }
      setIsRecommend(!isRecommend);

      
     
    } catch (error) {
      
     
      // fetchPost();
      console.log(error);
      

    }
  
  }
  // 답글 가져오기
  const fetchRecomments = async (commentNo) => {
    setIsLoading(true);
    const data = {
      boardType,
      commentNo
    }
    try {
      const url = `http://${window.location.hostname}:7777/recomment/${boardType}/${commentNo}/select`;
      const response = await axios.get(url,data);

      if (response.status === 200) {
        console.log(response.data);
    
        setRecomments((prev) => ({
          ...prev,
          [commentNo]: response.data, // 댓글 번호별 답글 저장
        }));
      } else {
        throw new Error('답글 데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('답글 데이터를 가져오는 데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const ReFetchRecomments = async (commentNo) => {
    setIsLoading(true);
    const data = {
      boardType,
      commentNo
    }
    try {
      const url = `http://${window.location.hostname}:7777/recomment/${boardType}/${commentNo}/select`;
      const response = await axios.get(url,data);

      if (response.status === 200) {
        console.log(response.data);
    
        setRecomments({
  [commentNo]: response.data, // 댓글 번호별 답글 저장
});
      } else {
        throw new Error('답글 데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('답글 데이터를 가져오는 데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleRepliesVisibility = async (commentNo) => {
    const isVisible = isRepliesVisible[commentNo] || false;
    if (!isVisible) {
      // 답글을 처음 보려는 경우 서버에서 데이터를 가져옴
      await fetchRecomments(commentNo);
    }
  
    setIsRepliesVisible((prev) => ({
      ...prev,
      [commentNo]: !isVisible, // 현재 댓글의 표시 상태만 반전
    }));
  };


const deleteRecomment = async (recommentNo, commentNo) =>{
  const Data = {
    recommentNo,
    boardType
  }
  try{
  const response = await axios.put(`http://${window.location.hostname}:7777/recomment/${boardType}/${recommentNo}/delete`, Data)
  if (response.data.result === 1) {
    alert('답글이 성공적으로 삭제되었습니다.');
    setIsRepliesVisible(true);
    ReFetchRecomments(commentNo);
  } else {
    alert('답글 삭제에 실패했습니다.');
  }
} catch (error) {
  console.error('답글 삭제에 실패했습니다:', error);
  alert('답글 삭제 중 오류가 발생했습니다.');
}
}

  const Comment = ({comment, recomments}) => {
    return (
      <li key={comment.commentId} className="comment-item">
                  <div className="comment-header">
                    <div className="comment-body">
                      <div className="comment-userId">{comment.memberId}</div>
                      <div className="comment-content">
                        {/* 'enquiry'일 때 댓글을 '답변' 형식으로 표시 */}
                        {comment.commentText}
                      </div>
                      <div className="comment-metadata">
                        <span className="comment-time">{comment.commentTime}</span>
                        <div className="comment-actions">
                          {/* 'enquiry'일 때는 답글을 숨깁니다. */}
                          {boardType !== 'enquiry' && (
                            <a onClick={() => toggleRepliesVisibility(comment.commentNo)}>
                            {isRepliesVisible[comment.commentNo] ? '답글 숨기기' : '답글 보기'}
                          </a>
                          )}
                            {(loginUser && (loginUser.memberId === comment.memberId || loginUser.status === 'A')) && (
                              <a onClick={() => deleteComent(comment.commentNo)} style={{color : 'red'}}>삭제</a>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

              {/* 답글 리스트 */}
              
               {/* 답글 리스트 */}
              {isRepliesVisible[comment.commentNo] && (
                 <>
                <div className="replies">
                  <ul className="replies-list">
                    {(recomments[comment.commentNo] || [])
                    .filter((recomment) => recomment.status === 'Y') // status가 Y인 항목만 필터링
                    .map((recomment) => (
                      <li key={recomment.recommentNo} className="reply-item">
                        <div className="reply-content">
                        <div className="reply-body">
                            <span className="reply-userId">{recomment.memberId}</span>
                            <span className='reply-text'>{recomment.recommentText}</span>
                            <div className='recomment-items'>
                            <span className="reply-time">{new Date(recomment.recommentTime).toLocaleString()}</span>
                            <a onClick={()=>deleteRecomment(recomment.recommentNo , recomment.commentNo)}  style={{color : 'red'}}>삭제</a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                     {/* 답글 작성 */}
            {boardType !== 'enquiry' && (
              <div className="write-reply">
                <div className="input-container">
                <textarea
                  id={`recomment-${comment.commentNo}`} // 고유한 id 값 추가
                  placeholder="답글작성"
                  maxLength="50"
                  style={{ resize: 'none' }}
                />
                  <button   onClick={() => {
                    // 로그인 여부 확인
                    if (!checkLogin()) return;
                    recomment(comment.commentNo); // 답글 작성 로직 실행
                  }}>등록</button>
                </div>
              </div>
            )}
           </>
              )}

       
          </li>
        );
      }

  return (
    <div className="detail-post-main">
      <PostMenu />
      <div className="detail-post">
        <div className="detail-post-header">
          <h2>{post.boardType}</h2>
          <div className="post-info">
            <span className="post-date">작성일 : {post.postTime}</span>
            <span className="view-count">조회수 : {post.countView}</span>
            {boardType !== 'enquiry' && boardType !== 'announcement' && (
                <button className="report-button" onClick={()=>report(post.postNo)}>신고</button>
            )}
            {isOpen && (
              <div >
              <div  onClick={openModalHandler}>
                <div className="report-modal" onClick={(e) => e.stopPropagation()}>
                  <button className='close-report' onClick={openModalHandler}>닫기</button>
                  <textarea placeholder='50자 이내로 신고 내용을 작성 해주세요.' name="" id="report-text"  ></textarea>
                  <button className='report-button' onClick={goReport}>신고하기</button>
                </div>
              </div>
              </div>
            )}
          </div>
          
        </div>

        <div className="detail-post-content">
          <table>
            <tbody>
              <tr>
                <td><h2>{post.postTitle}</h2></td>
              </tr>
              <tr>
              <td>
              <h3>
                {idFilters.test(post.memberId)
                ? post.memberId  // memberId가 조건에 맞으면 그대로 출력
                : post.email.split('@')[0]}
              </h3>
              </td>
              </tr>
              <tr>
                <td>
                <img src={`http://${window.location.hostname}:7777${post.pimg || '/img/TEST.JPG'}`} alt="" className="profile-image" />
                </td>
              </tr>
            </tbody>
          </table>
          <h4>내용</h4>
          <div className="main-content" dangerouslySetInnerHTML={{ __html: post.postContent }}></div>
          <div className="post-actions">
          {loginUser && post.memberId && (loginUser.memberId === post.memberId || loginUser.status === 'A') && (
            <>
              <a onClick={navigateToEdit} style={{ cursor: 'pointer' }}>수정</a>
              <a onClick={deactivatePost} style={{ cursor: 'pointer' }}>삭제</a>
            </>
          )}
          </div>
        </div>
        {boardType !== 'announcement'  &&(
          <div className='commend-div'>
          <button onClick={fetchCommend}>추천</button> <h4>{recommend}</h4>
          </div>
        )}
       

        {/* 댓글 작성 및 표시 */}
        {boardType !== 'announcement' && (
          <div className="comments-section">
            <h4>{boardType === 'enquiry' ? `답변` : `댓글`}</h4>
            <ul className="comments-list">
              {comments.map((comment) => (
                comment.status === 'Y' &&
                <Comment key={comment.commentNo} comment={comment} recomments={recomments}/>
              ))}
            </ul>
            <div className="write-comment">
              <div className="input-container">
                <textarea
                  id='comment-text'
                  placeholder="댓글작성"
                  maxLength="50"
                  style={{ resize: 'none' }}
                ></textarea>
                <button 
                  onClick={() => {
                    // 로그인 여부 확인
                    if (!checkLogin()) return;
                    addComment(); // 답글 작성 로직 실행
                  }}>등록</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPost;
