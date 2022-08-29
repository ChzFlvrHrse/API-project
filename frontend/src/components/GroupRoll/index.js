import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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

  const reroute = () => {
    history.push(`/groups/${group.id}/events`)
  }

  let image;
  let privateStatus;

  if (group?.Images?.length >= 1) {
    image = group.Images[0].url;
  } else {
    image = 'https://www.travelandleisure.com/thmb/lZeCZo1hq_41edFv-hEop-VtQ-w=/1600x1200/smart/filters:no_upscale()/red-pink-orange-purple-sunset-WHYCOLORS1220-7684b47c858b4e1e9d73018e213c7ff3.jpg'
  }

  if (group.private) {
    privateStatus = 'Private'
  } else {
    privateStatus = 'Public'
  }

  if (!group) return null

  let location;
  if (group.city && group.state) {
    location = `${group.city}, ${group.state}`
  }

  return (
    <>
      <div className='events-container'>
        <div className='inner-container'>
          <Link exact to={`/groups/${group.id}`}>
            <div className='image-container'>
              <img className='prevImg' src={image} />
            </div>
          </Link>
          <Link exact to={`/groups/${group.id}`}><div className='group-roll-container'>
            <div className='group-name'>
              {group.name}
            </div>
            <div className='location'>
              {location}
            </div>
            <div className='about'>
              <p>
                {group.about}
              </p>
            </div>
            <div className='members'>
              {group.numMembers}{' members · '}{privateStatus}
            </div>
          </div>
          </Link>
          <div>
            {user?.id === group.organizerId ? <button className='create-event' onClick={reroute}>Create Event</button> : <></>}
          </div>
          <div>
            {user?.id === group.organizerId ? <button className='delete-group' onClick={handleDelete}>Delete Group</button> : <></>}
          </div>
        </div>
      </div>
    </>
  )
}

export default GroupRoll;
