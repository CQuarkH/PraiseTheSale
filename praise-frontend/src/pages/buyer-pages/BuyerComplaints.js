import React, { useEffect, useMemo, useState } from 'react';
import ComplaintForm from '../../components/layout/ComplaintForm';
import Header from '../../components/common/Header';
import FloatingActionButton from '../../components/common/FloatingActionButton';
import AddIcon from '@mui/icons-material/Add';
import SearchBarComponent from '../../components/common/SearchBarComponent';
import ListView from '../../components/common/ListView';
import ComplaintTile from '../../components/common/ComplaintTile';
import { useAxios } from '../../api/useAxios';



function BuyerComplaints() {

  const [ userComplaints, setUserComplaints ] = useState([]);
  const [ filteredComplaints, setFilteredComplaints ] = useState([]);
  const axiosInstance = useAxios();

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

  useEffect(() => {
    axiosInstance.get("/complaints")
    .then(response => {
      setUserComplaints(response.data.complaints);
      setFilteredComplaints(response.data.complaints);
    })
    .catch(error => {
      console.error(error);
    })
  }, [])

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