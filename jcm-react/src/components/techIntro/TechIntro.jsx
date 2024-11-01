import React from 'react';
import { FaDatabase, FaTools, FaCogs, FaProjectDiagram, FaCode, FaCube } from 'react-icons/fa';
import '../../css/techIntro/TechIntro.css';

const TechIntro = () => {
    return (
        <div className="tech-intro-container">
            <section className="intro-section">
                <h1>A Query Language for Your API</h1>
                <p>
                    GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, giving clients the power to ask for exactly what they need and nothing more, enabling powerful developer tools.
                </p>
            </section>

            <section className="feature-section">
                <div className="feature-card">
                    <FaDatabase className="feature-icon" />
                    <h2>Ask for what you need, get exactly that</h2>
                    <p>Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries return predictable results.</p>
                    <img src="/img/techIntro1.png" alt="Query example" />
                </div>

                <div className="feature-card">
                    <FaCogs className="feature-icon" />
                    <h2>Get many resources in a single request</h2>
                    <p>GraphQL queries access not just one resource but also follow references between them, reducing the need for multiple requests.</p>
                    <img src="/img/techIntro2.jpg" alt="GraphQL single request" />
                </div>

                <div className="feature-card">
                    <FaCode className="feature-icon" />
                    <h2>Describe what's possible with a type system</h2>
                    <p>GraphQL APIs are organized in types and fields, not endpoints. Access your data's full capabilities from a single endpoint.</p>
                    <img src="/img/techIntro3.jpg" alt="GraphQL type system" />
                </div>

                <div className="feature-card">
                    <FaTools className="feature-icon" />
                    <h2>Move faster with powerful developer tools</h2>
                    <p>GraphQL provides powerful tools to help you build fast and predictable APIs without leaving your editor.</p>
                    <img src="/img/techIntro4.png" alt="Developer tools" />
                </div>

                <div className="feature-card">
                    <FaProjectDiagram className="feature-icon" />
                    <h2>Evolve your API without versions</h2>
                    <p>GraphQL APIs can be modified without impacting existing queries, allowing continuous feature additions.</p>
                    <img src="/img/techIntro5.png" alt="API evolution" />
                </div>

                <div className="feature-card">
                    <FaCube className="feature-icon" />
                    <h2>Bring your own data and code</h2>
                    <p>GraphQL allows you to create a uniform API across your entire application, regardless of storage engine.</p>
                    <img src="/img/techIntro6.png" alt="Data and code integration" />
                </div>
            </section>
        </div>
    );
};

export default TechIntro;
