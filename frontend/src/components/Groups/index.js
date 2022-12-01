import { useSelector } from 'react-redux'
import GroupRoll from '../GroupRoll';
import "./Groups.css"

function Groups() {
  const groups = useSelector(state => state.groups.entries)

  if (!groups) return null

  return (
    <div id="groups">
      {groups.map(group => (
        <GroupRoll group={group} key={group.id} />
      ))}
    </div>
  )
}

export default Groups;
