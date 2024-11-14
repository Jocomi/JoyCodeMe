import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../../css/post/EnrollPost.css';
import 'react-quill/dist/quill.snow.css';
import 'summernote/dist/summernote-lite.css';
import $ from 'jquery';
import 'summernote/dist/summernote-lite';

const EnrollPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [content, setContent] = useState(state?.postContent || '');
  const [title, setTitle] = useState(state?.postTitle || '');
  const [memberId, setMemberId] = useState('');
  const [visibility, setVisibility] = useState(state?.status || 'Y');
  const [boardType, setBoardType] = useState(state?.boardType || 'enquiry');
  const [file, setFile] = useState([]);  // 여러 개 파일 처리
  const [existingFiles, setExistingFiles] = useState(state?.existingFiles || []);  // 기존 파일 목록

  const [isEditing, setIsEditing] = useState(!!state?.postNo);  // 수정 모드 여부 판단
  const postNo = state?.postNo;

  // 로그인 사용자 정보 가져오기
  useEffect(() => {
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser) {
      setMemberId(loginUser.memberId);
    }
  }, []);

  // summernote 설정
  useEffect(() => {
    $('#summernote').summernote({
      tabDisable: true,
      height: 500,
      width: '100%',
      disableResizeEditor: true,
      placeholder: "내용을 입력해 주세요.",
      lang: "ko-KR",
      callbacks: {
        onChange: (contents) => {
          setContent(contents);
        }
      }
    });

    return () => {
      $('#summernote').summernote('destroy');
    };
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files);  // 여러 파일을 받아옵니다.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(boardType, new Blob([JSON.stringify({
      memberId,
      postTitle: title,
      postContent: content,
      status: visibility,
      boardType
    })], { type: "application/json" }));
  
    // 기존 파일 추가
    if (existingFiles.length > 0) {
      existingFiles.forEach((file) => {
        formData.append("existingFiles", file);  // 기존 파일을 함께 보내기
      });
    }

    // 새 파일 추가 (여러 파일을 처리)
    if (file.length > 0) {
      Array.from(file).forEach((f) => {
        formData.append("file", f);  // 새 파일을 보냄
      });
    }
    console.log(formData)
    try {
      const url = postNo
        ? `http://${window.location.hostname}:7777/edit/${boardType}/${postNo}`
        : `http://${window.location.hostname}:7777/enroll${boardType}`;
      
      const method = postNo ? 'put' : 'post';

      const response = await axios({
        method: method,
        url: url,
        data: formData, // FormData 객체를 보냄
        headers: {
          // "Content-Type"을 설정할 필요 없음, axios가 자동으로 설정합니다.
          
        }
        
      });
      console.log(response)
      alert(postNo ? "게시물이 성공적으로 수정되었습니다." : "게시물이 성공적으로 등록되었습니다.");
      navigate(`/${boardType}Board`);
    } catch (error) {
    
      alert("게시물 수정에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="enroll-post">
      <div className="main-div">
        <form onSubmit={handleSubmit}>
          <div className="post-content-div">
            <h2>{postNo ? "게시물 수정" : "게시물 작성"}</h2>
            <div className="row">
              <div className="col">
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    value={boardType}
                    onChange={(e) => setBoardType(e.target.value)}
                    disabled={isEditing}  // 수정 모드일 때만 disabled
                  >
                    <option value="enquiry">문의사항</option>
                    <option value="free">자유게시판</option>                   
                    <option value="project">프로젝트 게시판</option>
                    <option value="announcement">공지사항</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    value={visibility}
                    onChange={handleVisibilityChange}
                  >
                    <option value="Y">공개</option>
                    <option value="N">비공개</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">제목</span>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="input-group mb-3">
                  <span className="input-group-text">작성자</span>
                  <input type="text" className="form-control" value={memberId} readOnly />
                </div>
              </div>
            </div>
            <div>
              <div id="summernote" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={handleFileChange}
                multiple  // 여러 파일 선택 가능
                accept="image/*"  // 이미지 파일만 받기
              />
            </div>

            {isEditing && existingFiles.length > 0 && (
              <div className="existing-files">
                <h5>기존 첨부파일</h5>
                <ul>
                  {existingFiles.map((file, index) => (
                    <li key={index}>{file}</li>  // 기존 파일 리스트 표시
                  ))}
                </ul>
              </div>
            )}

            <div className="enroll-items">
              <div className="enroll-btn">
                <button className="btn btn-danger" type="button" onClick={() => navigate('/notice')}>
                  취소
                </button>
              </div>
              <div className="enroll-btn">
                <input className="btn btn-primary" type="submit" value={postNo ? "수정하기" : "작성하기"} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollPost;
