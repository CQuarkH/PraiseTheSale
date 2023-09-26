import React, { useState } from 'react'
import ComplaintForm from '../../page-components/ComplaintForm';

function BuyerComplaints() {

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

  return (
    <div>
    <div className='page'>
    <div className='page-header'>
     <div>
     <h2>Complaints</h2>
      <span>For any concerns or issues you've experienced, please use this section to submit your complaints. We value your feedback, so kindly ensure all fields are filled out for a more efficient resolution process.</span>
     </div>
    </div>
    <div className='page-content'>
      <ComplaintForm formattedComplaintData={formattedComplaintData}/>
    </div> 
    </div>
  </div>
  )
}

export default BuyerComplaints