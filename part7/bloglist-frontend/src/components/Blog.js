import React from 'react'
import { Link } from 'react-router-dom'
import {
  TableCell,
  TableRow,
} from '@material-ui/core'

const Blog = ({ blog }) => {
  if(!blog) {
    return null
  }

  return (
    <TableRow key={blog.id}>
      <TableCell style={{width:'70%'}}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>
        {blog.author}
      </TableCell>
    </TableRow>
  )
}

export default Blog