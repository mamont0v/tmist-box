// import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './PageTitle.styles.scss'
import { AiOutlineMenu } from "react-icons/ai"
import { toggleSidebarMenu } from '../../redux/menu-sidebar/sidemenu.action'
import { BiLogIn } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { logout } from '../../redux/auth/auth.action.js';
import { initialSidebarMenu } from '../../redux/menu-sidebar/sidemenu.action';
import { useNavigate } from 'react-router-dom';
// import avatarLogo from '../../images/Circle-Loading.svg'


export const PageTitle = () => {
    // const [menuSidebar, toggleMenuSidebar] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate(); // для программной навигации
    const sidebarMenu = useSelector(state => state.sidebarMenu);
    const { hidden } = sidebarMenu;

    const handleLogout = () => {
        dispatch(logout()); // Вызовите действие logout
        dispatch(initialSidebarMenu()); // Диспатчим CLEAN для сброса состояния меню
        navigate('/'); // Перенаправьте пользователя на страницу входа или на любую другую страницу
    };

    return (
        <div className="page-title has-text-centered">
            <div className="hamburger-title"
                onClick={() => dispatch(toggleSidebarMenu())}>
                {hidden ? <AiOutlineMenu className='menu-toggle' /> : <BsX className='menu-toggle' />
                }
            </div>
            <div className="title-wrap">
                <h1 className="title is-4">
                    Главная
                </h1>
            </div>
            <div className="toolbar ml-auto">
                <div className="toolbar-link">

                    <div onClick={handleLogout}>
                        <BiLogIn className="sidebar-svg router-link-active" />
                    </div>

                </div>

            </div>
        </div>
    )
}





