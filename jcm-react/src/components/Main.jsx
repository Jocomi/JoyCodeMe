import '../css/Main.css';
import MainPage from './mainPage/MainPage';
import Chat from './mainPage/Chat';
import MainInfo from './mainPage/MainInfo';
import MainSimulation from './mainPage/MainSimulation';
import MainReferences from './mainPage/MainReferences';
import MainDescribe from './mainPage/MainDescribe';
import MainMethod from './mainPage/MainMethod';
import MainEmail from './mainPage/MainEmail';

const Main = () => {

    return (
        <>
            <MainPage/>
            <Chat/>
            <MainInfo/>
            <MainSimulation/>
            <MainReferences/>
            <MainDescribe/>
            <MainMethod/>
            <MainEmail/>
            <hr></hr>
        </>
    );
};

export default Main;
