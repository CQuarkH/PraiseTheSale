import React from 'react';
import AnimatedTile from './AnimatedTile';
import { Link } from 'react-router-dom';

function CustomCard({
  element,
  propsToShow,
  propsLabel,
  propFormat,
  iconMap,
  linkRoute,
  propRoute,
  style,
  layoutID
}) {

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 } 
  };

  return (
    <AnimatedTile className='content-card' style={style} variants={itemVariants} layoutID={layoutID}>
      {
        linkRoute ?
          <Link to={`${linkRoute}${element[propRoute]}`}
            style={{ textDecoration: 'none', color: 'inherit', maxHeight: '100%', maxWidth: '100%' }}>
            <img src={element.image ?? element.profileImage} />
            <h4> {element.name} </h4>
            {
              propsToShow.map(prop => (
                element[prop] ?
                  <div className='standout-list-tile'>
                    {iconMap[prop]}
                    {
                      propFormat && propFormat[prop] ?
                        React.createElement(
                          propFormat[prop],
                          null,
                          `${element[prop]}${propsLabel && propsLabel[prop] !== null ? ` ${propsLabel[prop]}` : ''}`
                        )
                        :
                        <span>{element[prop]}
                          {propsLabel && propsLabel[prop] !== null && ` ${propsLabel[prop]}`}
                        </span>
                    }
                  </div> : null
              ))
            }
          </Link> : <>
            <img src={element.image ?? element.profileImage} />
            <h4> {element.name} </h4>
            {
              propsToShow.map(prop => (
                element[prop] ?
                  <div className='standout-list-tile'>
                    {iconMap[prop]}
                    {
                      propFormat && propFormat[prop] ?
                        React.createElement(
                          propFormat[prop],
                          null,
                          `${element[prop]}${propsLabel && propsLabel[prop] !== null ? ` ${propsLabel[prop]}` : ''}`
                        )
                        :
                        <span>{element[prop]}
                          {propsLabel && propsLabel[prop] !== null && ` ${propsLabel[prop]}`}
                        </span>
                    }
                  </div> : null
              ))
            }
          </>
      }
    </AnimatedTile>
  )
}

export default CustomCard;