import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/post/PostMenu.css';

const PostMenu = () => {
    return (
        <div className="menubar-div">
            <ul>
                <li><h2>고객 지원</h2></li>
                <li><NavLink to="/notice">공지사항</NavLink></li>
                <li><NavLink to="/freeBoard">자유 게시판</NavLink></li>
                <li><NavLink to="/projectBoard">프로젝트 게시판</NavLink></li>
                <li><NavLink to="/questions">문의사항</NavLink></li>
            </ul>
        </div>
    );
};

export default PostMenu;