import React, {useState} from "react";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AnimatedTile from "../../../components/common/AnimatedTile";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import BlockIcon from '@mui/icons-material/Block';


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

export default AdminOptions;