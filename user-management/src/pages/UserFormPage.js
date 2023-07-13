import React, { useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
import { useNavigate, useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUserDetails, fetchUser } from '../reducers/userSlice';

const UserFormPage = () => {
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userList.find((u) => u.id === parseInt(id)));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, phone };
    if (id) {
      dispatch(updateUserDetails(id, userData));
    } else {
      dispatch(addUser(userData));
    }
    history.push('/');
  };

  return (
    <div>
      <h1>{id ? 'Update User' : 'Create User'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserFormPage;
