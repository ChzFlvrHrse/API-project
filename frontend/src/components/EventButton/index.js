import { useHistory } from 'react-router-dom';
import './EventButton.css'

function EventButton() {
  const history = useHistory();

  const reroute = () => {
    history.push('/groups/create')
  }

  return (
    <div className='events-container' id='group-button-container'>
      <button onClick={reroute} className="group-button">Create Group</button>
    </div>
  )
}

export default EventButton;
