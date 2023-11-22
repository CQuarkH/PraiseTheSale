
import { React, useState, useMemo, useCallback, useEffect} from 'react';
import Filters from '../../components/common/Filters';
import ListView from '../../components/common/ListView';
import SearchBarComponent from '../../components/common/SearchBarComponent';
import Header from '../../components/common/Header';
import ComplaintTile from '../../components/common/ComplaintTile';
import { useComplaints } from '../../context/ComplaintContext';

function AdminComplaints() {

  const { complaints, fetchComplaints } = useComplaints();
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, [])

  useEffect(() => {
    setFilteredComplaints(complaints);
  }, [complaints])
  

  const complaintFilterGroups = useMemo(() => ({
    status: [
      { id: 'resolved', label: 'Resolved', filterFn: complaint => complaint.complaintStatus === 'RESOLVED'},
      { id: 'pending', label: 'Pending', filterFn: complaint => complaint.complaintStatus === 'PENDING'},
      { id: 'under_revision', label: 'Under Investigation', filterFn: complaint => complaint.complaintStatus === 'UNDER_INVESTIGATION'}
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