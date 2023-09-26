import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { productList, ownersList } from '../test-api/products/Product';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FeedbackIcon from '@mui/icons-material/Feedback';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import StoreIcon from '@mui/icons-material/Store';
import StarRateIcon from '@mui/icons-material/StarRate';
import AnimatedTile from './utils/AnimatedTile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ProductView() {

  const { productID } = useParams();
  const navigate = useNavigate();
  const product = productList.find(product => product.id === Number(productID));
  const [showSellerData, setShowSellerData] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const productOwner = ownersList.find(owner => owner.name === product.owner);
  const ownerProductList = productList.filter(product => product.owner === productOwner.name && product.id !== Number(productID));

  const showSellerDataHandler = (value) => {
    if(!showSellerData){
      return "*".repeat(value.length)
    } else{
      return value;
    }
  
  }

  const containerVariants = {
    hidden: { opacity: 1, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1, 
        duration: 0.07
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.3
      },
    },
  };
  

  return (
      <motion.div 
      className='page'
      variants={containerVariants}
      initial="hidden"
      animate="visible">
        <motion.div 
        variants={itemVariants}
        className='page-header' style={{maxHeight: "35vh"}}>
          <div className='block-tile' style={{marginLeft: '0'}}>
            <div className='button-image-container'>
              <img src={product.image}/>
              <AnimatedTile 
              className='button-image-back' 
              onClick={() => navigate(-1)}>
              <ArrowBackIcon/>
            </AnimatedTile>
            </div>
          </div>
          <div className='block-tile' style={{justifyContent: 'space-evenly'}}>
            <h2> { product.name} </h2>
            <div className='standout-list-tile-invert'>
              <AlternateEmailIcon/>
              <span> {product.id} </span>
            </div>
            <div className='standout-list-tile-invert'>
              <AttachMoneyIcon style={{color: '#98FF98'}}/>
              <h3> {product.price} </h3>
            </div>
            <div className='standout-list-tile-invert'>
              <span> Condition : </span>
              <span> {product.condition} </span>
            </div>
          </div>
          <div className='block-tile'/>
          <div className='block-tile'>
            <div className='block-tile' style={{marginBottom: '10px'}}>
              <div className='standout-list-tile-invert-column'>
                <h4> Contact Data </h4>
                <div className='standout-list-tile'>
                  <EmailIcon/>
                  <span> {showSellerDataHandler(productOwner.contactEmail)} </span>
                </div>
                <div className='standout-list-tile'>
                  <PhoneIcon/>
                  <span>{showSellerDataHandler(productOwner.contactPhone)}</span>
                  
                </div>
              </div>
            </div>
            <div className='block-tile'>
              <AnimatedTile
              onClick={() => setShowSellerData(!showSellerData)}
              style={{cursor: 'pointer'}}
              className='standout-list-tile-invert'>
                <FeedbackIcon style={{color: '#98FF98'}}/>
                <h4> Request Seller Data </h4>

              </AnimatedTile>
            </div>
          </div>

        </motion.div>
        <motion.div className='page-content' style={{height: '62vh'}} variants={itemVariants}>
          {/* left side */}
          <div className='block-tile' style={{marginLeft: 0, flex: 2}}>
            <div className='standout-list-tile-column'>
              <h4> Description </h4>
              <div className='standout-list-tile-invert'>
                <p> {product.description} </p>
              </div>
            </div>
            <div className='standout-list-tile-column' style={{flex: 1}}>
              <h4> Similar items from this vendor </h4>
              <div className='divider-horizontal'/>
              <div className='content-row' style={{maxWidth: '100%', height: 'auto'}}>
                {
                  ownerProductList.length === 0 ? (
                  <div className='center-message-container'> 
                    <h4> Nothing to show :( </h4>

                  </div>
                  ) 
                  : 
                  (ownerProductList.map(product => (
                    <div className='content-card'>
                      <img src={product.image}/>
                  
                      <div className='standout-list-tile'>
                        <AttachMoneyIcon/>
                        <span> {product.price} </span>
                      </div>

                    </div>
                  )))
                }
              
              </div>
              
            </div>
          </div>
           {/* right side */}
          <div className='block-tile' style={{flex: 1}}>
            <div className='standout-list-tile-column' style={{height: '100%', justifyContent: 'normal'}}>
              <img src = {productOwner.profileImage}/>
              <div className='standout-list-tile-invert' style={{backgroundColor: "#2d2a4c"}}>
                <StoreIcon/>
                <h4> {productOwner.name} </h4>
              </div>
              <div className='standout-list-tile-invert'>
                <StarRateIcon/>
                <span> {productOwner.rating} rating in PraiseTheSale</span>
              </div>
              <div className='standout-list-tile-invert'>
                <p>{productOwner.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
  )
}

export default ProductView