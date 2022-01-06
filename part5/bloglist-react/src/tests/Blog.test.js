import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component
  const data = {
    title: 'testTitle',
    author: 'eljojos',
    user: { name: 'Sergio' },
    url: 'hola.com',
    likes: 50
  }

  const mockCallback = jest.fn()

  beforeEach(() => {
    mockCallback.mockClear()
    component = render(
      <Blog blog={data} blogs={[]} setBlogs={mockCallback} addLike={mockCallback} />
    )
  })

  test('Blog name and author are rendered but not the other info', () => {
    const info = component.container.querySelector('.blogWrapped')
    expect(info).toHaveTextContent('testTitle')
    expect(info).toHaveTextContent('eljojos')
  })

  test('Blog details are shown when clicked', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const data = component.container.querySelector('.blogUnwrapped')
    expect(data).toHaveTextContent('hola.com')
    expect(data).toHaveTextContent('50')
  })

  test('Clicking twice the like button triggers the function two times', () => {

    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockCallback.mock.calls).toHaveLength(2)
  })
})
