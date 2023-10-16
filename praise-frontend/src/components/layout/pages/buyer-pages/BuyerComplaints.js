import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ComplaintForm from '../../page-components/ComplaintForm';
import Header from '../../page-components/utils/Header';
import FloatingActionButton from '../../page-components/utils/FloatingActionButton';
import AddIcon from '@mui/icons-material/Add';
import { complaints } from '../../test-api/complaints/Complaints';
import { useUserContext } from '../../test-api/UserContext';
import SearchBarComponent from '../../page-components/utils/SearchBarComponent';
import ListView from '../../page-components/utils/ListView';
import ComplaintTile from '../../page-components/utils/ComplaintTile';



function BuyerComplaints() {
  
  const { value: user } = useUserContext();
  const userComplaints = complaints.filter(complaint => complaint.userID === user.id)

  const [ filteredComplaints, setFilteredComplaints ] = useState(userComplaints);

  const [ isAddingComplaint, setIsAddingComplaint ] = useState(false);

  const toggleAddComplaint = () => {
    setIsAddingComplaint(!isAddingComplaint);
  }

  const formattedComplaintData = {
    inputRow: [
        { name: 'subject', placeholder: 'Subject...', label : "Complaint Subject"},
        { name: 'sellerID', placeholder: 'Seller ID...', label : "Seller ID"},
        { name: 'productID', placeholder: 'Product ID...', label : "Product ID"}
    ],
    inputBlock : {
        name: 'description', placeholder: 'Write your complaint description...', label: "Complaint Description"
    }
  }

  const searchBarComponent = useMemo(() => (
    <SearchBarComponent
    elements={userComplaints}
    setFilteredElements={setFilteredComplaints}
    searchBy={['id', 'subject', 'dateTime']}
    />
  ), [])

  return (
    <div>
    <div className='page'>
      <Header
      searchBar={searchBarComponent}
      title='Complaints'
      description="For any concerns or issues you've experienced, please use this section to submit and view your complaints. "
      />
    <div className='page-content'>
      <ListView
      elements={filteredComplaints} ElementComponent={ComplaintTile}/>
      <FloatingActionButton
      onClick={toggleAddComplaint}
      icon={<AddIcon/>}/>

      {
        isAddingComplaint && (
          <div className='profile-overlay' key='unique-key'> 
            <ComplaintForm 
            formattedComplaintData={formattedComplaintData} onClose={toggleAddComplaint}/>
          </div>
        )
      }
     
      
    </div> 
    </div>
  </div>
  )
}



export default BuyerComplaints