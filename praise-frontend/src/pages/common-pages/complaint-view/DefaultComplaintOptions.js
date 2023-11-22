import React, { useEffect } from 'react';
import AnimatedTile from '../../../components/common/AnimatedTile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAxios } from '../../../api/useAxios';
import { toast } from 'react-toastify';

function DefaultComplaintOptions({ complaint, onClickBack }) {

  const axiosInstance = useAxios();

  const handleDeleteComplaint = () => {
    axiosInstance.delete(`/complaints/${complaint.id}`)
    .then(
        () => {
          onClickBack();
          toast.success("Complaint deleted sucessfully!");
        }
    ).catch(error => {
        console.error(error);
        toast.error("Error deleting complaint! " + error.response.data);
    })
  }
    
  return (
    <AnimatedTile 
    onClick={handleDeleteComplaint}
    className='standout-list-tile-invert'>
        <DeleteForeverIcon style={{color:'#FF4C4C'}}/>
        <h4> Delete Complaint </h4>     
    </AnimatedTile>
  )
}

export default DefaultComplaintOptions