import React, {useState} from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedTile from "../../../components/common/AnimatedTile";
import EditIcon from '@mui/icons-material/Edit';
import RestoreIcon from '@mui/icons-material/Restore';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import UpdateProductCard from "../../../components/layout/UpdateProductCard";
import { useAxios } from "../../../api/useAxios";

function SellerOptions({product}) {

    const [ editMode, toggleEditMode ] = useState(false);
    const axiosInstance = useAxios();
    const [ markedAsSold, setMarkedAsSold ] = useState(false);


    const handleMarkAsSold = () => {
      const apiEndpoint = markedAsSold ? `/products/${product.id}/unmark-as-sold` : `/products/${product.id}/mark-as-sold`;
  
      axiosInstance.put(apiEndpoint)
      .then(response => {
          setMarkedAsSold(!markedAsSold);
      })
      .catch(error => {
          console.error(error);
      });
    };

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
         onClick={handleMarkAsSold}
         style={{cursor: 'pointer'}}
         className='standout-list-tile-invert'>
          {markedAsSold ? <RestoreIcon style={{color: '#98FF98'}}/> : <UnpublishedIcon style={{color: '#FF4C4C'}}/>}
          <h4> {markedAsSold ? 'Relist' : 'Mark as Sold'} </h4>
        </AnimatedTile>
       </div>
     </div>
    )
}

export default SellerOptions;
  