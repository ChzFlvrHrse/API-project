import { Link, NavLink } from "react-router-dom";
import './SubNav.css'

function SubNav() {
  return (
    <>
      <div className='events-container'>
        <div className="roll">
          <NavLink className='events' to='/events' >Events</NavLink>
          <NavLink className="groups" to='/groups'>Groups</NavLink>
        </div>
      </div>
    </>
  )
}

export default SubNav;
