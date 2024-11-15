import React from 'react';
import { FaDatabase, FaTools, FaCogs, FaProjectDiagram, FaCode, FaCube } from 'react-icons/fa';
import '../../css/techIntro/TechIntro.css';

const TechIntro = () => {
    return (
        <div className="tech-intro-container">
            <section className="intro-section">
                <h1>Code creation via API</h1>
                <p>
                JCM is a coding program using API and a developer tool that provides an easy-to-understand and easy-to-write function to create the desired project on the website so that users can do the exact fairy faster and more comfortably.
                </p>
            </section>

            <section className="feature-section">
                <div className="feature-card">
                    <FaDatabase className="feature-icon" />
                    <h2>Ask for what you need, get exactly that</h2>
                    <p>You can get exactly what you need by typing your requests into the API. JCM doesn't invest long hours and returns accurate results.</p>
                    <img src="/img/techIntro1.png" alt="Query example" />
                </div>

                <div className="feature-card">
                    <FaCogs className="feature-icon" />
                    <h2>Get full codes in a single request</h2>
                    <p>JCM not only returns the entire code with a single request, but also provides all the files needed for functionality, reducing the need for multiple requests.</p>
                    <img src="/img/techIntro2.jpg" alt="GraphQL single request" />
                </div>

                <div className="feature-card">
                    <FaCode className="feature-icon" />
                    <h2>Experience the possibilities with integrated code implementation!</h2>
                    <p>JCM not only consists of a single language, but also multiple languages and functions. Access and process your data more comfortably.</p>
                    <img src="/img/techIntro3.jpg" alt="GraphQL type system" />
                </div>

                <div className="feature-card">
                    <FaTools className="feature-icon" />
                    <h2>Move faster with powerful developer tools</h2>
                    <p>JCM helps you use fast and predictable code using your existing tools.</p>
                    <img src="/img/techIntro4.png" alt="Developer tools" />
                </div>

                <div className="feature-card">
                    <FaProjectDiagram className="feature-icon" />
                    <h2>Experience continuous development of AI.</h2>
                    <p>The AI API, which updates automatically, always allows you to use the upgraded AI's code.</p>
                    <img src="/img/techIntro5.png" alt="API evolution" />
                </div>

                <div className="feature-card">
                    <FaCube className="feature-icon" />
                    <h2>Bulid your own data and code</h2>
                    <p>Use JCM to create your own differentiated code, and implement your project!</p>
                    <img src="/img/techIntro6.png" alt="Data and code integration" />
                </div>
            </section>
        </div>
    );
};

export default TechIntro;
