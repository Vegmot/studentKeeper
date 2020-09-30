import React, { useContext, useEffect, useState } from 'react';
import StudentContext from '../../context/student/studentContext';

const StudentForm = () => {
  const studentContext = useContext(StudentContext);

  const { addStudent, updateStudent, clearCurrent, current } = studentContext;

  useEffect(() => {
    if (current !== null) {
      setStudent(current);
    } else {
      setStudent({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        startDate: Date.now,
        visaStatus: 'In effect',
        paymentStatus: 'Paid',
        attendance: 'Good',
      });
    }
  }, [studentContext, current]);

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: Date.now,
    visaStatus: 'In effect',
    paymentStatus: 'Paid',
    attendance: 'Good',
  });

  const {
    firstName,
    lastName,
    email,
    phone,
    startDate,
    visaStatus,
    paymentStatus,
    attendance,
  } = student;

  const onChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addStudent(student);
    } else {
      updateStudent(student);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit student' : 'Add student'}
      </h2>
      <input
        type='text'
        name='firstName'
        placeholder='First name'
        value={firstName}
        onChange={onChange}
      />
      <input
        type='text'
        name='lastName'
        placeholder='Last name'
        value={lastName}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Status</h5>
      <input
        type='text'
        placeholder='Start date'
        name='startDate'
        value={startDate}
        onChange={onChange}
      />
      <div>
        <h5>Visa status</h5>
        <input
          type='radio'
          name='visaStatus'
          value='In effect'
          checked={visaStatus === 'In effect'}
          onChange={onChange}
        />{' '}
        In effect{' '}
        <input
          type='radio'
          name='visaStatus'
          value='Expired'
          checked={visaStatus === 'Expired'}
          onChange={onChange}
        />{' '}
        Expired{' '}
      </div>
      <div>
        <h5>Payment status</h5>
        <input
          type='radio'
          name='paymentStatus'
          value='Paid'
          checked={paymentStatus === 'Paid'}
          onChange={onChange}
        />{' '}
        Paid{' '}
        <input
          type='radio'
          name='paymentStatus'
          value='Not paid'
          checked={paymentStatus === 'Not paid'}
          onChange={onChange}
        />{' '}
        Not paid{' '}
      </div>
      <h5>Attendance</h5>
      <div>
        <input
          type='radio'
          name='attendance'
          value='Good'
          checked={attendance === 'Good'}
          onChange={onChange}
        />{' '}
        Good{' '}
        <input
          type='radio'
          name='attendance'
          value='Bad'
          checked={attendance === 'Bad'}
          onChange={onChange}
        />{' '}
        Bad{' '}
      </div>
      <div>
        <input
          type='submit'
          value={current ? 'Update student' : 'Add student'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default StudentForm;
