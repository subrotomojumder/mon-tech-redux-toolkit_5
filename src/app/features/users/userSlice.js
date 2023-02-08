import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser, fetchUsers, postUser } from "./usersAPI";

const initialState = {
    users: [],
    postSuccess: false,
    deleteSuccess: false,
    isLoading: false,
    isError: false,
    error: ""
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
    const users = fetchUsers();
    return users;
})

export const addUser = createAsyncThunk("users/addUser", async (data) => {
    const user = postUser(data);
    return user;
});

export const removeUser = createAsyncThunk(
    "users/removeUser",
    async (id, thunkAPI) => {
        const user = await deleteUser(id);
        thunkAPI.dispatch(removeFromList(id))
        return user;
    });

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },
        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        removeFromList: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
            state.isError = false;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.users = [];
            state.isError = true;
            state.error = action.error.message;
        });
        // user post create action
        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading = true;
            state.postSuccess = false;
            state.isError = false;
        });
        builder.addCase(addUser.fulfilled, (state) => {
            state.isLoading = false;
            state.postSuccess = true;
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.users = [];
            state.isLoading = false;
            state.postSuccess = false;
            state.isError = true;
            state.error = action.error.message;
        });
        // user remove action
        builder.addCase(removeUser.pending, (state) => {
            state.isLoading = true;
            state.deleteSuccess = false;
            state.isError = false;
        });
        builder.addCase(removeUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.deleteSuccess = true;
            state.isError = false;
        });
        builder.addCase(removeUser.rejected, (state, action) => {
            state.isLoading = false;
            state.deleteSuccess = false;
            state.isError = true;
            state.error = action.error.message
        });
    }
})

export const { togglePostSuccess, deleteSuccess, removeFromList } = userSlice.actions;
export default userSlice.reducer;