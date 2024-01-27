import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import { sidebarAction } from '../store/sidebar-slice';
import { useDispatch } from 'react-redux';

const NavLinks = () => {
  const dispatch = useDispatch();
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={() => dispatch(sidebarAction.toggleSidebar())}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
