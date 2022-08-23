import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { newEventThunk } from "../../store/events";

function CreateGroup() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [type, setType] = useState('In person');
  const [privateStat, setPrivateStat] = useState('private');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const [errorValidation, setErrorValidations] = useState([])



  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  // if (!sessionUser) {
  //   window.alert("Login to create event")
  //   history.push('/login')
  // }

  useEffect((e) => {
    let errors = []

    if (name.length > 60 || name.length === 0) errors.push('Name must be greater than 0 and less than 60 characters');
    if (about.length < 50 || about.length > 1000) errors.push('About must be more than 50 characters and less than 1000');
    if (type !== 'In person' && type !== 'Online') errors.push('Type must be In person or Online');
    if (privateStat.toLowerCase() !== 'private' && privateStat.toLowerCase() !== 'public') errors.push('Group status must be either Private Group or Public Group');
    if (city.length === 0 || city.length > 1000) errors.push('City must be greater than 0 but less than 1000 characters');
    if (state.length === 0 || state.length < 1000) errors.push('State must be more than 0 characters and less than 1000');
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


  }
}
