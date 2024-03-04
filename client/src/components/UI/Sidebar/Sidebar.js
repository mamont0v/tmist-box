import './Sidebar.styles.scss'
import { Link } from 'react-router-dom'
import logo from '../../../images/logo-new.svg'
import avatar from '../../../images/avatar.png';
import { FiActivity } from 'react-icons/fi'
import { FiAlertTriangle } from 'react-icons/fi'
import { FiClock } from 'react-icons/fi'
import { FiDatabase } from 'react-icons/fi'


export const Sidebar = () => {
    return (
        <aside className="main-sidebar sidebar-fixed">
            <div className="sidebar-brand">
                <Link to="/">
                    <img src={logo} />
                </Link>
            </div>
            <div className="sidebar-inner">
                <ul className="icon-menu">
                    <li>
                        <Link to="#">
                            <FiActivity className="sidebar-svg router-link-active" />
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <FiClock className="sidebar-svg" />
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="disable">
                            <FiAlertTriangle className="sidebar-svg disable" />
                        </Link>
                    </li>
                </ul>

                <ul className="bottom-menu">
                    <li>
                        <Link to="#">
                            <FiDatabase className="sidebar-svg disable" />
                        </Link>
                    </li>
                    <li id="user-menu">
                        <div id="profile-menu" className="dropdown">
                        <img src={avatar} />
                            <span className="status-indicator"></span>
                        </div>

                    </li>

                </ul>
            </div>
        </aside>
    )
}