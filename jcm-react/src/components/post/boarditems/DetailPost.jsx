import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../css/post/DetailPost.css';
import PostMenu from './PostMenu';
import { useParams } from 'react-router-dom';
import { use } from 'framer-motion/client';

const DetailPost = () => {
  const navigate = useNavigate();
  const { boardType, postNo } = useParams();
  const [post, setPost] = useState(null);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [isWriteReplyVisible, setIsWriteReplyVisible] = useState(null);
  const [recommend, setRecommend] = useState();
  const [isRecommend, setIsRecommend] = useState(false);
  const [isRepliesVisible, setIsRepliesVisible] = useState(false); // 답글 표시 여부 상태 관리
  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const [recomments, setRecomments] = useState({}); // 댓글 번호별 답글 저장
  const [isLoading, setIsLoading] = useState(false);
  const [replyTexts, setReplyTexts] = useState({});

  const fetchComment = async () => {
    if (boardType !== 'announcement') {
      try {
        const url = `http://${window.location.hostname}:7777/comment/${boardType}/${postNo}`;
        const response = await axios.get(url);
        setComments(response.data);
      } catch (error) {
        console.error('댓글을 불러오는 데 실패했습니다:', error);
      }
    }
  };
  const fetchPost = async () => {
    try {
      const url = `http://${window.location.hostname}:7777/detail/${boardType}/${postNo}`;
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
      console.log(post.isRecommend, typeof post.isRecommend);
      
      setIsRecommend(post.isRecommend === "true");

    }
  }, [post]);




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

  const toggleAttachment = () => {
    setIsAttachmentOpen(!isAttachmentOpen);
  };

  const addComment = async () => {
    if (!loginUser) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }
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
        alert('댓글이 성공적으로 작성되었습니다.');
        setCommentText('');
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
    console.log(commentNo);
    try {
      const response = await axios.put(`http://${window.location.hostname}:7777/comment/${boardType}/${commentNo}/delete`, Data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.data)
      if (response.data === 1) {
        
        alert('댓글이 성공적으로 삭제되었습니다.');

        setCommentText('');
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
          console.log()
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
              alert('답글이 성공적으로 작성되었습니다.');
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


  const Comment = ({comment, recomments}) => {
    return (
      <li key={comment.commentId} className="comment-item">
                  <div className="comment-header">
                    <img src="img/profile.jpg" alt="프로필 사진" className="comment-profile-image" />
                    <div className="comment-body">
                      <div className="comment-userId">{comment.memberId || '익명'}</div>
                      <div className="comment-content">
                        {/* 'enquiry'일 때 댓글을 '답변' 형식으로 표시 */}
                        {comment.commentText}
                      </div>
                      <div className="comment-metadata">
                        <span className="comment-time">{comment.commentTime || '방금'}</span>
                        <div className="comment-actions">
                          {/* 'enquiry'일 때는 답글을 숨깁니다. */}
                          {boardType !== 'enquiry' && (
                            <a onClick={() => toggleRepliesVisibility(comment.commentNo)}>
                            {isRepliesVisible[comment.commentNo] ? '답글 숨기기' : '답글 보기'}
                          </a>
                          )}
                            <a onClick={() =>deleteComent(comment.commentNo)}>삭제</a>
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
                    {(recomments[comment.commentNo] || []).map((recomment) => (
                      <li key={recomment.recommentNo} className="reply-item">
                        <div className="reply-content">
                          <img src="img/profile.jpg" alt="프로필 사진" className="reply-profile-image" />
                          <div className="reply-body">
                            <span className="reply-userId">{recomment.memberId || '익명'}</span>
                            <span>{recomment.recommentText}</span>
                            <span className="reply-time">{new Date(recomment.recommentTime).toLocaleString()}</span>
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
                  <button  onClick={() => recomment(comment.commentNo)}>등록</button>
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
          </div>
          <button className="go-back-button" onClick={goBack}>X</button>
        </div>

        <div className="detail-post-content">
          <table>
            <tbody>
              <tr>
                <td><h2>{post.postTitle}</h2></td>
              </tr>
              <tr>
                <td><h3>{post.memberId}</h3></td>
              </tr>
              <tr>
                <td>
                  <img src={``} alt="프로필 이미지" className="profile-image" />
                </td>
              </tr>
            </tbody>
          </table>
          <h4>내용</h4>
          <div className="main-content" dangerouslySetInnerHTML={{ __html: post.postContent }}></div>
          <div className="post-actions">
            {loginUser && post.memberId && loginUser.memberId === post.memberId && (
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
                <Comment comment={comment} recomments={recomments}/>
              ))}
            </ul>
            <div className="write-comment">
              <div className="input-container">
                <textarea
                  placeholder="댓글작성"
                  maxLength="50"
                  style={{ resize: 'none' }}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <button onClick={addComment}>등록</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPost;
