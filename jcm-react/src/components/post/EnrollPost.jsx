import { NavLink, useNavigate } from 'react-router-dom';
import '../../css/post/EnrollPost.css';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'summernote/dist/summernote-lite.css';
import $ from 'jquery';
import 'summernote/dist/summernote-lite';

const EnrollPost = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // 이미지 상태 추가

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleSubmit = () => {
        console.log("Submitted Content: ", content);
    };

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/notice');
    };

    useEffect(() => {
        const config = {
            tabDisable: true,
            height: 300, // 에디터의 높이 설정
            width: '90%', // 에디터의 너비 설정
            disableResizeEditor: true, // 창 크기 조절 비활성화
            toolbar: [
                ["font", ["bold", "italic", "underline", "superscript"]],
                ["fontsize", ["fontsize", "fontname", "color"]],
                ["insert", ["picture"]], // 이미지 삽입 버튼 추가
            ],
            fontSizes: ["10", "12", "14", "16"],
            colors: [[["red"]], [["black"]], [["yellow"]]],
            fontSizeUnits: ["px"],
            placeholder: "내용을 입력해 주세요.",
            lang: "ko-KR",
            callbacks: {
                onChange: (contents) => {
                    setContent(contents); // Summernote 내용을 상태로 설정
                },
                onImageUpload: (files) => {
                    handleImageUpload(files[0]); // 이미지 업로드 핸들러 호출
                }
            },
        };

        $('#summernote').summernote(config);

        return () => {
            $('#summernote').summernote('destroy'); // 컴포넌트 언마운트 시 제거
        };
    }, []);
    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // 이미지 미리보기 URL 설정
            $('#summernote').summernote('insertImage', reader.result, 'uploaded image'); // 에디터에 이미지 삽입
        };
        reader.readAsDataURL(file);
    };

    const onEditorSaveHandler = () => {
        const content = $('#summernote').summernote('code');
        console.log(content);
    };
    return(
        <>
            <div className="enroll-post">
             
                <div className="menubar-div">
                     <ul>
                        <li><h2>고객 지원</h2></li>
                        <li><NavLink to="/notice">공지사항</NavLink></li>
                        <li><NavLink to="/freeBoard">자유 게시판</NavLink></li>
                        <li><NavLink to="/projectBoard">프로젝트 게시판</NavLink></li>
                        <li><NavLink to="/questions">문의사항</NavLink></li>
                    </ul>
                </div>
          
            <div class="main-div">
                <form action="">
                    <div class="post-content-div">
                        <h2>게시물 작성</h2>
                        <div class="row">
                            <div class="col">
                                <div class="mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon3">제목</span>
                                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">작성자</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" readonly/>
                                </div>
                            </div>
                        </div>
                       
                        <div class="row" >
                            <div class="col">
                                <div class="input-group mb-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>게시판을 선택해 주세요.</option>
                                        <option value="1">자유게시판</option>
                                        <option value="2">문의사항</option>
                                        <option value="3">프로젝트 게시판</option>
                                        <option value="4">공지사항</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>공개 여부</option>
                                        <option value="1">공개</option>
                                        <option value="2">비공개</option>
                                    </select>
                                </div>
                            </div>
                          </div>      
                          <div>
                                <div id="summernote"></div>
                            </div>
                          <div class="mb-3">
                            <input class="form-control" type="file" id="formFileMultiple" multiple/>
                            <div class="enroll-items">
                            <div class="enroll-btn">
                              <button class="btn btn-danger" onClick={handleBackClick} >취소</button>
                            </div>
                            <div class="enroll-btn">
                              <input class="btn btn-primary" type="submit" value="작성하기" />
                            </div>
                          </div>
                          </div> 
                          
                    </div>
                </form>
                
            </div>
        </div>
        </>
    )

}

export default EnrollPost;