import React from 'react';
import CustomCard from './utils/CustomCard';
import TagIcon from '@mui/icons-material/Tag';
import StarRateIcon from '@mui/icons-material/StarRate';
import Inventory2Icon from '@mui/icons-material/Inventory2';

function UserCard({user, propsToShow, onAdmin = false}) {

  const iconMap = {
    userType: <TagIcon/>,
    rating: <StarRateIcon/>,
    products: <Inventory2Icon/>
  }  

  const filteredIconMap = Object.keys(iconMap)
    .filter(key => propsToShow.includes(key))
    .reduce((obj, key) => {
      obj[key] = iconMap[key];
      return obj;
  }, {});

  return (
    <CustomCard
     linkRoute={onAdmin ? '/admin-users/' : '/buyer-sellers/'}
     element={user}
     propsToShow={propsToShow}
     iconMap={filteredIconMap}/>
  )
}

export default UserCard