// import navlink icons from react-icons
import { RiFileList2Line, RiHome3Line } from "react-icons/ri";
import { IoIosFitness } from "react-icons/io";
import { FiHelpCircle } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

// import react components
import { NavLink } from "react-router-dom";

const Navigation = (): JSX.Element => {
  return (
    <main className="navigation__wrapper">
      <div className="navigation__container">
        <nav className="navigation__container--nav">
          <ul className="navigation__container--nav-list">
            <li className="navigation__container--nav-list-item">
              <NavLink to="/home">
                <RiHome3Line className="react-icon" />
              </NavLink>
              <p>Home</p>
            </li>
            <li className="navigation__container--nav-list-item">
              <NavLink to="/notes">
                <RiFileList2Line className="react-icon" />
              </NavLink>
              <p>Notes</p>
            </li>
            <li className="navigation__container--nav-list-item">
              <NavLink to="/workout">
                <IoIosFitness className="react-icon" />
              </NavLink>
              <p>Workout</p>
            </li>
            <li className="navigation__container--nav-list-item">
              <NavLink to="/profile">
                <CgProfile className="react-icon" />
              </NavLink>
              <p>Profile</p>
            </li>
            <li className="navigation__container--nav-list-item">
              <NavLink to="/help">
                <FiHelpCircle className="react-icon" />
              </NavLink>
              <p>Help</p>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default Navigation;
