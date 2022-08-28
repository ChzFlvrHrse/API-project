import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createGroupThunk } from "../../store/group";
import "./CreateGroup.css"

function CreateGroup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [type, setType] = useState('In person');
  const [privateStat, setPrivateStat] = useState('private');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const [errorValidation, setErrorValidations] = useState([])


  // if (!sessionUser) {
  //   window.alert("Login to create event")
  //   history.push('/login')
  // }

  useEffect((e) => {
    let errors = []

    if (name.length === 0) errors.push('Name must be greater than 0 characters');
    if (name.length > 60) errors.push('Name must be less than 60 characters')

    if (about.length > 1000) errors.push('About must be less than 1000 characters');
    if (about.length < 50) errors.push('About must be more than 50 characters')

    if (type !== 'In person' && type !== 'Online') errors.push('Type must be In person or Online');
    if (privateStat.toLowerCase() !== 'private' && privateStat.toLowerCase() !== 'public') errors.push('Group status must be either Private Group or Public Group');

    if (city.length === 0) errors.push('City must be greater than 0 characters');
    if (city.length > 1000) errors.push('City must be less than 1000 characters')

    if (state.length === 0) errors.push('State must be more than 0 characters');
    if (state.length > 1000) errors.push('State must be less than 1000 characters')

    if (previewImg.length > 1000) errors.push('Preview image must be less than 1000 charcters');

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
        <input
          onChange={event => setState(event.target.value)}
          value={state}
        >
        </input>
        <label>
          Preview Image
        </label>
        <input
          type='text'
          onChange={event => setPreviewImg(event.target.value)}
          value={previewImg}
        >
        </input>
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
