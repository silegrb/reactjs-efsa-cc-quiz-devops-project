import React, {useState} from 'react';
import {Col, Container, Row} from "reactstrap";

const QuizAnswer = ({freezeQuestion, freeze, isCorrect, answerText,handleAnswer}) => {
    const [status, setStatus] = useState('');

    const handleClick = () => {
        if(freeze) return;
        freezeQuestion();
        if(isCorrect) setStatus('quiz-answer-correct');
        else setStatus('quiz-answer-incorrect');
        setTimeout(() => {
            handleAnswer();
            setStatus('');
        }, 1500);
    }
    return <div className={`quiz-answer w-100 p-2 ${status}`} onClick={handleClick}>
        <Row className="w-100">
            <Col className="quiz-answer-text" xs={12}>{answerText}</Col>
        </Row>
    </div>
};

export default QuizAnswer;