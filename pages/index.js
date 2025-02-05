// pages/index.js
import { useEffect, useState } from 'react';
import { fetchUsers, fetchPostsByUser ,fetchAddress } from './lib/api';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser , setSelectedUser ] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        setError('Failed to fetch users');
      }
    };

    getUsers();
  }, []);

  const handleUser  = async (userId) => {
    setSelectedUser (userId);
    try {
      const postsData = await fetchPostsByUser (userId);
      setPosts(postsData);
    } catch (error) {
      setError('Failed to fetch posts');
    }
  };

 

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Profiles</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUser (user.id)}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              margin: '14px',
              cursor: 'pointer',
              width: '600px',
              textAlign: 'center',
              backgroundColor: selectedUser  === user.id ? '#f0f0f0' : '#fff',
            }}
          >
            <h2 style={{color:'teal',textTransform: 'capitalize'}}>{user.name}</h2>
            <p>Email :{user.email}</p>
            <p>Address: {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
            <p>Company: {user.company.name} {user.company.catchPhrase} {user.company.bs}</p>
          </div>
        ))}
      </div>
      {selectedUser  && (
        <div>
          <h2 style={{color:'teal'}}>Posts by User {selectedUser }</h2>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <h1 style={{fontWeight:'bold',marginTop:'5px',textTransform: 'capitalize'}}>{post.title}</h1>
                  <p style={{textTransform: 'capitalize'}}>{post.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts found for this user.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;