import React from 'react'
import { ListItemButton, ListItemText, List, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';


const Lists = (props) => {
  return (
    <>
      <List>
       
        <NavLink className='link' to={props.li1link}>
          <ListItem disablePadding>
            <ListItemButton component="a" href={props.li1link}>
              <ListItemText primary={props.li1} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        

        <NavLink className='link' to={props.li2link}>
          <ListItem disablePadding>
            <ListItemButton component="a" href={props.li2link}>
              <ListItemText primary={props.li2} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        
        <NavLink className='link' to="/signup">
          <ListItem disablePadding>
            <ListItemButton component="a" href={props.li3link}>
              <ListItemText primary={props.li3} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        
        <NavLink className='link' to="/testseries">
          <ListItem disablePadding>
            <ListItemButton component="a" href={props.li4link}>
              <ListItemText primary={props.li4} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </>
  )
}

export default Lists;
