import { createSlice } from '@reduxjs/toolkit';
import { getUsers, createUser, getUser, updateUser, deleteUser } from '../api/userApi';

const initialState = {
    userList: [],
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsersStart: (state) => {
            state.loading = true;
        },
        getUsersSuccess: (state, action) => {
            state.loading = false;
            state.userList = action.payload;
        },
        getUsersFailure: (state) => {
            state.loading = false;
        },
        createUserStart: (state) => {
            state.loading = true;
        },
        createUserSuccess: (state, action) => {
            state.loading = false;
            state.userList.push(action.payload);
        },
        createUserFailure: (state) => {
            state.loading = false;
        },
        getUserStart: (state) => {
            state.loading = true;
        },
        getUserSuccess: (state, action) => {
            state.loading = false;
            state.userList = action.payload;
        },
        getUserFailure: (state) => {
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.loading = false;
            const updatedUser = action.payload;
            state.userList = state.userList.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            );
        },
        updateUserFailure: (state) => {
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            const userId = action.payload;
            state.userList = state.userList.filter((user) => user.id !== userId);
        },
        deleteUserFailure: (state) => {
            state.loading = false;
        },
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
} = userSlice.actions;

export const fetchUsers = () => async(dispatch) => {
    try {
        dispatch(getUsersStart());
        const users = await getUsers();
        dispatch(getUsersSuccess(users));
    } catch (error) {
        dispatch(getUsersFailure());
    }
};

export const addUser = (userData) => async(dispatch) => {
    try {
        dispatch(createUserStart());
        const user = await createUser(userData);
        dispatch(createUserSuccess(user));
    } catch (error) {
        dispatch(createUserFailure());
    }
};

export const fetchUser = (userId) => async(dispatch) => {
    try {
        dispatch(getUserStart());
        const user = await getUser(userId);
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure());
    }
};

export const updateUserDetails = (userId, userData) => async(dispatch) => {
    try {
        dispatch(updateUserStart());
        const user = await updateUser(userId, userData);
        dispatch(updateUserSuccess(user));
    } catch (error) {
        dispatch(updateUserFailure());
    }
};

export const deleteUserById = (userId) => async(dispatch) => {
    try {
        dispatch(deleteUserStart());
        await deleteUser(userId);
        dispatch(deleteUserSuccess(userId));
    } catch (error) {
        dispatch(deleteUserFailure());
    }
};

export default userSlice.reducer;