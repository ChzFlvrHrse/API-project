import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteGroupThunk } from '../../store/group';
import './GroupRoll.css'


function GroupRoll({ group }) {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    history.push('/groups')
    await dispatch(deleteGroupThunk(group.id))
  }

  console.log(group.id)

  if (!group) return null

  return (
    <>
      <div className='event-roll-container'>
        <div>
          {group.name}
        </div>
        <div>
          {group.about}
        </div>
        <div>
          {user?.id === group.organizerId ? <Link to={`/groups/${group.id}/events`}>Create Event for this Group</Link> : <></>}
        </div>
        <div>
          {user?.id === group.organizerId ? <button onClick={handleDelete}>Delete Group</button> : <></>}
        </div>
      </div>
      <div>
        <Link to='/groups/create'>Create Group</Link>
      </div>
    </>
  )
}

export default GroupRoll;
