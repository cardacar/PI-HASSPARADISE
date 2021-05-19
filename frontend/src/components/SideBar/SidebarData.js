import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {FaBong, FaTractor, FaPoop, FaDollyFlatbed, FaSignOutAlt, FaCloudSunRain} from 'react-icons/fa'
import React from 'react'

//array de obtjetos que contendran la data del sidebar
export const SidebarData = [
    {
        title: "Administracion de usuarios",
        icon: <SupervisorAccountIcon/>,
        link: "/admin"
    },
    {
        title: "Fertilizacion",
        icon: <FaPoop/>,
        link: "/admin/Fertilizacion"
    },
    {
        title: "Labores de cultivo",
        icon: <FaTractor/>,
        link: "/admin/LaboresCultivo"
    },
    {
        title: "Fumigacion",
        icon: <FaBong/>,
        link: "/admin/Fumigacion"
    },
    {
        title: "Inventario",
        icon: <FaDollyFlatbed/>,
        link: "/admin/Inventario"
    },
    {
        title: "Precipitacion",
        icon: <FaCloudSunRain/>,
        link: "/admin/Precipitacion"
    },
    {
        title:"Cerrar sesion",
        icon: <FaSignOutAlt/>,
        link:"/logout"
    }
]
