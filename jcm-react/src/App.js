import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MenuBar from './components/common/MenuBar';
import MainPage from './components/Main';
import Footer from './components/common/FooterPage';
import MyPage from './components/User/MyPage';
import SignIn from './components/User/SignIn';
import EditProfile from './components/User/EditProfile';
import ChangePwd from './components/User/ChangePwd';
import CompIntroduce from './components/CompIntroduce';
import PostPage from './components/post/PostPage';


function App() {
  return (
    <BrowserRouter>

      <MenuBar />

      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/ChangePwd" element={<ChangePwd />} />

          <Route path="/Introduce" element={<CompIntroduce />} />
          <Route path="/Support" element={<PostPage />} />
        </Routes>
      </main>
          
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
