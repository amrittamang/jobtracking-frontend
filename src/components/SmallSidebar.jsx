import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { sidebarAction } from '../store/sidebar-slice';

import Logo from './Logo'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
    const { showSidebar } = useSelector(state => state.sidebar);
    const dispatch = useDispatch()
    return (
        <Wrapper>
            <div
                className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}
            >
                <div className='content'>
                    <button type='button' className='close-btn' onClick={() => dispatch(sidebarAction.toggleSidebar())}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper >
    )
};

export default SmallSidebar;