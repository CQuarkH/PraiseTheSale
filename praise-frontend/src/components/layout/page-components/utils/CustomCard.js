import React from 'react';
import AnimatedTile from './AnimatedTile';
import { Link } from 'react-router-dom';

function CustomCard({element, propsToShow, iconMap, linkRoute, propRoute}) {
  return (
    <AnimatedTile className='content-card'>
        {
          linkRoute ? <Link to={`${linkRoute}${element[propRoute]}`} style={{ textDecoration: 'none', color: 'inherit'}}>
          <img src={element.image ?? element.profileImage} className= 'content-card-image'/>
          <h4> {element.name} </h4>
          {
          propsToShow.map(prop => (
              element[prop] ? 
              <div className='standout-list-tile'>
                {iconMap[prop]}
                <span>{element[prop]}</span>
              </div> : null
          ))
          }
      </Link> : <>
      <img src={element.image ?? element.profileImage} className= 'content-card-image'/>
          <h4> {element.name} </h4>
          {
          propsToShow.map(prop => (
              element[prop] ? 
              <div className='standout-list-tile'>
                {iconMap[prop]}
                <span>{element[prop]}</span>
              </div> : null
          ))
          }
          </>
        }
    </AnimatedTile>
  )
}

export default CustomCard