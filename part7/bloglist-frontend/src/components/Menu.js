import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
const Menu = ({ user, handleLogout }) => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="secondary" >
          <Link to='/' color={'red'}>Blogs</Link>
        </Button>
        <Button color="secondary" >
          <Link to='/users'>Users</Link>
        </Button>
        <span style={{marginLeft:'5px',marginRight:'5px'}}>
          {user.name} logged in 
        </span>
        <Button color="secondary" onClick={handleLogout} background='linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'>logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu