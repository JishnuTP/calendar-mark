import React from 'react'
import {Route} from "react-router-dom"
import RegisterPage from '../pages/Register'
import Login from '../pages/login'
import CalendarPage from '../pages/calendarPage'
import AttendanceRecordsPage from '../pages/AttendanceRecordPage'
import AdminPage from '../pages/adminPage'



function UserRoute() {
    return (
        <>
            
             <Route path="/" element = {<Login/>}/>
             <Route path="/register" element ={<RegisterPage/>}/>
             <Route path="/calendar" element = {<CalendarPage/>}/>
             <Route path="/attendance" element={<AttendanceRecordsPage/>} />
             <Route path="/admin" element={<AdminPage/>} />

        </>
        
    )
}

export default UserRoute
