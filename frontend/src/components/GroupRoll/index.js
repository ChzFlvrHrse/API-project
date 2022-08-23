import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './GroupRoll.css'

function GroupRoll({group}) {
  const user = useSelector(state => state.session.user)

  if (!group) return null

  return (
    <div className='event-roll-container'>
      <div>
        {group.name}
      </div>
      <div>
        {group.about}
      </div>
      <div>
        {user.id === group.organizerId ? <Link to={`/groups/${group.id}/events`}>Create Event for this Group</Link>:<></>}
      </div>
    </div>
  )
}

export default GroupRoll;
