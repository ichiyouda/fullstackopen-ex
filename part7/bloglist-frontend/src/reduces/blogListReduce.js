import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const initialState = []

const blogListSlice = createSlice({
  name: 'blogList',
  initialState,
  reducers: {
    setBlogList(state, action) {
      state = action.payload
      state.sort((a, b) => a.likes < b.likes)
      return state
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    addLike(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload ? blog : { ...blog, likes: blog.likes + 1 }
      )
    },
  },
})

const { setBlogList, addBlog, deleteBlog, addLike } = blogListSlice.actions

export const initBlogList = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogList(blogs))
  }
}

export const createNew = (blog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.add(blog)
    dispatch(addBlog(savedBlog))
  }
}

export const removeBy = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBy(id)
      dispatch(deleteBlog(id))
    } catch (error) {
      console.error(error.response.data.error)
    }
  }
}

export const handleBlogLike = ({ id, title, author, url, user, likes }) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.update(id, {
        title,
        author,
        url,
        likes: likes + 1,
        user: user.id,
      })
      dispatch(addLike(savedBlog.id))
    } catch (err) {
      console.error(err)
    }
  }
}

export default blogListSlice.reducer
