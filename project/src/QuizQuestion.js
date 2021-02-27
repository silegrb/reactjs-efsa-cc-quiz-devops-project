import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import QuizAnswer from "./QuizAnswer";

const QuizQuestion = ({isCentered = false, title, answers, correctAnswer, handleNext, increaseScore}) => {

    const [freeze, setFreeze] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    useEffect(() => {
        setFreeze(false);
        setShuffledAnswers([...shuffleArray(answers)]);
    }, [title]);

    const shuffleArray = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    return <Container className="quiz-question p-5">
        <Row>
            <Col xs={12} className={`quiz-question-title ${isCentered ? 'text-center' : 'pb-4'}`}>
                {title}
            </Col>
        </Row>
        <Row>
            {shuffledAnswers.map((answer,index) => <Col
                key={index}
                xs={{offset: 1, size: 10}} className={index < answers.length - 1 ? "pb-4" : ""}
            >
                <QuizAnswer
                    freeze={freeze}
                    freezeQuestion={() => setFreeze(true)}
                    answerText={answer}
                    handleAnswer={() => {
                    if(answer === correctAnswer) increaseScore();
                    handleNext();
                }}
                    isCorrect={answer === correctAnswer}
                />
            </Col>)}
        </Row>
    </Container>
};

export default QuizQuestion;