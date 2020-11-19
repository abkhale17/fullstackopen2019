import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('< BlogForm />', () => {
  test('Form submit on onSubmit fire event', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const likes = component.container.querySelector('#likes')
    const form = component.container.querySelector('#form')

    fireEvent.change(title, {
      target : { value : 'Better call saul' }
    })
    fireEvent.change(author, {
      target : { value : 'Peter Gould and Vincent Gilligan' }
    })
    fireEvent.change(url, {
      target : { value : '2ndbestlawyer.com' }
    })
    fireEvent.change(likes, {
      target : { value : 213123 }
    })

    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
  })
})