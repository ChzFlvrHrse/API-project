import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createGroupThunk } from "../../store/group";
import { Link } from "react-router-dom";
import "./CreateGroup.css"

function CreateGroup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [type, setType] = useState('');
  const [privateStat, setPrivateStat] = useState('private');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const [errorValidation, setErrorValidations] = useState([])

  useEffect((e) => {
    let errors = []

    if (name.length <= 2) errors.push('Name must be greater than 3 characters');
    if (name.length > 60) errors.push('Name must be less than 60 characters')

    if (about.length > 1000) errors.push('About must be less than 1000 characters');
    if (about.length < 50) errors.push('About must be more than 50 characters')

    if (type !== 'In person' && type !== 'Online') errors.push('Type must be In person or Online');
    if (privateStat.toLowerCase() !== 'private' && privateStat.toLowerCase() !== 'public') errors.push('Group status must be either Private Group or Public Group');

    if (city.length === 0) errors.push('City must be greater than 0 characters');
    if (city.length > 1000) errors.push('City must be less than 1000 characters')

    if (state.length === 0) errors.push('State must be more than 0 characters');
    if (state.length > 1000) errors.push('State must be less than 1000 characters')

    setErrorValidations(errors)
  }, [name, about, type, privateStat, city, state, previewImg]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let isPrivate = privateStat.toLowerCase() === 'private';

    const newGroup = {
      organizerId: sessionUser.id,
      name,
      about,
      type,
      private: isPrivate,
      city,
      state,
      previewImg
    }

    const errors = [];

    const createdGroup = await dispatch(createGroupThunk(newGroup));
    if (createdGroup.errors) {
      const errList = Object.values(createdGroup.errors)
      const flatten = [...errList]
      flatten.map(e => errors.push(e.msg))
      setErrorValidations(errors)
    } else { history.push(`/groups`) }
  }

  if(!sessionUser) {
    return (
      <div>You are not authorized to access this page. <Link to='/login'>Click here to login</Link></div>
    )
  }

  return (
    <div>
      <h1 className="new-group">Create Your New Group!</h1>

      <form
        onSubmit={handleOnSubmit}
      >
        <div className="errors">
          {errorValidation.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label>
          Name:
        </label>
        <input
          type='text'
          onChange={event => setName(event.target.value)}
          value={name}
        ></input>
        <label>
          About:
        </label>
        <textarea
          type='text'
          onChange={event => setAbout(event.target.value)}
          value={about}
          placeholder='Must be more than 50 characters'
          rows='5'
          cols='40'
        >
        </textarea>
        <label>
          Type:
        </label>
        <select
          onChange={event => setType(event.target.value)}
          value={type}
        >
          <option value="">Choose Type</option>
          <option>Online</option>
          <option>In person</option>
        </select>
        <label>
          Private:
        </label>
        <input
          onChange={event => setPrivateStat(event.target.value)}
          value={privateStat}
        >
        </input>
        <label>
          City:
        </label>
        <input
          onChange={event => setCity(event.target.value)}
          value={city}
        >
        </input>
        <label>
          State:
        </label>
        <select
          onChange={event => setState(event.target.value)}
          value={state}
        >
          <option value="">Choose State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">DC</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <button
          type='submit'
          disabled={errorValidation.length > 0 ? true : false}
          className='create-button'
        >Create Group</button>
      </form>
    </div>
  )
}

export default CreateGroup;
