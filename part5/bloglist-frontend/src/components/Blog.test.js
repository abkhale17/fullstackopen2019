import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogTest from './BlogTest'
// import blogService from '../services/blogs'
// import loginService from '../services/login'

describe('<Blog />' , () => {

  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'unknown',
      url: 'mentionnot.com',
      likes: 232,
    }

    mockHandler = jest.fn()

    component = render(
      <BlogTest blog={blog} incrementLike={mockHandler} />
    )
  })

  test('render default author, title', () => {
    const defaultBlogView = component.container.querySelector('.defaultBlogView')
    expect(defaultBlogView).not.toHaveStyle('display:none')
  })

  test('doesnt renders url and likes', () => {
    const secondaryBlogView = component.container.querySelector('.secondaryBlogView')
    expect(secondaryBlogView).not.toBeInTheDocument()
  })

  test('after clicking button, renders url and likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const secondaryBlogView = component.container.querySelector('.secondaryBlogView')
    expect(secondaryBlogView).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    const buttonLike = component.getByText('Like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})