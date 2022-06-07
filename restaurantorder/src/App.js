import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import PrivateRoute from "./private_route";

//components
import Main from './components/Main';
import ManageFoods from './components/administration/ManageFoods';
import ManageDrinks from './components/administration/ManageDrinks';
import ManageExtra from './components/administration/ManageExtra';

//edit components
import EditFood from './components/administration/EditFood';
import EditDrink from './components/administration/EditDrink';
import EditExtra from './components/administration/EditExtra';

//auth
import Login from './components/administration/Login';

//public pages
import PublicMain from './components/PublicMain';
import PublicFoods from './components/PublicFoods';
import PublicDrinks from './components/PublicDrinks';
import PublicExtras from './components/PublicExtras';
import Cart from './components/Cart';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes >
          {/*PUBILIC ROUTES */}
          <Route path={"/"} element={<PublicMain/>}/>
          <Route path={"/foods"} element={<PublicFoods/>}/>
          <Route path={"/drinks"} element={<PublicDrinks/>}/>
          <Route path={"/extras"} element={<PublicExtras/>}/>
          <Route path={"/cart"} element={<Cart/>}/>
          <Route path={"/login"} element={<Login/>}/>
          {/*Auth routes  */}
          <Route path={"/manageMain"} element={<PrivateRoute><Main/></PrivateRoute>}/>
          <Route path={"/manageFoods"} element={<PrivateRoute><ManageFoods/></PrivateRoute>}/>
          <Route path={"/manageDrinks"} element={<PrivateRoute><ManageDrinks/></PrivateRoute>}/>
          <Route path={"/manageCakes"} element={<PrivateRoute><ManageExtra/></PrivateRoute>}/>

          <Route path={"/edit_food/:id"} element={<PrivateRoute><EditFood/></PrivateRoute>}/>
          <Route path={"/edit_drink/:id"} element={<PrivateRoute><EditDrink/></PrivateRoute>}/>
          <Route path={"/edit_extra/:id"} element={<PrivateRoute><EditExtra/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
