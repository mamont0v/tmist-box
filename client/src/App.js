import { MainContent } from './components/UI/MainContent/MainContent';
import { Sidebar } from './components/UI/Sidebar/Sidebar.js';
import { SidebarMenu } from './components/UI/Sidebar/SidebarMenu/SidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './redux/auth/auth.action.js';
import { Loader } from './components/Loader/Loader.js';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const { loading, isAuth } = fetchData;


  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch, token]); // Добавляем зависимости useEffect

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
      <div className="default-layout sidebar-default">
        <Sidebar />
        <SidebarMenu />
        <MainContent isAuthenticated={isAuth} />
      </div>
  );
}

export default App;
