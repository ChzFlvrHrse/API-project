import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { SearchBar } from './SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className="login-signup">
          <div >
            <NavLink className='login' to="/login">Log in</NavLink>
          </div>

          <div >
            <NavLink className='signup' to="/signup">Sign up</NavLink>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="nav">
      <div className='logo-search'>
        <div>
          <NavLink id="logo" exact to="/">MetUp</NavLink>
        </div>
        <div className='search-bar'>
          <SearchBar />
        </div>
      </div>
      <div className='user'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation
