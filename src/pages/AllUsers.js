import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, removeUser } from '../app/features/users/userSlice';

const AllUsers = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, deleteSuccess, error, users } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect(()=> {
        if(!isLoading && deleteSuccess){
            toast.success("successfully removed")
        }
    }, [isLoading, deleteSuccess])

    if (isLoading) {
        return <h2 className='my-4 text-2xl'>Loading......</h2>
    }

    return (
        <div>
            <h1 className="3xl">All users</h1>
            <div className="w-[500px] mx-auto">
                {
                    users?.map((user, i) => <div key={user._id} className='flex justify-between mx-2 border px-4 rounded-lg my-3 bg-slate-100 p-3'>
                        <h2 className='font-bold text-green-600'>{user.name}</h2>
                        <h5 className='font-semibold'>Email: {user.email}</h5>
                        <h5 className='text-blue-400'>ID:{i}</h5>
                        <button
                            onClick={() => dispatch(removeUser(user._id))}
                            className='btn btn-circle btn-sm btn-ghost'
                        ><FaTrash></FaTrash></button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllUsers;