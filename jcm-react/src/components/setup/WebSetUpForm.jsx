import React from 'react';
import '../../css/setup/WebSetUpForm.css';

const WebSetUpForm = () => {
    return (
        <div className="websetupform-container">
            <header className="websetupform-header">
                <div className="logo">Jocomi</div>
                <button className="consultation-button">Free Consultation</button>
            </header>

            <main className="content-area">
                <h1 className="setup-title">Welcome to Jocomi's Website Builder</h1>
                <p className="setup-description">Create a customized, professional website with just a few steps. Fill in the details below to start setting up your online presence.</p>

                <div className="section-title">Step 1: Add html</div>
                <div className="placeholder large"></div>

                <div className="section-title">Step 2: Add css</div>
                <div className="placeholder large"></div>

                <div className="section-title">Step 3: Add js</div>
                <div className="placeholder large"></div>

                <p className="final-note">Once you've filled out the information, our team will guide you through the remaining steps to launch your site.</p>
            </main>
        </div>
    );
}

export default WebSetUpForm;
