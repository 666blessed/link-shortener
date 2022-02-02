import {Routes, Route, Navigate} from 'react-router-dom';
import LinksPage from './Pages/LinksPage';
import CreatePage from './Pages/CreatePage';
import DetailPage from './Pages/DetailPage';
import AuthPage from './Pages/AuthPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/links' element={<LinksPage/>}/>
                <Route path='/create' element={<CreatePage/>}/>
                <Route path='/detail/:id' element={<DetailPage/>}/>
                <Route path='/*' element={<Navigate to='/create' />}/>              
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path='/' element={<AuthPage/>}/>
            <Route path='/*' element={<Navigate to='/' />}/>          
        </Routes>
    );
}