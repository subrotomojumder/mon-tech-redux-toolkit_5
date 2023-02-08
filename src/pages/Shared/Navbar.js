import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-blue-300">
                <div className="flex-1">
                    <Link to='/'><p className="btn btn-ghost normal-case text-xl">Moon Tech</p></Link>
                </div>
                <div>
                    <input type="text" placeholder="Type here" className="input-bordered input-error w-48" />
                    <button className='btn btn-xs '>search</button>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 mr-4">
                        <Link to='/'><li className='btn btn-ghost'>Home</li></Link>
                        <Link to='/create-user'><li className='btn btn-ghost'>Create user</li></Link>
                        <Link to='users'><li className='btn btn-ghost' tabIndex={0}>Users</li></Link>
                        <Link to='add-to-cart'><li className='btn btn-ghost' tabIndex={0}>Added-cart<sup>5</sup></li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;