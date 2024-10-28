import React, { useEffect } from 'react';

const Chat = () => {

    useEffect(() => {

        // 이벤트 리스너 추가
        document.getElementById('chatBody').addEventListener('wheel', function(event) {
            const chatBody = document.getElementById('chatBody');
            if ((event.deltaY > 0 && chatBody.scrollTop + chatBody.clientHeight >= chatBody.scrollHeight) ||
                (event.deltaY < 0 && chatBody.scrollTop <= 0)) {
                event.preventDefault();
            }
        });

        document.getElementById('chatInput').addEventListener('keydown', checkEnterKey);

    }, []);

    function toggleChatPopup() {
        const chatPopup = document.getElementById('chatPopup');
        chatPopup.style.display = chatPopup.style.display === 'none' || chatPopup.style.display === '' ? 'block' : 'none';
    }

    function sendMessage() {
        const input = document.getElementById('chatInput');
        const chatBody = document.getElementById('chatBody');
        const message = input.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            messageElement.textContent = message;
            chatBody.appendChild(messageElement);
            chatBody.scrollTop = chatBody.scrollHeight;
            input.value = '';
        }
    }

    function checkEnterKey(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <>         
            <div className="chat-icon" onClick={() => toggleChatPopup()}>💬</div>
            <div className="chat-popup" id="chatPopup">
                <div className="chat-popup-header">
                    <span>채팅</span>
                    <button className="close-btn" onClick={() => toggleChatPopup()}>×</button>
                </div>
                <div className="chat-popup-body" id="chatBody"></div>
                <div className="chat-popup-footer">
                    <input type="text" id="chatInput" placeholder="메시지를 입력하세요" />
                    <button onClick={() => sendMessage()}>전송</button>
                </div>
            </div>
        </>
    )
}
export default Chat;