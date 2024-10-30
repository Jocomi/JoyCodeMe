import '../css/Main.css';
import MainPage from './mainPage/MainPage';
import Chat from './mainPage/Chat';
import MainInfo from './mainPage/MainInfo';
import MainSimulation from './mainPage/MainSimulation';
import MainReferences from './mainPage/MainReferences';
import MainDescribe from './mainPage/MainDescribe';
import MainMethod from './mainPage/MainMethod';
import MainEmail from './mainPage/MainEmail';

import {SectionsContainer, Section} from 'react-fullpage';
import FooterPage from './common/FooterPage';



const Main = () => {

    let options = {
        anchors: ['sectionOne', 'sectionTwo', 'sectionThree','sectionFour','sectionFive','sectionSix','sectionSeven'],
      };

    return (
        <>
            <Chat/>
            <SectionsContainer {...options}>
            <Section>
                <MainPage/>
            </Section>
            <Section>
                <MainInfo/>
            </Section>
            <Section>
                <MainSimulation/>
            </Section>
            <Section>
                <MainReferences/>
            </Section>
            <Section>
                <MainDescribe/>
            </Section>
            <Section>
                <MainMethod/>
            </Section>
            <Section>
                <MainEmail/>
                <FooterPage/>
            </Section>
            </SectionsContainer>
            <hr></hr>
            
        </>
    );
};

export default Main;
