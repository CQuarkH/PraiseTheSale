import { React, useState, useMemo, useEffect } from 'react';
import ListView from '../../components/common/ListView';
import ComplaintTile from '../../components/common/ComplaintTile';
import ComplaintForm from '../../components/layout/ComplaintForm';
import FloatingActionButton from '../../components/common/FloatingActionButton';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/common/Header';
import SearchBarComponent from '../../components/common/SearchBarComponent';
import { useComplaints } from '../../context/ComplaintContext';

function SellerComplaints() {

  const { complaints, fetchComplaints } = useComplaints();
  const [ filteredComplaints, setFilteredComplaints ] = useState([]);

  const [ isAddingComplaint, setIsAddingComplaint ] = useState(false);

  const toggleAddComplaint = () => {
    setIsAddingComplaint(!isAddingComplaint);
  }

  useEffect(() => {
    fetchComplaints();
  }, []);

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

  const formattedComplaintData = {
    inputRow: [
        { name: 'subject', placeholder: 'Subject...', label : "Complaint Subject"},
        { name: 'targetUserID', placeholder: 'Buyer ID...', label : "Buyer ID"},
        { name: 'productID', placeholder: 'Product ID...', label : "Product ID"}
    ],
    inputBlock : {
        name: 'context', placeholder: 'Write your complaint description...', label: "Complaint Description"
    }
  }

  return (
    <div>
      <div className='page'>
       <Header
       searchBar={searchBarComponent}
       title="Complaints"
       description= "For any concerns or issues you've experienced, please use this section to submit and view your complaints. "/>

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

export default SellerComplaints