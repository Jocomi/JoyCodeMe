import { NavLink } from 'react-router-dom';
import '../../css/post/EnrollPost.css';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EnrollPost = () => {
    const [content, setContent] = useState('');

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleSubmit = () => {
        // 작성된 내용을 서버에 제출하거나 다른 작업을 수행
        console.log("Submitted Content: ", content);
    };

    return(
        <>
            <div className="enroll-post">
             
                <div className="menubar-div">
                     <ul>
                        <li><h2>고객 지원</h2></li>
                        <li><NavLink to="/support/notice">공지사항</NavLink></li>
                        <li><NavLink to="/support/freeBoard">자유 게시판</NavLink></li>
                        <li><NavLink to="/support/projectBoard">프로젝트 게시판</NavLink></li>
                        <li><NavLink to="/support/questions">문의사항</NavLink></li>
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
                          <div class="input-group">
                          <ReactQuill className='react-quill' value={content} onChange={handleContentChange} />
                          </div>
                          <div class="mb-3">
                            <input class="form-control" type="file" id="formFileMultiple" multiple/>
                            <div class="enroll-items">
                            <div class="enroll-btn">
                              <input class="btn btn-danger" type="submit" value="취소" />
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