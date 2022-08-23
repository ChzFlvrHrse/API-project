import { useDispatch, useSelector } from 'react-redux'
import GroupRoll from '../GroupRoll';

function Groups() {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups.entries)

  console.log('your groups', groups)
  if (!groups) return null

  console.log('your groups', groups)
  // console.log(typeof events[0].Events)
  return (
    <div>
      {groups.map(group => (
        <GroupRoll group={group} key={group.id} />
      ))}
    </div>
  )
}

export default Groups;
