import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddCategory } from '../../pages/admin/AddCategory'
import AddFood from '../../pages/admin/AddFood'

import Home from '../../pages/admin/Home'
import { Orders } from '../../pages/admin/Orders'
import UserDetails from '../../pages/admin/UserDetails'

import { ViewCategory } from '../../pages/admin/ViewCategory'
import ViewFood from '../../pages/admin/ViewFood'


const NavPage = () => {

    return (

        <div>
            <Routes>
                <Route path='/home' element={<Home />}></Route>
                <Route path='addCategory' element={<AddCategory />}></Route>
                <Route path='viewCategory' element={<ViewCategory />}></Route>
                <Route path='addFood' element={<AddFood />}></Route>
                <Route path='viewFood' element={<ViewFood />}></Route>
                <Route path='orders' element={<Orders />}></Route>
                <Route path='users' element={<UserDetails />}></Route>

            </Routes>

        </div>

    )
}

export { NavPage };
