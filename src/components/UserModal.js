import React from 'react';
import './UserModal.css';

const UserModal = ({ user, onClose }) => {
  return (
    <div className="UserModal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Address:</strong> {`${user.address.city}, ${user.address.address}`}</p>
        <p><strong>Height:</strong> {user.height} cm</p>
        <p><strong>Weight:</strong> {user.weight} kg</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default UserModal;