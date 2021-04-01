import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogout());
    }
    
    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>
                {auth.user.name}
            </span>
            <button className='btn btn-outline-danger'>
                <span className="fas fa-sign-out-alt" onClick={handleLogout}> Salir</span>
            </button>
        </div>
    )
}
