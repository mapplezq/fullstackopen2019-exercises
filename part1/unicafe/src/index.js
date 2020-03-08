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

const Button = ({handleGoodClick,handleNeutralClick,handleBadClick}) => {
    return (
        <div>
            <button onClick={handleGoodClick}>
                good
            </button>
            <button onClick={handleNeutralClick}>
                neutral
            </button>
            <button onClick={handleBadClick}>
                bad
            </button>
        </div>
    )
}

const Statistic = ({text, value, isPercentage=false}) => {
    if (isPercentage) {
        return (
            <tr>
                <td>{text}</td>
                <td>{value} %</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const title = "statistics"
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    if (good > 0 | neutral > 0 | bad > 0) {
        return (
            <div>
                <Display title={title}/>
                <table>
                    <Statistic value={good} text="good"/>
                    <Statistic value={neutral} text="neutral"/>
                    <Statistic value={bad} text="bad"/>
                    <Statistic value={good+neutral+bad} text="all"/>
                    <Statistic value={(good+neutral+bad)/3} text="avaerage"/>
                    <Statistic value={good/(good+neutral+bad)} text="positive" 
                    isPercentage={true} />
                </table>
                
            </div>
        )
    }
    
    return (
        <div>
            <p>No feedback given</p>
        </div>
    )
}

const App = () => {
    const title = "give feedback"
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
            <Button handleGoodClick={handleGoodClick} 
            handleNeutralClick={handleNeutralClick} 
            handleBadClick={handleBadClick}/>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
