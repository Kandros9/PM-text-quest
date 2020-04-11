import React, {useState} from 'react';
import './App.css';
import {Button, Segment, Statistic, Transition} from "semantic-ui-react";
import './styles.scss'
import {q1} from "./store";
import {test} from "./tools";


function App() {
    const [parameters, setParameters] = useState({quality: 0, time: 0, money: 0});
    const [parametersDifference, setParametersDifference] = useState({qD: 0, tD: 0, mD: 0});
    const [currentQuestion, setCurrentQuestion] = useState(q1);
    const [endGame, setEndGame] = useState(false);
    const [result, setResult] = useState({quality: 0, won: false});

    const handleClickAnswer = id => {
        let answer = currentQuestion.answers.find(answer => {
            return answer.id === id;
        });
        let [nextQuestion, quality, money, time] = test(answer, parameters.quality, parameters.money, parameters.time);
        setParametersDifference({
            qD: quality - parameters.quality,
            tD: time - parameters.time,
            mD: money - parameters.money
        });
        setParameters({quality: quality, money: money, time: time})
        if (nextQuestion) {
            setCurrentQuestion(nextQuestion);
        } else {
            setResult({quality: Math.round(quality / 234 * 100), won: time > 0 && money > 0});
            setEndGame(true)
        }
    };

    const parametersList = [
        {
            value: parameters.quality,
            difference: parametersDifference.qD,
            label: "Качество",
        },
        {
            value: parameters.time,
            difference: parametersDifference.tD,
            label: "Время",
        },
        {
            value: parameters.money,
            difference: parametersDifference.mD,
            label: "Деньги",
        },
    ].map((parameter) => <Statistic key={parameter.label}>
        <Statistic.Value>{parameter.value} <span
            className={parameter.difference > 0 ? "parameter-green" : "parameter-red"}>
                {parameter.difference > 0 && '+'}{parameter.difference !== 0 && parameter.difference}</span>
        </Statistic.Value>
        <Statistic.Label>{parameter.label}</Statistic.Label>
    </Statistic>);

    const answersList = currentQuestion.answers.map(
        answer => <Segment className="answer-item" id={answer.id} key={answer.id}
                           onClick={e => handleClickAnswer(answer.id)}>{answer.text}</Segment>
    );
    return (
        <div className="wrapper-segment">
            {!endGame && <Segment.Group className="main-segment">
                <Segment className="rating">
                    <Statistic.Group size='mini'>
                        {parametersList}
                    </Statistic.Group>
                </Segment>
                <Segment className="question">
                    <h3>{currentQuestion.text}</h3>
                </Segment>
                <Segment.Group>
                    {answersList}
                </Segment.Group>
            </Segment.Group>}
            <Transition visible={endGame} animation='scale' duration={800}>
                <div>
                    <h1>Игра закончилась! Ваш проект {result.won ? "успешен!" : "потерпел неудачу"}</h1>
                    <div className="result">
                        <h3>Качество: {result.quality}%</h3>
                        <h3>Время: {parameters.time} нед. {parameters.time < 0 && "(не успели по времени)"}</h3>
                        <h3>Деньги: {parameters.money.toFixed(2)} тыс. {parameters.money < 0 && "(не хватило денег)"}</h3>
                    </div>
                </div>
            </Transition>
        </div>
    );
}

export default App;
