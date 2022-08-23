import { useDispatch, useSelector } from 'react-redux'
import GroupRoll from '../GroupRoll';

function Groups() {
  const groups = useSelector(state => state.groups.entries)

  if (!groups) return null

  return (
    <div>
      {groups.map(group => (
        <GroupRoll group={group} key={group.id} />
      ))}
    </div>
  )
}

export default Groups;
