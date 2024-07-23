import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import SearchBar from './components/SearchBar';
import UserModal from './components/UserModal';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({});
  const [modalUser, setModalUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        setFilteredUsers(data.users);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = (query) => {
    if (query === '') {
      setFilteredUsers(users);
    } else {
      fetch(`https://dummyjson.com/users/filter?key=firstName&value=${query}`)
        .then(response => response.json())
        .then(data => {
          if (data.users) {
            setFilteredUsers(data.users);
          } else {
            setFilteredUsers([]);
          }
        })
        .catch(error => console.error('Error filtering users:', error));
    }
  };

  const handleSort = (column, direction) => {
    if (direction === 'none') {
      setFilteredUsers(users);
    } else {
      const sortedUsers = [...filteredUsers].sort((a, b) => {
        const aValue = column === 'fullName' ? `${a.firstName} ${a.lastName}` : a[column];
        const bValue = column === 'fullName' ? `${b.firstName} ${b.lastName}` : b[column];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return direction === 'ascending' ? aValue - bValue : bValue - aValue;
      });
      setFilteredUsers(sortedUsers);
    }
    setSortConfig({ key: column, direction });
  };

  const handleRowClick = (user) => {
    setModalUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalUser(null);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <UserTable
        users={filteredUsers}
        sortConfig={sortConfig}
        onSort={handleSort}
        onRowClick={handleRowClick}
      />
      {showModal && <UserModal user={modalUser} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;