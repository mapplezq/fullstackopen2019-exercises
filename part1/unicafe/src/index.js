import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const Display = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Result = ({text, value, isPercentage=false}) => {
    if (isPercentage) {
        return (
            <div>
                <p>{text} {value} %</p>
            </div>
        )
    }

    return (
        <div>
            <p>{text} {value}</p>
        </div>
    )
}

const App = () => {
    const title = "give feedback"
    const statisticsTitle = "statistics"
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    // const [total, setTotal] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }
    const handleBadClick = () => {
        setBad(bad + 1)
    }
    

    return (
        <div>
            <Display title={title}/>
            <Button handleClick={handleGoodClick} text="good"/>
            <Button handleClick={handleNeutralClick} text="neutral"/>
            <Button handleClick={handleBadClick} text="bad"/>

            <Display title={statisticsTitle}/>
            <Result value={good} text="good"/>
            <Result value={neutral} text="neutral"/>
            <Result value={bad} text="bad"/>
            <Result value={good+neutral+bad} text="all"/>
            <Result value={(good+neutral+bad)/3} text="avaerage"/>
            <Result value={good/(good+neutral+bad)} text="positive" 
            isPercentage={true} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
