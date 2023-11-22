import React, { useEffect, useMemo, useState } from 'react';
import ComplaintForm from '../../components/layout/ComplaintForm';
import Header from '../../components/common/Header';
import FloatingActionButton from '../../components/common/FloatingActionButton';
import AddIcon from '@mui/icons-material/Add';
import SearchBarComponent from '../../components/common/SearchBarComponent';
import ListView from '../../components/common/ListView';
import ComplaintTile from '../../components/common/ComplaintTile';
import { useComplaints } from '../../context/ComplaintContext';


function BuyerComplaints() {

  const { complaints, fetchComplaints } = useComplaints();
  const [ filteredComplaints, setFilteredComplaints ] = useState([]);

  const [ isAddingComplaint, setIsAddingComplaint ] = useState(false);

  const toggleAddComplaint = () => {
    setIsAddingComplaint(!isAddingComplaint);
  }

  const formattedComplaintData = {
    inputRow: [
        { name: 'subject', placeholder: 'Subject...', label : "Complaint Subject"},
        { name: 'targetUserID', placeholder: 'Seller ID...', label : "Seller ID"},
        { name: 'productID', placeholder: 'Product ID...', label : "Product ID"}
    ],
    inputBlock : {
        name: 'context', placeholder: 'Write your complaint description...', label: "Complaint Description"
    }
  }

  useEffect(() => {
    fetchComplaints();
  }, [])

  useEffect(() => {
    setFilteredComplaints(complaints);
  }, [complaints])


  const searchBarComponent = useMemo(() => (
    <SearchBarComponent
    elements={complaints}
    setFilteredElements={setFilteredComplaints}
    searchBy={['id', 'subject', 'dateTime', 'complaintStatus']}
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