import React, {useState} from "react";
import FeedbackIcon from '@mui/icons-material/Feedback';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AnimatedTile from '../../../components/common/AnimatedTile';

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
                    <span> {showSellerDataHandler(seller.email)} </span>
                  </div>
                  <div className='standout-list-tile'>
                    <PhoneIcon/>
                    <span>{showSellerDataHandler(seller.email)}</span>
                    
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

export default BuyerOptions;
