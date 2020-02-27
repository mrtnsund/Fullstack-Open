import React from 'react';
import Header from './Header'
import Content from './Content'
import Sum from './Sum'

const Course = (props) => {
    const course = props.course
    return (
        <div>
            <Header text={course.name} />
            <Content course={course} />
            <Sum parts={course.parts} />
        </div>
    )
}

export default Course