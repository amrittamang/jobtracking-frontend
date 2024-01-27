import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sidebarAction } from '../store/sidebar-slice';
import { accountAction } from '../store/account-slice';

const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false)
    const { user } = useSelector(state => state.account);
    const dispatch = useDispatch();


    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={() => dispatch(sidebarAction.toggleSidebar())}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className='logo-text'>dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button type='button' className='dropdown-btn' onClick={() => dispatch(accountAction.logOutUser())}>
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar
