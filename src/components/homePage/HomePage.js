import React from 'react';
import './HomePage.scss';
import image from  './asset/image.jpg'

function HomePage ()  {

  return (
    <div className='main'> 
        <h1>Hello</h1>   
        <img src={image}/>
    </div> 
    
  )
}

export default HomePage;