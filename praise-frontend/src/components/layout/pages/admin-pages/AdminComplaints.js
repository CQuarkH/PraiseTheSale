
import { React, useState, useMemo, useCallback} from 'react';
import Filters from '../../page-components/utils/Filters';
import ListView from '../../page-components/utils/ListView';
import SearchBarComponent from '../../page-components/utils/SearchBarComponent';
import { complaints } from '../../test-api/complaints/Complaints';
import Header from '../../page-components/utils/Header';
import ComplaintTile from '../../page-components/utils/ComplaintTile';

function AdminComplaints() {

  const [filteredComplaints, setFilteredComplaints] = useState(complaints);

  const complaintFilterGroups = useMemo(() => ({
    status: [
      { id: 'resolved', label: 'Resolved', filterFn: complaint => complaint.status === 'resolved'},
      { id: 'pending', label: 'Pending', filterFn: complaint => complaint.status === 'pending'}
    ],
    date: [
      { id: 'lastWeek', label: 'Last Week', filterFn: complaint => {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return new Date(complaint.dateTime) >= oneWeekAgo;
      }},
      { id: 'lastMonth', label: 'Last Month', filterFn: complaint => {
        const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return new Date(complaint.dateTime) >= oneMonthAgo;
      }}
     
    ],
  }), []);

  const searchBy = useMemo(() => 
    ['subject', 'id', 'dateTime']
  , []);

  const searchBarComponent = useMemo(() => (
    <SearchBarComponent 
            placeholder="YYYY-MM-DD, ID, Subject..."
            elements={complaints} 
            setFilteredElements={setFilteredComplaints} 
            searchBy={searchBy}/>
  ), [setFilteredComplaints])
  


  return (
    <div>
      <div className='page'>
        <Header
        searchBar={searchBarComponent}
        title='Complaints'
        description='Review and address user complaints promptly, upholding platform integrity and fostering user trust.'/>
      <div className='page-content'>
      <ListView elements={filteredComplaints} ElementComponent={ComplaintTile}/>
      <Filters 
      sortByDateDescending={true}
      elements={complaints} 
      filterGroups={complaintFilterGroups} 
      onFilterChange={setFilteredComplaints}/>
      </div>
    </div>
  </div>
  )
}




function DateFilter({elements, setFilteredComplaints}){

}

export default AdminComplaints