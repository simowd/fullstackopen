import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from '../components/NewBlogForm'

describe('<NewBlogForm />', () => {
  let component
  const mockCallback = jest.fn()

  beforeEach(() => {
    mockCallback.mockClear()
    component = render(
      <NewBlogForm />
    )
  })

  test('The form calls the handler when submitting', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Title' }
    })
    fireEvent.change(author, {
      target: { value: 'author' }
    })
    fireEvent.change(url, {
      target: { value: 'url' }
    })

    fireEvent.submit(form)
    expect(title).toHaveTextContent('')
    expect(author).toHaveTextContent('')
    expect(url).toHaveTextContent('')
  })
})