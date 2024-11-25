import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../../css/post/EnrollPost.css';
import 'summernote/dist/summernote-lite.css';
import $ from 'jquery';
import 'summernote/dist/summernote-lite';
import instance from '../../../shared/axios';

const EnrollPost = () => {
  instance.get(`http://${window.location.hostname}:3000/`);

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const [content, setContent] = useState(state?.postContent || '');
  const [title, setTitle] = useState(state?.postTitle || '');
  const [memberId, setMemberId] = useState('');
  const [visibility, setVisibility] = useState(state?.status || 'Y');
  const [boardType, setBoardType] = useState(state?.boardType || '');
  const [post, setPost] = useState('');
  const postNo = state?.postNo;

  const fetchPost = async () => {
    try {
      const url = `http://${window.location.hostname}:7777/detail/${boardType}/${postNo}`;
      const response = await axios.get(url);
      setPost(response.data);
    } catch (error) {
      console.error('게시글 데이터를 가져오는 데 실패했습니다:', error);
    }
  };
  // 로그인 사용자 정보 가져오기
  useEffect(() => {
    instance.get(`http://${window.location.hostname}:3000/`);
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser) {
      setMemberId(loginUser.memberId);
    }
    fetchPost();
  }, []);

 
  // Summernote 초기화
  useEffect(() => {
    $('#summernote').summernote({
      tabDisable: true,
      height: 500,
      width: '100%',
      disableResizeEditor: true,
      placeholder: '2글자 이상의 내용을 입력해 주세요.',
      lang: 'ko-KR',
      callbacks: {
        onChange: (contents) => {
          setContent(contents);
        },
        onImageUpload: async function (files) {
          const formData = new FormData();
          
          Array.from(files).forEach(file => {
            formData.append('imgList', file);  // imgList로 여러 파일 전송
          });

        
      
          try {
            const response = await axios.postForm(`http://${window.location.hostname}:7777/upload`, formData);
          
            const imageUrls = response.data; // 서버에서 반환된 이미지 URL 목록
            imageUrls.forEach(url => {
              const imgElement = document.createElement('img');
              imgElement.src = `http://${window.location.hostname}:7777/${url}`;
              imgElement.style.width = '25%'; // 이미지 크기를 25%로 고정
              imgElement.style.height = 'auto';
              imgElement.draggable = false; // 드래그앤드롭 비활성화
  
              // 섬머노트에 이미지 삽입
              $('#summernote').summernote('editor.insertNode', imgElement);
            });
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
          }
        }
      }
    });

    // 컴포넌트 언마운트 시 섬머노트 인스턴스 해제
    return () => {
      $('#summernote').summernote('destroy');
    };
  }, []);

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 공개/비공개 변경 핸들러
  const handleVisibilityChange = (e) => {
     // 자유게시판과 공지사항은 공개로 고정
  if (boardType === 'free' || boardType === 'announcement') {
    alert('자유게시판은 항상 공개로 설정됩니다.');
    setVisibility('Y'); // 공개로 강제 설정
    return;
  }
  setVisibility(e.target.value); // 기타 게시판은 선택 가능
  };
  const handleBoardTypeChange = (e) => {
    const selectedBoardType = e;
    setBoardType(selectedBoardType);
  
    // 자유게시판과 공지사항 선택 시 공개로 설정
    if (selectedBoardType === 'free' || selectedBoardType === 'announcement') {
      setVisibility('Y');
    }
  };

  // 게시물 제출 핸들러
 const handleSubmit = async (e) => {
    e.preventDefault();

    // 작성한 내용을 파일로 변환
    const blob = new Blob([content], { type: 'text/plain' });
    const file = new File([blob], 'postContent.txt');

    const formData = new FormData();
    formData.append('contentFile', file);

    try {
      // 파일 업로드 API 호출
      const response = await axios.post(`http://${window.location.hostname}:7777/uploadPostContent`, formData);
      const filePath = response.data; // 서버에서 반환된 파일 경로

      // 게시물 저장 시 파일 경로 포함하여 전송
      const postData = {
        postTitle: title,
        memberId,
        postContent: filePath,  // DB에 저장될 파일 경로
        privateBoard: visibility,
        boardType,
      };

      const url = postNo
        ? `http://${window.location.hostname}:7777/update/${boardType}/${postNo}`
        : `http://${window.location.hostname}:7777/create/${boardType}`;
      const method = postNo ? 'put' : 'post';

      const saveResponse = await axios({
        method,
        url,
        data: postData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert(postNo ? '게시물이 수정되었습니다.' : '게시물이 등록되었습니다.');
      navigate(`/${boardType}Board`);
    } catch (error) {
      console.error('게시물 저장 실패:', error);
      alert('게시물 저장에 실패했습니다.');
    }
  };
  return (
    <div className="enroll-post">
      <div className="main-div">
        <form onSubmit={handleSubmit}>
          <div className="post-content-div">
            <h2>{postNo ? '게시물 수정' : '게시물 작성'}</h2>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">제목</span>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="2글자 이상 입력해 주세요."
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <div id="summernote" dangerouslySetInnerHTML={{ __html: content }} ></div>
            </div>
            <div className="mb-3">
            {!postNo &&(
              <select
              className="form-select"
              value={boardType}
              onChange={(e)=>handleBoardTypeChange(e.target.value)}
              >
                {loginUser?.status === 'Y' && (
                <>
              <option value="enquiry">문의사항</option>
              <option value="free">자유게시판</option>
              <option value="project">프로젝트</option>
              </>
              )}
              {loginUser?.status === 'A' && (
                <>
                 <option value="enquiry">문의사항</option>
                 <option value="free">자유게시판</option>
                 <option value="project">프로젝트</option>
                <option value="announcement">공지사항</option>
                </>
              )}
              </select>
            )}
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={visibility}
                onChange={handleVisibilityChange}
              >
                <option value="Y">공개</option>
                <option value="N">비공개</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary"
            disabled={title.trim().length < 2 || content.trim().length < 2}
            >
              {postNo ? '수정하기' : '작성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollPost;
