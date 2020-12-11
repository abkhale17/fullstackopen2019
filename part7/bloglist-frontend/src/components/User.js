import React from 'react'
import {
  TableCell,
  TableRow,
} from '@material-ui/core'

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  )
}

export default User