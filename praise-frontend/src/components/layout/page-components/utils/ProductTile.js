import React, {useState} from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useUserContext } from "../../test-api/UserContext";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import { USER_TYPES } from '../../test-api/UserTypes';
import { Link } from 'react-router-dom';
import AnimatedTile from './AnimatedTile';
import { capitalizeFirstLetter } from "./utils";

function ProductTile({element: product, animate = true}) {

    const { value : user } = useUserContext();

    const itemVariants = animate ? {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 } 
    } : {};
  


    return (
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
      <AnimatePresence>
        <AnimatedTile
         whileHoverScale= {1.01}
         key={product.id} 
         className='content-list-tile'
         variants={itemVariants}>
          <img src={product.image} alt={product.name}></img>
          <div className='block-tile'>
          <h3> {product.name} </h3>
          <div className='standout-list-tile'>
            <AttachMoneyIcon style={{color: '#98FF98'}}/>
           <h4> {product.price} </h4>
          </div>
        </div>
        <div className='block-tile' style={{justifyContent: 'center'}}>
          <div className='standout-list-tile'>
            <LocalOfferIcon/>
            <span> {capitalizeFirstLetter(product.condition)} </span>
         </div>
         <div className='standout-list-tile'>
            <LocalOfferIcon/>
            <span> {capitalizeFirstLetter(product.category)} </span>
          </div>
          {
            user !== USER_TYPES.SELLER && (
          <div className='standout-list-tile'>
            <PersonIcon/>
            <span> {product.owner} </span>
          </div>
            )
          }
        </div>
        <div className='block-tile hide-on-responsive' style={{flex: 2}}>
        <h4> Description </h4>
            <div className='standout-list-tile'>
              <p>{product.description}</p>
            </div>

         </div>
        </AnimatedTile>
      </AnimatePresence>
      </Link>
    )
}

export default ProductTile;