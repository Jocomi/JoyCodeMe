import { useState } from 'react';
import '../../css/post/DetailPost.css';
import PostMenu from './PostMenu';

const DetailPost = () => {
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [isWriteReplyVisible, setIsWriteReplyVisible] = useState(null);

  const toggleAttachment = () => {
    setIsAttachmentOpen(!isAttachmentOpen);
  };

  const addComment = () => {
    if (commentText.trim() === '') return;
    const newComment = { id: Date.now(), text: commentText, replies: [] };
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const toggleReply = (commentId) => {
    setIsWriteReplyVisible(isWriteReplyVisible === commentId ? null : commentId);
  };

  const addReply = (commentId) => {
    if (replyText.trim() === '') return;
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, { id: Date.now(), text: replyText }] }
        : comment
    );
    setComments(updatedComments);
    setReplyText('');
    setIsWriteReplyVisible(null);
  };

  return (
    <div className="detail-post-main">
      <PostMenu/>
      <div className="detail-post">
        <div className="detail-post-header">
          <h2>공지사항📢</h2>
          <div className="post-info">
            <span className="post-date">작성일 : 2024년 10월 24일</span>
            <span className="view-count">조회수 :</span>
            <button className="file-button" onClick={toggleAttachment}>첨부파일</button>
            {isAttachmentOpen && (
              <div className="attachment">
                <a href="img/후보 3.jpg" download>사진</a><br />
                <a href="#" download>첨부파일이 어디까지 늘어날 수 있을 지 실험</a>
              </div>
            )}
          </div>
        </div>

        <div className="detail-post-content">
          <table>
            <tbody>
              <tr>
                <td><h2>10월 23일 공지사항 입니다.</h2></td>
              </tr>
              <tr>
                <td><h3>양준혁</h3></td>
              </tr>
              <tr>
                <td>
                  <img src="img/후보 3.jpg" alt="프로필사진" className="profile-image" />
                </td>
              </tr>
            </tbody>
          </table>
          <h4>내용</h4>
          <div className="main-content">ㅇㅇㅇㅇ</div>
          <div className="post-actions">
            <a href="#">수정</a>
            <a href="#">삭제</a>
          </div>
        </div>

        <div className="comments-section">
          <h4>댓글</h4>
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <div className="comment-header">
                  <img src="img/profile.jpg" alt="프로필 사진" className="comment-profile-image" />
                  <div className="comment-body">
                    <div className="comment-userId">익명</div>
                    <div className="comment-content">{comment.text}</div>
                    <div className="comment-metadata">
                      <span className="comment-time">2024.10.24</span>
                      <div className="comment-actions">
                        <a  onClick={() => toggleReply(comment.id)}>답글</a>
                      </div>
                    </div>
                  </div>
                </div>

                {comment.replies.map((reply) => (
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

                {isWriteReplyVisible === comment.id && (
                  <div className="write-reply">
                    <div className="input-container">
                      <textarea
                        placeholder="답글작성"
                        maxLength="50"
                        style={{ resize: 'none' }}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      ></textarea>
                      <button onClick={() => addReply(comment.id)}>등록</button>
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
      </div>
    </div>
  );
};

export default DetailPost;
