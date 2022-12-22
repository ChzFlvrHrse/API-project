import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <div className="user-icon" onClick={openMenu}>
        {/* <i class="fas fa-user-circle" /> */}
        <div className="prof-pic">
          {user.profileImg.length ? <img src={user.profileImg} /> : <i class="fas fa-user-circle" />}
        </div>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div id='prof-container'>
            <div className="user-text">Username: {user.username}</div>
            <div className="user-text">Email: {user.email}</div>
            <div className="user-text">
              <button className='logout-button' onClick={logout}>Log Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
