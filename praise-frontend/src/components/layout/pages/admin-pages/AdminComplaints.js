import { AnimatePresence, motion } from 'framer-motion';
import { React, useState, useMemo, useCallback} from 'react';
import AnimatedTile from '../../page-components/utils/AnimatedTile';
import Filters from '../../page-components/utils/Filters';
import ListView from '../../page-components/utils/ListView';
import SearchBarComponent from '../../page-components/utils/SearchBarComponent';
import { complaints } from '../../test-api/complaints/Complaints';
import { Link } from 'react-router-dom';

function AdminComplaints() {

  const [filteredComplaints, setFilteredComplaints] = useState(complaints);

  const complaintFilterGroups = useMemo(() => ({
    status: [
      { id: 'resolved', label: 'Resolved', filterFn: complaint => complaint.status === 'resolved'},
      { id: 'pending', label: 'Pending', filterFn: complaint => complaint.status === 'pending'}
    ]
  }), []);

  const searchBy = useMemo(() => 
    ['subject', 'id', 'productID', 'targetID', 'userID']
  , []);
  


  return (
    <div>
      <div className='page'>
        <div className='page-header'>
          <div>
            <h2>Complaints</h2>
            <span>Review and address user complaints promptly, upholding platform integrity and fostering user trust.</span>
          </div>
          <SearchBarComponent 
            elements={complaints} 
            setFilteredElements={setFilteredComplaints} 
            searchBy={searchBy}/>
      </div>
      <div className='page-content'>
      <ListView elements={filteredComplaints} ElementComponent={complaintComponent}/>
      <Filters elements={complaints} filterGroups={complaintFilterGroups} onFilterChange={setFilteredComplaints}/>
      </div>
    </div>
  </div>
  )
}



function complaintComponent({element: complaint}){

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 } 
  };

   return (
    <Link to={`/admin-complaints/${complaint.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
     <AnimatePresence>
      <AnimatedTile
      whileHoverScale= {1.01}
      key={complaint.id}
      className='content-list-tile'
      variants={itemVariants}>
        <div className='block-tile' style={{flex: '1'}}>
          <h4> Complaint Subject </h4>
          <div className='standout-list-tile'>
            <p> {complaint.subject} </p>
          </div>
        </div>
        <div className='block-tile' style={{flex: '1'}}>
          <div className='standout-list-tile'>
            <span>User ID : {complaint.userID} </span>
          </div>
          <div className='standout-list-tile'>
            <span>Product ID : {complaint.productID} </span>
          </div>
          <div className='standout-list-tile'>
            <span>Target User ID : {complaint.targetID} </span>
          </div>
        </div>
        <div className='block-tile' style={{flex: '2'}}>
          <h4> Complaint Description </h4>
          <div className='standout-list-tile'>
            <p> {complaint.context} </p>
          </div>
        </div>
      </AnimatedTile>
    </AnimatePresence>
    </Link>
   )
}

export default AdminComplaints