import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    const part = props.parts.map(part => 
        <Part key={part.name} name={part.name} exercises={part.exercises}/>
    )
    return (
        <div>
            {part}
        </div>
    )
}

const Total = (props) => {
    const exercisesArr = props.course.parts.map(part => {
        return part.exercises;
    })
    const total = exercisesArr.reduce((prev, curr) => prev + curr)
    console.log('total is ', total);
    
    return (
        <div>
            <p>total of {total} exericse </p>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name}/>
            <Content parts={props.course.parts}  />
        </div>
    )
}

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of a component",
                exercises: 14
            },
            {
                name: "Redux",
                exercises: 11
            }
        ]
    }
    

    return (
        <div>
            <Course course={course} />
            <Total course={course} />
        </div>
    )

}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
