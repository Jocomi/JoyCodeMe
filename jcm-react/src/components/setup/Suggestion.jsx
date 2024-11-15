import '../../css/setup/Suggestion.css';

const Suggestions = () => {

  
      return (
        <div className="suggestion-container">
        <section className="suggestion-section">
            <h1>Suggestions For Your Request</h1>
            <p>
            JCM provides optimized AI coding capabilities. Use our program for a more complete project. See how JCM writes code and complete a more complete project. We will provide the best experience in the production of your project.
            </p>
        </section>

        <section className="feature-section">
            <div className="feature-video-card">
                <h2>ASK FOR DETAILS, ADD COMPONENTS</h2>
                <video src="/resources/webSuggestion.mp4" muted autoPlay playsInline loop></video>
            </div>

            <div className="feature-card">
                <h2>Request details, Get details</h2>
                <p><b>When you request a webpage creation, fill in as much detail as possible. The more you type, the more complete the project is. If you don't like the project, add a request and run it again. If you specify the components you want to add, you will complete the page you like more!</b></p>
                <h3>Environments and Tools</h3>
                <p>
                    Language : HTML/CSS/JS<br/>
                    Recommend Tools : VScode
                </p>
            </div>

            <div className="feature-card">
                <h2>Describe Function, get Function</h2>
                <p><b>Ask for details of the features you want to implement. Write down the full and detailed features. And just clip the result.<br/>
                The location of each code is written at the beginning of the code. Simply copy and paste it into the corresponding path! It is not difficult to implement features using JCM!</b></p>
                <h3>Environments and Tools</h3>
                <p>
                    Language : Java<br/>
                    Framework : spring-framework<br/>
                    Recommend Tools : eclipes
                </p>
            </div>

            <div className="feature-video-card">
                <h2>DESCRIBE WHAT YOU NEED</h2>
                <video src="/resources/functionSuggestion.mp4" muted autoPlay playsInline loop></video>
            </div>

            <div className="feature-video-card">
                <h2>REQUEST DETAIL TABLES, COLUMNS</h2>
                <video src="/resources/databaseSuggestion.mp4" muted autoPlay playsInline loop></video>
            </div>

            <div className="feature-card">
                <h2>Write DataBase, get DataBase</h2>
                <p><b>Ask for the database you want to create. It can also be created automatically, and you can specify the required tables and columns. It can be designed flexibly according to the Entity Relationship Diagram, Company request, or even your imagination . More and more DataBase experiences will be provided!</b></p>
                <h3>Environments and Tools</h3>
                <p>
                    DataBase : Oracle<br/>
                    Recommend Tools : SqlDeveloper
                </p>
            </div>
        </section>
    </div>
      );
  };
  
  export default Suggestions;
  