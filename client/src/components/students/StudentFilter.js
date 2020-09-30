import React, { useContext, useEffect, useRef } from 'react';
import StudentContext from '../../context/student/studentContext';

const StudentFilter = () => {
  const studentContext = useContext(StudentContext);
  const text = useRef('');

  const { filterStudents, clearFilter, filtered } = studentContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterStudents(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter students by name or email'
        onChange={onChange}
      />
    </form>
  );
};

export default StudentFilter;
