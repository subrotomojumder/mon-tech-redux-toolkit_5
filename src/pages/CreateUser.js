import React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, togglePostSuccess } from '../app/features/users/userSlice';

const CreateUser = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, postSuccess, error } = useSelector((state) => state.users)

    // console.log(users)
    const handleCreateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const number = e.target.phone.value;
        const user = { name, email, number };
        dispatch(addUser(user));
    }
    
    useEffect(() => {
        if (isLoading) {
            toast.loading("Posting...", { id: "addUser" });
        }
        if (!isLoading && postSuccess) {
            toast.success("User added", { id: "addUser" });
            dispatch(togglePostSuccess())
        }
        if (!isLoading && isError) {
            toast.error(error, { id: "addUser" })
        }
    }, [isError, isLoading, postSuccess, isError])
    return (
        <div className='min-h-screen bg-indigo-100'>
            <div className='w-96 mx-auto pt-20'>
                <form onSubmit={handleCreateUser} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name='name' required type="text" placeholder="name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone number</span>
                        </label>
                        <input name='phone' required type="text" placeholder="user phone" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name='email' required type="email" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        </div >
    );
};

export default CreateUser;