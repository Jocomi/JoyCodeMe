import '../css/Main.css';
import React, { useState } from "react";
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

    const [initialActiveSection, setInitialActiveSection] = useState(null);
  const onScroll = (p) => {
    if (initialActiveSection === null) setInitialActiveSection(p.activeSection);
    };

    let options = {
        scrollCallback: onScroll,
        sectionClassName: "section",
        anchors: ['home', 'info', 'simulation','references','describe','method','email'],
        scrollBar: false,
        navigation: true,
        verticalAlign: false,
        arrowNavigation: true,
      };
      

    return (
        <>
            <Chat/>
            <SectionsContainer {...options} activeSection={initialActiveSection}>
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
