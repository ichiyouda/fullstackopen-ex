import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import BlogForm from './BlogFrom'

describe('<Blog />', () => {

  let container
  let handleLike
  let removeBlog

  beforeEach(() => {
    handleLike = jest.fn()
    removeBlog = jest.fn()
    const blog = {
      title: 'test0',
      author: 'yao',
      url: 'example.com',
      likes: 10,
      user: { username: 'yao' }
    }
    const user = { username: 'yao' }
    container = render(<Blog
      blog={blog}
      user={user}
      handlelike={handleLike}
      removeBlog={removeBlog} />).container
  })


  test('blog in a view', () => {
    const view = container.querySelector('.view')
    expect(view).not.toHaveStyle('display: none')
    expect(view).toHaveTextContent('test0 yao')
    expect(view).not.toHaveTextContent('example.com')
    expect(view).not.toHaveTextContent('10')
  })


  test('click the view button', async () => {
    const user = userEvent.setup()
    const viewButton = container.querySelector('.viewButton')
    await user.click(viewButton)

    const hide = container.querySelector('.hide')
    expect(hide).not.toHaveStyle('display: none')
  })


  test('click like botton twice', async () => {
    const user = userEvent.setup()
    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)

    setTimeout(async () => {
      await user.click(likeButton)
      expect(handleLike.mock.calls).toHaveLength(2)
    }, 500)
  })
})


describe('<BlogForm />', () => {
  test('check right details of the blogForm', async () => {
    const createBlog = jest.fn()
    const container = render(<BlogForm createBlog={createBlog} />).container
    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')

    const user = userEvent.setup()
    screen.debug(title)
    user.type(title, 'hi')
    screen.debug(title)  // strange, not change

    user.type(author, 'lol')
    user.type(url, 'ww')

    const submitButton = container.querySelector('.submit')
    user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].content).toBe('hi')
  })
})
