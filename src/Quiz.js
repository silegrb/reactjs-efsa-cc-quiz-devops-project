import React, {useState, useEffect} from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import {getQuestions} from "./client/questions";
import Loader from "react-loader-spinner";
import QuizQuestion from "./QuizQuestion";

const Quiz = () => {

    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const handleRestart = async () => {
        setScore(0);
        setLoading(true);
        const {data} = await getQuestions();
        setQuestions([
                ...data.results.map((result, index) => (
                        {
                            ...result,
                            id: index,
                            question: result.question.replaceAll("&quot;", "\"").replaceAll("&#039;", "'"),
                            incorrect_answers: result.incorrect_answers.map(incorrect_answer =>
                                incorrect_answer.replaceAll("&quot;", "\"").replaceAll("&#039;", "'")
                            )
                        }
                    )
                )
            ]
        );
        setLoading(false);
    }

    const handleNextQuestion = () => {
        setCurrentQuestion(questions.find(({id}) => currentQuestion.id +1 === id));
    }

    const handleIncreaseScore = () => {
        setScore(score + 10);
    }

    const previewCurrentQuestion = () => currentQuestion ?
        <QuizQuestion
            title={currentQuestion.question}
            answers={[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]}
            correctAnswer={currentQuestion.correct_answer}
            handleNext={handleNextQuestion}
            increaseScore={handleIncreaseScore}
        /> :
        <div className="mt-3">
            <QuizQuestion
                isCentered
                title={`Your score is ${score}/${questions.length * 10}!`}
                answers={[]}
            />
        </div>;

    useEffect(() => {
        (async () => {
            setLoading(true);
            const {data} = await getQuestions();
            setQuestions([
                ...data.results.map((result, index) => (
                    {
                        ...result,
                        id: index,
                        question: result.question.replaceAll("&quot;", "\"").replaceAll("&#039;", "'"),
                        incorrect_answers: result.incorrect_answers.map(incorrect_answer =>
                            incorrect_answer.replaceAll("&quot;", "\"").replaceAll("&#039;", "'")
                        )
                    }
                    )
                )
            ]
            );
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if(questions.length) {
            setCurrentQuestion(questions[0]);
        }
    }, [questions]);

    return <div className="quiz">
        <Row>
            <Col xs={12} className="d-flex justify-content-center quiz-title">
                Upravljanje IT Projektima 2021 - Quiz
            </Col>
        </Row>
        <Row>
            {loading ? <Col xs={12} className="d-flex justify-content-center pt-5">
                <Loader
                    type="BallTriangle"
                    color="#FFFFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            </Col> :
                <>
                {currentQuestion && <Col xs={12} className="d-flex justify-content-center text-white mt-3 mb-1">
                        Question {currentQuestion.id + 1}/{questions.length}
                    </Col>}
                    <Col xs={12} className="d-flex justify-content-center">
                        {previewCurrentQuestion()}
                    </Col>
                {currentQuestion && <Col xs={12} className="d-flex justify-content-center pt-3">
                        <div className="w-500 d-flex justify-content-end">
                            <Button className="skip-button" onClick={handleNextQuestion}>Skip</Button>
                        </div>
                    </Col>}
                    {!currentQuestion && <Col xs={12} className="d-flex justify-content-center pt-3">
                            <Button className="skip-button" onClick={handleRestart}>Redo</Button>
                    </Col>}
                </>
            }
        </Row>
    </div>
};

export default Quiz;