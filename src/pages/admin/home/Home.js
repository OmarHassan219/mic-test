import React from 'react'
import useFetchHook from '../../../hooks/useFetchHook';
import './home.css'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
const Home = () => {
  const data = useFetchHook("category");



  return (
    <div className='admin-home py-4'>
        <div className='container'>
          <table className='styled-table'>
  <thead>
    <tr>
      <th>Email</th>
      <th>category</th>
    </tr>
  </thead>
  <tbody>
{data?.map( (item , index) =>{


  return(
    <tr key={index}>
        <td>{item.useremail}</td>
        <td>{item.cat}</td>
      </tr>
  )})}    

  
  </tbody>
</table>
  





        
        
        </div>
        
        </div>
  )
}

export default Home