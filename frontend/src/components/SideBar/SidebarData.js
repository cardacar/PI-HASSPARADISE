import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import {FaBong, FaTree, FaPoop, FaDollyFlatbed, FaSignOutAlt, FaCloudSunRain} from 'react-icons/fa'
import React from 'react'

//array de obtjetos que contendran la data del sidebar
export const SidebarData = [
    {
        title: "Home",
        icon: <GroupWorkIcon/>,
        link: "/home"
    },
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
        title: "Siembra",
        icon: <FaTree/>,
        link: "/admin/Siembra"
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
        link:"/admin/Precipitacion"
    },
    {
        title:"Enfermedades",
        icon: <FaSignOutAlt/>,
        link:"/admin/Precipitacion"
    },
    {
        title:"Herbicidas",
        icon: <FaSignOutAlt/>,
        link:"/admin/Precipitacion"
    },
    {
        title:"Calibracion Equipos",
        icon: <FaSignOutAlt/>,
        link:"/admin/Precipitacion"
    },
    {
        title:"Cosechas",
        icon: <FaSignOutAlt/>,
        link:"/admin/Precipitacion"
    },
    {
        title:"Uso de energia",
        icon: <FaSignOutAlt/>,
        link:"/admin/Precipitacion"
    },
    {
        title:"Balance de masas",
        icon: <FaSignOutAlt/>,
        link:"/admin/Precipitacion"
    },
    {
        title:"Norma Frac e irac",
        icon: <FaSignOutAlt/>,
        link:"/admin/Precipitacion"
    },
    {
        title:"Limpieza y desinfeccion",
        icon: <FaSignOutAlt/>,
        link:"/admin/Precipitacion"
    },
    {
        title:"Monitoreo",
        icon: <FaSignOutAlt/>,
        link:"/admin/Precipitacion"
    },
]
export const SidebarDataUser = [
    {
        title: "Home",
        icon: <GroupWorkIcon/>,
        link: "/home"
    },
    {
        title: "Fertilizacion",
        icon: <FaPoop/>,
        link: "/user/Fertilizacion"
    },
    {
        title: "Siembra",
        icon: <FaTree/>,
        link: "/user/Siembra"
    },
    {
        title: "Fumigacion",
        icon: <FaBong/>,
        link: "/user/Fumigacion"
    },
    {
        title: "Inventario",
        icon: <FaDollyFlatbed/>,
        link: "/user/Inventario"
    },
    {
        title: "Precipitacion",
        icon: <FaCloudSunRain/>,
        link: "/user/Precipitacion"
    },
    {
        title:"Cerrar sesion",
        icon: <FaSignOutAlt/>,
        link:"/logOut"
    }
]
