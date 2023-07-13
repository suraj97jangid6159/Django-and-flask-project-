import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers,deleteUserById } from '../reducers/userSlice';

const UserListPage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUserById(userId));
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>User List</h1>
      <Link to="/users/add">Add User</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <Link to={`/users/${user.id}`}>View</Link>
              </td>
              <td>
                <Link to={`/users/${user.id}/edit`}>Edit</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
