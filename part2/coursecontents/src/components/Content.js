import React from 'react'
import Part from './Part'

const Content = ( {course} ) => 
        course.parts.map(courseContent =>
            <Part 
                name={courseContent.name} 
                exercises={courseContent.exercises} 
                key={courseContent.id}
            />
        )
export default Content
