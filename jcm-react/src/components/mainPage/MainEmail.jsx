import React, { useState } from 'react';

const MainEmail =() => {

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        industry: '',
        message: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // EmailJS에 보내는 데이터 객체
        const data = {
          service_id: process.env.REACT_APP_MAIL_SERVICE_ID,
          template_id: process.env.REACT_APP_MAIL_TEMPLATE_ID,
          user_id: process.env.REACT_APP_MAIL_USER_ID,
          template_params: {
            name: formData.name,
            role: formData.role,
            email: formData.email,
            industry: formData.industry,
            message: formData.message
          }
        };
    
        try {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
        
            const responseText = await response.text();  // 응답을 텍스트로 받아보기
            
            // 응답이 JSON 형식이 아니면 텍스트 응답을 그대로 처리
            if (response.ok) {
              window.location.reload();
              alert('Your mail is sent!');
            } else {
              console.error('Error:', responseText);  // 에러 응답 내용 출력
              alert('Oops... ' + responseText);
            }
          } catch (error) {
            alert('Error sending email: ' + error);
          }

        };

    return (
        <div className="main-email"> 
            <form className="box" onSubmit={handleSubmit}>
                <div className="text">
                    <p className="title">Contect Us</p>
                    Fill the form and send Email to discuss how<br/>
                    we can help you achieve successful project!
                </div>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
                <input type="text" name="role" placeholder="Your Role" value={formData.role} onChange={handleChange} required/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
                <input type="text" name="industry" placeholder="Company" value={formData.industry} onChange={handleChange} required/>
                <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                <button type="submit">Let's meet us ▶▶</button>
            </form>
        </div>
    )
}
export default MainEmail;