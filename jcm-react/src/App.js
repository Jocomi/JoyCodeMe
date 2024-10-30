
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MenuBar from './components/common/MenuBar';
import Main from './components/Main';
import Footer from './components/common/FooterPage';
import MyPage from './components/user/MyPage';
import SignIn from './components/user/SignIn';
import EditProfile from './components/user/EditProfile';
import ChangePwd from './components/user/ChangePwd';
import CompIntroduce from './components/CompIntroduce';
import PostPage from './components/post/PostPage';
import FreeBoard from './components/post/FreeBoard';
import ProjectBoard from './components/post/ProjectBoard';
import Questions from './components/post/Questions';
import Notice from './components/post/Notice';
import FrequentlyQuestions from './components/post/FrequentlyQuestions';
import AdminDashboard from './components/admin/AdminDashboard';
import Subscribe from './components/admin/Subscribe';
import Customer from './components/admin/Customer';
import Posts from './components/admin/Posts';
import AdminChat from './components/admin/AdminChat';
import QnA from './components/admin/QnA';

function App() {
  return (
    <BrowserRouter>

      <MenuBar />

      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/ChangePwd" element={<ChangePwd />} />

          <Route path="/Introduce" element={<CompIntroduce />} />       
          <Route path="/Support" element={<PostPage />} />
          <Route path="/Support/Notice" element={<Notice />} />
          <Route path="/Support/FreeBoard" element={<FreeBoard />} />
          <Route path="/Support/ProjectBoard" element={<ProjectBoard />} />
          <Route path="/Support/Questions" element={<Questions />} />
          <Route path='/FrequentlyQuestions' element={<FrequentlyQuestions/>} />
          <Route path="/Admin/AdminDashboard" element={<AdminDashboard/>} />
          <Route path='/Admin/subscribe' element={<Subscribe/>}/>
          <Route path='/Admin/Customer' element={<Customer/>}/>
          <Route path='/Admin/Posts' element={<Posts/>} />
          <Route path='/Admin/AdminChat' element={<AdminChat/>} />
          <Route path='/Admin/QnA' element={<QnA/>}/>
        </Routes>
      </main>
          
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
