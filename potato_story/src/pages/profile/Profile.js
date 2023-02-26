import React from 'react'
import "./Profile.css"
import { Outlet } from 'react-router-dom';

const Profile = () => {
  return (
      <div className="profile">
        <Outlet />
      </div>

  )
}

export default Profile