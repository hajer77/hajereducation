import React from 'react'
import { useState } from 'react'
import {AppBar,
         Toolbar,
         IconButton,
         Box,
         Button,
         Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';


export default function FirstMenu() {

  const[error,setError]=useState("")
  const {currentUser ,logout} =useAuth()
  const navigate = useNavigate()


  async function handleLogout(){
    setError('')

   try{
   await logout()
   navigate("/login")
   } catch {
  setError('Failed to log out')
   }
   }
  return (
   
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
     <Toolbar>
       <IconButton
         size="large"
         edge="start"
         color="inherit"
         aria-label="menu"
         sx={{ mr: 2 }}
       >
         <MenuIcon />
       </IconButton>
       
       
       <Typography variant="h6" component={Link}  to="/" sx={{ flexGrow: 1 }} color="textPrimary">
            Profile
          </Typography>
          <Typography variant="h6" component={Link}  to="/todo" sx={{ flexGrow: 1 }} color="textPrimary">
            Todo List
          </Typography>
       
        
        
          
        
       
       <Button variant="link" onClick={handleLogout} color="inherit" >Log out</Button>
     </Toolbar>
   </AppBar>
    </Box>
  )
}
