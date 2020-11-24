import React from 'react'
import { useField } from '../hooks/index'

const CreateNew  = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const reset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
    content.value = ''
    author.value = ''
    info.value = ''
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={reset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew