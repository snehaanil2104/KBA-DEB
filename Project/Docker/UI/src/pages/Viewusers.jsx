import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';

const Viewusers = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await fetch('/api/alluser', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies with the request
          });
      
          if (!response.ok) {
            throw new Error('Unauthorized access');
          }
      
          const users = await response.json();
          setUsers(users)
          console.log(users);
        } catch (error) {
          console.error('Error fetching reservations:', error);
        }
      };


    fetchUsers();
  }, );

  return (
   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-4 border border-red-200"
          >
            <h3 className="text-2xl text-center text-red-900 font-bold mb-16">{user.name}</h3>
          </div>
        ))}
      </div>
    // </div>
  );
};

export default Viewusers;