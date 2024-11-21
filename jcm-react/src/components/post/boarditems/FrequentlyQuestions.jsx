import { useState } from 'react';
import '../../../css/post/FrequentlyQuestions.css';

const FrequentlyQuestions = () => {
    const questions = [
        { question: "LEVEL마다 제공되는게 뭐가 다른지 정확히 알고 싶어요.", answer: "각 LEVEL마다 제공되는 기능과 혜택이 다릅니다. 자세한 정보는 고객센터에 문의하세요." },
        { question: "미리보기 부분이 나오지 않아요.", answer: "미리보기 설정이 비활성화된 경우가 있습니다. 설정을 확인하거나 고객센터에 문의하세요." },
        { question: "게시판에 글이 올라가지 않는데 왜그런가요?", answer: "게시판 이용 권한이 없거나 인터넷 연결 문제가 있을 수 있습니다. 고객센터에 문의해 주세요." },
        { question: "사용법을 잘 모르겠어요.", answer: "사용자 가이드를 참고하시거나 고객센터에 문의하시면 도움을 받으실 수 있습니다." },
        { question: "기능사용 횟수에 제한이 있나요?", answer: "LEVEL에 따라 기능 사용 횟수가 다릅니다. 고객센터에서 확인해 주세요." },
        { question: "결제를 했는데 기능 사용이 안돼요.", answer: "결제 확인이 지연되었을 수 있습니다. 고객센터에 문의하세요." },
        { question: "환불을 하고 싶은데 환불은 어떻게 하나요?", answer: "환불 절차는 고객센터에서 안내해 드립니다. 문의해 주세요." }
    ];
      // 현재 열려 있는 질문의 인덱스를 저장하는 상태 설정
      const [openIndex, setOpenIndex] = useState(null);

      // 클릭 시 답변을 열거나 닫는 함수
      const toggleAnswer = (index) => {
          setOpenIndex(openIndex === index ? null : index);
      };
    return (

        <div className="questions-div">
            <h3 className="questions-left">자주 묻는 질문을 확인하세요!</h3>
            <div className="questions-right">
            <ol>
                    {questions.map((item, index) => (
                        <li key={index} className="question-item" onClick={() => toggleAnswer(index)}>
                            {item.question}
                            {openIndex === index && (
                                <div className={`answer ${openIndex === index ? "answer-open" : ""}`}>
                                    {item.answer}
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </div>

    );
};

export default FrequentlyQuestions;
