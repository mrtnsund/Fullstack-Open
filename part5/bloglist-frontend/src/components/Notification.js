import React from 'react';
const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  let feedback = 'error';
  if (type === 'success') {
    feedback = 'success';
  }
  return (
    <div className={feedback}>
      {message}
    </div>
  );
};
export default Notification;