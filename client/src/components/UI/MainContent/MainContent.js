import { Footer } from '../Footer/Footer'
import './MainContent.styles.scss'
import { Personnel } from '../../../pages/assets/personnel/Personnel'
import { Routes, Route, Link } from 'react-router-dom';
// import { Login } from '../../../pages/login/Login'
import { Equipments } from '../../../pages/assets/equipments/Equipments'
import { ItAssets } from '../../../pages/assets/it-assets/ItAssets'
import { Entity } from '../../../pages/overview/entity/Entity'
import UpdatableEdge from '../../../pages/workflow/process-grading/ProcessGrading'
import { Activities } from '../../../pages/assets/activities/Activities'
import { CategorizationCommission } from '../../../pages/workflow/categorization-commission/СategorizationСommission'
import { useSelector } from 'react-redux'
// import { AuthJwt } from '../../../screens/AuthJwt.js';
// import {ContentLayout} from './../ContentLayout/ContentLayout'
import { Home } from '../../../pages/home/Home';
import { Language } from '../../../pages/sast/Language';
import Products from '../../../pages/products/Products';
import LoginForm from '../../LoginForm/LoginForm';
import LoginOrRegister from '../../LoginOrRegister/LoginOrRegister';

export const MainContent = ({ isAuthenticated }) => {
    const sidebarMenu = useSelector(state => state.sidebarMenu)
    const { hidden } = sidebarMenu


    return (
        <div className={hidden ? `view-wrapper` : `is-pushed-full view-wrapper`}>
            <div className="page-content-wrapper">
                <main className="page-content">
                    {isAuthenticated ? (
                        <Routes>
                            <Route exact path='/' element={<Home />} />
                            <Route exact path='/products' element={<Products />} />
                            {/* <Route exact path='/login' element={<Login />} /> */}
                            {/* <Route exact path='/sast/language' element={<Language />} /> */}
                            <Route exact path='/assets/personnel' element={<Personnel />} />
                            <Route exact path='/assets/equipments' element={<Equipments />} />
                            <Route exact path='/assets/it-assets' element={<ItAssets />} />
                            <Route exact path='/overview/entity' element={<Entity />} />
                            <Route exact path='/assets/activities' element={<Activities />} />
                            <Route exact path='/assets/equipments' element={<Equipments />} />
                            <Route exact path='/workflow/process-grading' element={<UpdatableEdge />} />
                            <Route exact path='/workflow/categorization-commission' element={<CategorizationCommission />} />

                        </Routes>
                    ) : (
                        <>
                            <LoginOrRegister />
                            {/* <LoginForm />
                            <div style={{ marginTop: "10px" }}>
                                Нет аккаунта? <Link to="/signup">Зарегистрируйтесь</Link>
                            </div> */}
                        </>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    )
}