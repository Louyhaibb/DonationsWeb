import './App.css';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import DonatorSignUp from './views/DonatorSignUp';
import NeedySignUp from './views/NeedySignUp';
import AdminSignIn from './views/AdminSignIn';
import { getHomeRouteForLoggedInUser, getUserData } from './utils/Utils';
import AdminDashboard from './views/AdminDashboard';
import RequiredUser from './components/RequiredUser';
import CreateItem from './views/donator/CreateItem';
import ItemList from './views/donator/ItemList';
import UpdateItem from './views/donator/UpdateItem';

const App = () => {
  const HomeRoute = () => {
    const user = getUserData();
    if (user) {
      const getHomeRoute = () => {  
        return getHomeRouteForLoggedInUser(user.role);
      };
    
      return <Navigate replace to={getHomeRoute()} />;
    } else {
      return <Home />
    }
    
  };
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeRoute />} />
          <Route element={<RequiredUser allowedRoles={['admin']} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<RequiredUser allowedRoles={['donator']} />}>
            <Route path="donator/items" element={<ItemList />} />
            <Route path="donator/items/create-item" element={<CreateItem />} />
            <Route path="donator/items/update-item/:id" element={<UpdateItem />} />
          </Route>
        </Route>
        <Route path="admin/sign-in" element={<AdminSignIn />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="donator-signup" element={<DonatorSignUp />} />
        <Route path="needy-signup" element={<NeedySignUp />} />
      </Routes>
    </Suspense>
  );
}

export default App;
