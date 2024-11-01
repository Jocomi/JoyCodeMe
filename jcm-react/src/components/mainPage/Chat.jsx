import React, { useEffect } from 'react';

const Chat = () => {

    useEffect(() => {
        const chatBody = document.getElementById('chatBody');

        const handleWheel = (event) => {
            const isScrollingDown = event.deltaY > 0;
            const isAtBottom = chatBody.scrollTop + chatBody.clientHeight >= chatBody.scrollHeight;
            const isAtTop = chatBody.scrollTop === 0;

            // 스크롤이 맨 위 또는 맨 아래에 도달하면 메인 페이지로의 스크롤 전파 차단
            if ((isScrollingDown && isAtBottom) || (!isScrollingDown && isAtTop)) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // 채팅창 내부에서 스크롤이 작동하도록 설정
                chatBody.scrollTop += event.deltaY;
                event.preventDefault();
                event.stopPropagation();
            }
        };

        chatBody.addEventListener('wheel', handleWheel);
        const chatInput = document.getElementById('chatInput');
        chatInput.addEventListener('keydown', checkEnterKey);

        // 클린업 함수에서 동일한 handleWheel 참조 제거
        return () => {
            chatBody.removeEventListener('wheel', handleWheel);
            chatInput.removeEventListener('keydown', checkEnterKey);
        };
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
            event.preventDefault();
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
                <div className="chat-popup-body" id="chatBody" style={{ overflowY: 'auto', maxHeight: '300px' }}></div>
                <div className="chat-popup-footer">
                    <input type="text" id="chatInput" placeholder="메시지를 입력하세요" />
                    <button onClick={() => sendMessage()}>전송</button>
                </div>
            </div>
        </>
    );
}

export default Chat;
