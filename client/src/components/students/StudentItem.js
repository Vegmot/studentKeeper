import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StudentContext from '../../context/student/studentContext';

const StudentItem = ({ student }) => {
  const studentContext = useContext(StudentContext);
  const { deleteStudent, setCurrent, clearCurrent } = studentContext;

  const {
    _id,
    firstName,
    lastName,
    email,
    phone,
    startDate,
    visaStatus,
    paymentStatus,
    attendance,
  } = student;

  const onDelete = () => {
    deleteStudent(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary-text-left'>
        {firstName} {lastName}
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
        <li>
          <i className='far fa-calendar-alt'></i> Start date: {startDate}
        </li>
        <li>
          <i className='fab fa-cc-visa'></i>{' '}
          {visaStatus === 'In effect' ? (
            <span>Visa status: {visaStatus}</span>
          ) : (
            <span style={{ color: 'red' }}>Visa status: {visaStatus}</span>
          )}
        </li>
        <li>
          <i className='far fa-credit-card'></i>{' '}
          {paymentStatus === 'Paid' ? (
            <span>Payment status: {paymentStatus}</span>
          ) : (
            <span style={{ color: 'red' }}>
              Payment status: {paymentStatus}
            </span>
          )}
        </li>
        <li>
          <i className='fas fa-user-check'></i>{' '}
          {attendance === 'Good' ? (
            <span>Attendance: {attendance}</span>
          ) : (
            <span style={{ color: 'red' }}>Attendance: {attendance}</span>
          )}
        </li>
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(student)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentItem;
