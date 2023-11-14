import React from 'react';
import AdminOptions from './AdminOptions';
import BuyerOptions from './BuyerOptions';
import SellerOptions from './SellerOptions';
import { motion } from 'framer-motion';
import AnimatedTile from '../../../components/common/AnimatedTile';
import CustomCard from '../../../components/common/CustomCard';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StoreIcon from '@mui/icons-material/Store';
import StarRateIcon from '@mui/icons-material/StarRate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { capitalizeFirstLetter } from '../../../components/common/utils';


function ProductLayout({ product, seller, authRole, onBackClick }) {

    const sellerProductList = [];

    const sellerMapIcon = {
        name: <StoreIcon/>,
        rating: <StarRateIcon/>
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

    const renderAdminOptions = () => {
        if(authRole === "ADMIN"){
          return (
           <AdminOptions seller={seller} product={product}/>
          )
    
        }
        
      }
    
    const renderSellerOptions = () => {
        if(authRole === "SELLER"){
          return (
            <SellerOptions 
            product={product}
            seller={seller}/>
          )
        }
    }
    
    const renderBuyerOptions = () => {
        if (authRole === "BUYER"){
          return (
            <BuyerOptions seller={seller}/>
          )
        }
    }

    return (
        <motion.div 
        key={product.id}
        className='page'
        variants={containerVariants}
        initial="hidden"
        animate="visible">
          <motion.div 
          variants={itemVariants}
          className='page-header' style={{maxHeight: "35vh"}}>
            <div className='block-tile' style={{marginLeft: '0'}}>
              <div className='button-image-container'>
                <motion.img 
               
                src={product.imageLink}/>
                <AnimatedTile 
                className='button-image-back' 
                onClick={onBackClick}>
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
                <span> {capitalizeFirstLetter(product.condition)} </span>
              </div>
            </div>
            <div className='block-tile'/>
             {renderBuyerOptions()}
             {renderSellerOptions()}
             {renderAdminOptions()}
          </motion.div>
          <motion.div className='page-content' style={{height: '80vh'}} variants={itemVariants}>
            {/* left side */}
            <div className='block-tile' style={{marginLeft: 0, flex: 2, maxHeight: '100%', flexDirection: 'column', maxWidth: '55vw'}}>
              <div className='standout-list-tile-column'>
                <h4> Description </h4>
                <div className='standout-list-tile-invert'>
                  <p> {product.description} </p>
                </div>
              </div>
              <div className='standout-list-tile-column' style={{flex: 1, maxHeight: '69%'}}>
                <h4> Similar items from this vendor </h4>
                <div className='divider-horizontal'/>
                <div className='content-row' style={{maxWidth: '100%', flex: 1, maxHeight: '100%'}}>
                  {
                    sellerProductList.length === 0 ? (
                    <div className='center-message-container'> 
                      <h4> Nothing to show :( </h4>
  
                    </div>
                    ) 
                    : 
                    (sellerProductList.map(product => (
                      <CustomCard
                      key={product.id}
                      style={{maxHeight: '80%', marginLeft: '20px'}}
                      linkRoute='/product/'
                      element={product}
                      propsToShow={['price']}
                      propRoute={['id']}
                      iconMap={{price: <AttachMoneyIcon/>}}
                      />
                    )))
                  }
                
                </div>
                
              </div>
            </div>
             {/* right side */}
            {
            <div className='block-tile' style={{flex: 1, maxHeight: '100%'}}>
              <CustomCard
              key={seller.id}
              style={{width: '90%', height: '100%'}}
              iconMap={sellerMapIcon}
              element={seller}
              propsToShow={['rating', 'description']}
              propRoute={['id']}
              linkRoute={['/seller/']}
              />
            </div> 
            }
          </motion.div>
        </motion.div>
    )
}

export default ProductLayout