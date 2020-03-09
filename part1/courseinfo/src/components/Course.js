import React from 'react';

const Header = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
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
    const total = exercisesArr.reduce((prev, curr) => {
        return  prev + curr
    })
    console.log('total is ', total);
    
    return (
        <div>
            <b>total of {total} exericse </b>
        </div>
    )
}

const CourseItem = (props) => {
    return (
        <div>
            <Header name={props.course.name}/>
            <Content parts={props.course.parts}  />
            <Total course={props.course} />
        </div>
    );
};

const Course = (props) => {
    const courseItem = props.courses.map((course) => 
        <CourseItem key={course.id} course={course} />
    )
    return (
        <div>
            {courseItem}
        </div>
    );
};

export default Course;