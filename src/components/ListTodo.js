import React, { useEffect } from 'react'
import {useState} from 'react';
import { db } from '../firebase';
import{query,
       collection,
       onSnapshot ,
       deleteDoc,
       updateDoc,
       doc}from 'firebase/firestore'
import DeleteIcon from '@mui/icons-material/Delete';

import {List,
        ListItem,
        ListItemText,
        ListItemButton,
        ListItemIcon,
        Checkbox,
        IconButton} from  '@mui/material' ;



 
  
export default function CheckboxList(todo) {
  const[todos,setTodos]=useState([]);
  const [checked, setChecked] = React.useState([0]);
 const date = useState('');

 // Read todo from firebase
 useEffect(() => {
  const q = query(collection(db, 'todos'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todosArr = [];
    querySnapshot.forEach((doc) => {
      todosArr.push({ ...doc.data(), id: doc.id });
    });
    setTodos(todosArr);
  });
  return () => unsubscribe();
 }, []);


   // Delete todo
   const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };
   // Update todo in firebase
   const updateTodo = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      inprogress:!todo.inprogress,
    });
  };


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      updateTodo(value);
      newChecked.push(value);
      console.log(value);
      
    } else {
      
      newChecked.splice(currentIndex, 1);
      console.log("0");
    }

    setChecked(newChecked);
  };

  

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo.todo}`;
        //console.log(todo.id);
         //console.log(labelId);
        const todoDate =`${ todo.timestamp && (todo.timestamp).toDate().toUTCString()}`;
        return (
          <ListItem
            key={todo.id}
            secondaryAction={
              <>
              
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)} >
               
            
              
               
               <DeleteIcon />
               </IconButton>
               
              </>
               
             
             
            
              
             
            }
           
             
            
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(todo)}  dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(todo) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} 
                            primary={ `${todo.todo}📌 📌 ${todo.inprogress ?  "Done ✔️" : "Undone  ⏱️"}` } 
                            secondary={ `📅${todoDate }`}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

