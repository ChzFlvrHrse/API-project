import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getGroupsThunk } from "../../store/group";
import "./GroupById.css";

function GroupById() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams()
  const groups = useSelector(state => state.groups.entries)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getGroupsThunk());
  }, [dispatch])

  if (!groups) {
    return (
      <div>Loading</div>
    )
  }

  const targetEvent = groups.find(group => group.id.toString() === params.id);

  let image;
  let privacyStatus;

  if (targetEvent?.Images?.length > 1) {
    image = targetEvent.Images[0].url
  } else {
    image = 'https://www.travelandleisure.com/thmb/lZeCZo1hq_41edFv-hEop-VtQ-w=/1600x1200/smart/filters:no_upscale()/red-pink-orange-purple-sunset-WHYCOLORS1220-7684b47c858b4e1e9d73018e213c7ff3.jpg'
  }

  if (targetEvent.private) {
    privacyStatus = 'Private'
  } else {
    privacyStatus = 'Public'
  }

  return (
    <>
      <div className="top-container">
        <div>
          <img className="group-img" src={image}/>
        </div>
        <div className="group-info">
          <h2>{targetEvent?.name}</h2>
          <div>

            <h5 className="group-tag"><i class="fa-solid fa-users"></i>{`${privacyStatus} Group`}</h5>
            <h5 className="group-tag"><i class="fa-solid fa-location-dot"></i>{`${targetEvent?.numMembers} members · ${targetEvent.city}`}</h5>
            {/* <h5 className="group-tag"><i class="fa-solid fa-user"></i>{`Organized by ${user?.username}`}</h5> */}
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="what-about">
          <h3>What we're about</h3>
          <p id='about'>{targetEvent?.about}</p>
        </div>
        <div id='organizer'>
          {/* <h3>Organizer</h3> */}
          {/* <h5>{user?.username}</h5> */}
        </div>
      </div>
    </>
  )
}

export default GroupById;
