import PropTypes from 'prop-types'

const inputForBlog = (val, setVal) => (
  <input
    type="text"
    value={val}
    name={val}
    onChange={({ target }) => setVal(target.value)}
  />
)

const BlogForm = ({
  handleSubmit,
  setTitle,
  setAuthor,
  setUrl,
  title,
  author,
  url
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          title:
          {inputForBlog(title, setTitle)}
        </div>
        <div>
          author:
          {inputForBlog(author, setAuthor)}
        </div>
        <div>
          url:
          {inputForBlog(url, setUrl)}
        </div>
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm