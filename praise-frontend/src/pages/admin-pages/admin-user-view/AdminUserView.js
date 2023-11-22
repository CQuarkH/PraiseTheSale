import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../../api/useAxios';
import AdminUserViewLayout from './AdminUserViewLayout';
import PageNotFound from '../../shared/PageNotFound';



function AdminUserView() {

  const { userID } = useParams();
  const navigate = useNavigate();

  const axiosInstance = useAxios();
  const [ user, setUser ] = useState(null);
  const [ isLoading, setLoading ] = useState(true)
  const [ filteredLogs, setFilteredLogs ] = useState([]);


  useEffect(() => {
    axiosInstance.get(`/users/${userID}`)
    .then(response => {
        setUser(response.data);
        console.log(response.data)
        setFilteredLogs(response.data.auditLogs.auditLogs);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(
      () => { setLoading(false) }
    )

  }, [])

  if(isLoading && user === null){
    return <div style={{color: 'white'}}> Loading ... </div>
  }

  if (user === null){
    return <PageNotFound/>
  }

  return ( 
  <AdminUserViewLayout
   user={user}
   setFilteredLogs={setFilteredLogs}
   filteredLogs={filteredLogs}
   navigate={navigate}
   logs={user.auditLogs.auditLogs}/>
  )
}


export default AdminUserView