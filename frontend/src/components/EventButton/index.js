import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './GroupButton.css'

function EventButton() {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const reroute = () => {
    history.push('/groups/create')
  }

  return (
    <div className='events-container' id='group-button-container'>
      {sessionUser ? <button onClick={reroute} className="group-button">Create Group</button> : <></>}
    </div>
  )
}

export default EventButton;
