import React from 'react'
import { createPortal } from 'react-dom'
import './loader.css'
import { motion } from 'framer-motion'
const Loader = () => {






    
  return createPortal(
    <div className='loader'>



<motion.div className="sk-chase">
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  {/* <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div> */}
</motion.div>






    </div>,document.getElementById('loader') 
  )
}

export default Loader