import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const user = {
        username: 'mrtnsund'
    }
    
    const blog = {
        title: 'Mortens testebok',
        author: 'Morten Sund',
        user
    }

    const component = render(
        <Blog blog={blog} user={user}/>
    )

    expect(component.container).toHaveTextContent(
        'Mortens testebok'
    )
    expect(component.container).toHaveTextContent(
        'Morten Sund'
    )
})