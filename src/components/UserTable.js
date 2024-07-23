import React, { useState, useRef } from 'react';
import './UserTable.css';

const UserTable = ({ users, sortConfig, onSort, onRowClick }) => {
  const resizingColumn = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const [columnWidths, setColumnWidths] = useState({
    fullName: 150,
    age: 150,
    gender: 150,
    phone: 150,
    address: 150
  });

  const getFullName = (user) => {
    return `${user.firstName} ${user.lastName}`;
  };

  const getAddress = (user) => {
    const city = user.city || '';
    const street = user.address || '';
    return `${user.address.city}, ${user.address.address}`.trim();
  };

  const handleSortChange = (column, event) => {
    const direction = event.target.value;
    onSort(column, direction);
  };

  const onMouseMove = (event) => {
    if (!resizingColumn.current) return;

    const deltaX = event.clientX - startX.current;
    const newWidth = Math.max(startWidth.current + deltaX, 50);

    setColumnWidths((prevWidths) => ({
      ...prevWidths,
      [resizingColumn.current]: newWidth,
    }));
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    resizingColumn.current = null;
  };

  const onColumnMouseDown = (column, event) => {
    resizingColumn.current = column;
    startX.current = event.clientX;
    startWidth.current = columnWidths[column];

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  return (
    <table className="UserTable">
      <thead>
        <tr>
          {['fullName', 'age', 'gender', 'phone', 'address'].map((column) => (
            <th key={column} style={{ width: columnWidths[column] }}>
              <div className="resizable-header">
                <span>{column}</span>
                <div>
                  <select onChange={(event) => handleSortChange(column, event)}>
                    <option value="none">Без сортировки</option>
                    <option value="ascending">По возрастанию</option>
                    <option value="descending">По убыванию</option>
                  </select>
                </div>
              </div>
              <div className='divider' onMouseDown={(event) => onColumnMouseDown(column, event)}></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => onRowClick(user)}>
            <td style={{ width: columnWidths.fullName }}>{getFullName(user)}</td>
            <td style={{ width: columnWidths.age }}>{user.age}</td>
            <td style={{ width: columnWidths.gender }}>{user.gender}</td>
            <td style={{ width: columnWidths.phone }}>{user.phone}</td>
            <td style={{ width: columnWidths.address }}>{getAddress(user)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;