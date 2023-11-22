import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComplaintLayout from './ComplaintLayout';
import { useAuth } from '../../../context/AuthContext';
import { useComplaints } from '../../../context/ComplaintContext';
import PageNotFound from '../../shared/PageNotFound';

function ComplaintView() {

  const { complaintID } = useParams();
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { complaints, fetchComplaints } = useComplaints();
  const [ complaint, setComplaint ] = useState(null);
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
    if (!complaints.length) {
      fetchComplaints().then(() => setLoading(false));
    } else {
      const foundComplaint = complaints.find(c => c.id === Number(complaintID)) || null;
      setComplaint(foundComplaint);
      setLoading(false);
    }
  }, [complaintID, complaints, fetchComplaints]);


  if(isLoading){
    return <div> Loading ... </div>
  }

  if(!isLoading && complaint === null) {
    return <PageNotFound/>
  }
  
  return (
    <ComplaintLayout
    complaint={complaint}
    user={authData.user}
    onClickBack={() => navigate(-1)}
    />
  );
}

export default ComplaintView