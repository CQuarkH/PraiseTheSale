import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { productList} from '../test-api/products/Product';
import { sellers } from '../test-api/test-users/Users';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FeedbackIcon from '@mui/icons-material/Feedback';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import StoreIcon from '@mui/icons-material/Store';
import StarRateIcon from '@mui/icons-material/StarRate';
import AnimatedTile from './utils/AnimatedTile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { capitalizeFirstLetter } from './utils/utils';
import CustomCard from './utils/CustomCard';
import { useUserContext } from '../test-api/UserContext';
import { USER_TYPES } from '../test-api/UserTypes';
import CustomInput from './utils/CustomInput';
import UpdateProductCard from './UpdateProductCard';


function useEditMode(initialState = false) {
  const [editMode, setEditMode] = useState(initialState);

  const toggleEditMode = () => {
    setEditMode(prevMode => !prevMode);
  };

  return [editMode, toggleEditMode];
}


function ProductView() {

  const { productID } = useParams();
  const navigate = useNavigate();
  const product = productList.find(product => product.id === Number(productID));

  const [editMode, toggleEditMode] = useEditMode();

  const { value: user } = useUserContext();
  
  const seller = sellers.find(seller => product && product.owner === seller.name);

  const sellerProductList = productList.filter(product => product.owner === seller.name && product.id !== Number(productID));


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
    if(user === USER_TYPES.ADMIN){
      return (
       <AdminOptions seller={seller} product={product}/>
      )

    }
    
  }

  const renderSellerOptions = () => {
    if(user === USER_TYPES.SELLER){
      return (
        <SellerOptions 
        toggleEditMode={toggleEditMode}
        product={product}
        seller={seller}
        editMode={editMode}/>
      )
    }
  }

  const renderBuyerOptions = () => {
    if (user === USER_TYPES.BUYER){
      return (
        <BuyerOptions seller={seller}/>
      )
    }
  }
  
  return (
      <motion.div 
      key={productID}
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
        </motion.div>
      </motion.div>
  )
}



function BuyerOptions({seller}) {

  const [showSellerData, setShowSellerData] = useState(false);

  const showSellerDataHandler = (value) => {
      if(!showSellerData){
        return "*".repeat(value.length)
      } else{
        return value;
      }
    
  }

  return (
    <div className='block-tile'>
       <div className='block-tile' style={{marginBottom: '10px'}}>
        <div className='standout-list-tile-invert-column'>
         <h4> Contact Data </h4>
           <div className='standout-list-tile'>
            <EmailIcon/>
                  <span> {showSellerDataHandler(seller.contactEmail)} </span>
                </div>
                <div className='standout-list-tile'>
                  <PhoneIcon/>
                  <span>{showSellerDataHandler(seller.contactPhone)}</span>
                  
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
  )
}

function SellerOptions({seller, product, toggleEditMode, editMode}) {

  const [ markedAsSold, setMarkedAsSold ] = useState(false);
  return (
    <div className='block-tile'>
     <div className='block-tile'>
      <AnimatedTile
      layoutID={'update-product'}
      onClick={toggleEditMode}
      style={{cursor: 'pointer'}}
      className='standout-list-tile-invert'>
        <EditIcon style={{color: '#98FF98'}}/>
        <h4> Edit Product </h4>
      </AnimatedTile>
       <AnimatePresence>
        { editMode && (
        <div className='profile-overlay' key='update-product'>
          <UpdateProductCard 
          product={product}
          setIsAddingProduct={toggleEditMode} 
          layoutID={'update-product'}/>
         </div>
        )
        }
        </AnimatePresence>
     </div>
     <div className='block-tile'>
      <AnimatedTile
      onClick={() => {setMarkedAsSold(!markedAsSold)}}
      style={{cursor: 'pointer'}}
      className='standout-list-tile-invert'>
        {markedAsSold ? <RestoreIcon style={{color: '#98FF98'}}/> : <UnpublishedIcon style={{color: '#FF4C4C'}}/>}
        <h4> {markedAsSold ? 'Relist' : 'Mark as Sold'} </h4>
      </AnimatedTile>
     </div>
   </div>
  )
}

function AdminOptions({seller, product}) {

  const [ isSuspended, setAsSuspended ] = useState(false);
  return (
    <div className='block-tile'>
          <div className='block-tile' style={{marginBottom: '10px'}}>
            <div className='standout-list-tile-invert-column'>
              <h4> Contact Data </h4>
              <div className='standout-list-tile'>
                <EmailIcon/>
                  <span> {seller.contactEmail} </span>
              </div>
              <div className='standout-list-tile'>
                <PhoneIcon/>
                  <span>{seller.contactPhone}</span>
                </div>
              </div>
            </div>
            <div className='block-tile'>
              <AnimatedTile
              onClick={() => {setAsSuspended(!isSuspended)}}
              style={{cursor: 'pointer'}}
              className='standout-list-tile-invert'>
                {isSuspended ? (<>
                <PublishedWithChangesIcon style={{color: '#98FF98'}}/>
                <h4> Unsuspend Product </h4>
                </>) : (<>
                <BlockIcon style={{color: '#FF4C4C'}}/>
                <h4> Suspend Product </h4>
                </>)}
              </AnimatedTile>
            </div>
          </div>
  )
}


export default ProductView