import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/post/DetailPost.css';
import PostMenu from './PostMenu';
import { useNavigate, useParams } from 'react-router-dom';

const DetailPost = () => {
  const navigate = useNavigate();
  const { boardType, postNo } = useParams();
  const [post, setPost] = useState(null);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [isWriteReplyVisible, setIsWriteReplyVisible] = useState(null);
  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));

  const fetchComment = async () => {
    if (boardType !== 'announcement') {
      try {
        const url = `http://localhost:7777/comment/${boardType}/${postNo}`;
        const response = await axios.get(url);
        setComments(response.data);
      } catch (error) {
        console.error('댓글을 불러오는 데 실패했습니다:', error);
      }
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = `http://localhost:7777/${boardType}/${postNo}`;
        const response = await axios.get(url);
        setPost(response.data);
      } catch (error) {
        console.error('게시글 데이터를 가져오는 데 실패했습니다:', error);
      }
    };

    

    fetchPost();
    fetchComment();
  }, [boardType, postNo]);

  const deactivatePost = async () => {
    try {
      const response = await axios.put(`http://localhost:7777/${boardType}/${postNo}/deactivate`);
      alert(response.data);
      goBack();
    } catch (error) {
      console.error('게시글 비활성화 실패:', error);
      alert('비활성화 중 오류가 발생했습니다.');
    }
  };

  const goBack = () => {
    navigate('/notice');
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
    console.log("Comment Data:", commentData);
  
    try {
      const response = await axios.post(`http://localhost:7777/comment/${boardType}/${postNo}/add`, commentData, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      // 응답 데이터의 result 값에 따라 알림 메시지 표시
      if (response.data.result === 1) {
        alert('댓글이 성공적으로 작성되었습니다.');
        setCommentText(''); // 댓글 작성 필드 초기화
        fetchComment();
      } else {
        alert('댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 작성에 실패했습니다:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
    
  };
  const toggleReply = (commentId) => {
    setIsWriteReplyVisible(isWriteReplyVisible === commentId ? null : commentId);
  };

  const addReply = (commentId) => {
    if (replyText.trim() === '') return;
    const updatedComments = comments.map((comment) =>
      comment.commentId === commentId
        ? { ...comment, replies: [...(comment.replies || []), { id: Date.now(), text: replyText }] }
        : comment
    );
    setComments(updatedComments);
    setReplyText('');
    setIsWriteReplyVisible(null);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-post-main">
      <PostMenu />
      <div className="detail-post">
        <div className="detail-post-header">
          <h2>공지사항📢</h2>
          <div className="post-info">
            <span className="post-date">작성일 : {post.postTime}</span>
            <span className="view-count">조회수 : {post.countView}</span>
            <button className="file-button" onClick={toggleAttachment}>첨부파일</button>
            {isAttachmentOpen && (
              <div className="attachment">
                <a href={`img/${post.imgFile}`} download>사진</a><br />
                <a href="#" download>첨부파일이 어디까지 늘어날 수 있을 지 실험</a>
              </div>
            )}
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
                  <img src={`img/${post.imgFile}`} alt="프로필사진" className="profile-image" />
                </td>
              </tr>
            </tbody>
          </table>
          <h4>내용</h4>
          <div className="main-content">{post.postContent}</div>
          <div className="post-actions">
            <a href="#">수정</a>
            {loginUser && post.memberId && loginUser.memberId === post.memberId && (
              <a onClick={deactivatePost} style={{ cursor: 'pointer' }}>삭제</a>
            )}
          </div>
        </div>

        {boardType !== 'announcement' && (
          <div className="comments-section">
            <h4>댓글</h4>
            <ul className="comments-list">
              {comments.map((comment) => (
                <li key={comment.commentId} className="comment-item">
                  <div className="comment-header">
                    <img src="img/profile.jpg" alt="프로필 사진" className="comment-profile-image" />
                    <div className="comment-body">
                      <div className="comment-userId">{comment.memberId || '익명'}</div>
                      <div className="comment-content">{comment.commentText}</div>
                      <div className="comment-metadata">
                        <span className="comment-time">{comment.commentTime || '방금'}</span>
                        <div className="comment-actions">
                          <a onClick={() => toggleReply(comment.commentId)}>답글</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(comment.replies || []).map((reply) => (
                    <ul key={reply.id} className="replies-list">
                      <li className="reply-item">
                        <div className="reply-content">
                          <img src="img/profile.jpg" alt="프로필 사진" className="reply-profile-image" />
                          <div className="reply-body">
                            <span className="reply-userId">익명</span>
                            <span>{reply.text}</span>
                            <span className="reply-time">2024.10.24</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}

                  {isWriteReplyVisible === comment.commentId && (
                    <div className="write-reply">
                      <div className="input-container">
                        <textarea
                          placeholder="답글작성"
                          maxLength="50"
                          style={{ resize: 'none' }}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        ></textarea>
                        <button onClick={() => addReply(comment.commentId)}>등록</button>
                      </div>
                    </div>
                  )}
                </li>
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
