import React, { useContext, useEffect } from 'react';
import Students from '../students/Students';
import StudentForm from '../students/StudentForm';
import StudentFilter from '../students/StudentFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <StudentForm />
      </div>
      <div>
        <StudentFilter />
        <Students />
      </div>
    </div>
  );
};

export default Home;
