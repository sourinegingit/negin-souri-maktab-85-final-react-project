import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import MainHeader from './MainHeader'
import PanelAdminHeader from './PanelAdminHeader'

const Layout = () => {
    let location=useLocation()
    let navigate=useNavigate()
    useEffect(()=>{
        if (location.pathname==='/') {
            navigate('/home')
        }
    },[location])
  return (
    <>
      {location.pathname.includes('panelAdmin')?
      (<PanelAdminHeader/>):
      (<MainHeader/>)}
      <Outlet/>
    </>
  )
}

export default Layout
