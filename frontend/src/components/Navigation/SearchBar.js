import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEventsThunk } from "../../store/events";
import { getGroupsThunk } from "../../store/group";

import './SearchBar.css';

export function SearchBar() {
    const [search, setSearch] = useState('');
    const [eventResults, setEventResults] = useState(true);
    const [groupResults, setGroupResults] = useState(true);

    const dispatch = useDispatch()

    let allEventsArr;
    let filteredEvents;

    let allGroupsArr;
    let filteredGroups;

    useEffect(() => {
        dispatch(getEventsThunk());
    }, [dispatch, search])

    useEffect(() => {
        dispatch(getGroupsThunk());
    }, [dispatch, search])

    // useEffect(() => {
    //     dispatch(getEventsThunk());
    //     dispatch(getGroupsThunk());
    // })

    const allEvents = useSelector(state => state.events.Events);
    const allGroups = useSelector(state => state.groups.entries);


    if (allEvents !== undefined) {
        allEventsArr = Object.values(allEvents);
    }

    if (allGroups !== undefined) {
        allGroupsArr = Object.values(allGroups);
    }

    if (allEventsArr?.length > 0) {
        filteredEvents = allEventsArr?.filter(values => values.name?.toLowerCase().includes(search.toLowerCase()))
    } else {
        filteredEvents = "";
    }

    if (allGroupsArr?.length > 0) {
        filteredGroups = allGroupsArr?.filter(values => values.name?.toLowerCase().includes(search.toLowerCase()))
    } else {
        filteredGroups = "";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    if (allGroupsArr !== null || allEventsArr !== null) {
        return (
            <>
                <div id="search">
                    {/* <i id="spy" class="fa-solid fa-magnifying-glass"></i> */}
                    <input
                        id="search-bar-input"
                        placeholder={"Search for keywords" || search}
                        onChange={handleSubmit}
                        value={search}
                    ></input>
                    {search.length > 0 ? <i class="fa-solid fa-xmark" onClick={() => setSearch("")}></i> : <></>}
                </div>
                <div className="results-parent">
                    <div className={search?.length ? "SearchBarContainer" : "HiddenResult"}>
                        <button
                            className="toggleResultsSearch"
                            onClick={() => {
                                setEventResults(!eventResults);
                            }}
                        >
                            {eventResults === true ? (
                                <div>Hide Events Results</div>
                            ) : (
                                <div>Show Events Results</div>
                            )}
                        </button>
                        <div
                            className={
                                filteredEvents?.length &&
                                    search?.length &&
                                    eventResults === true
                                    ? "Filteredrecipes-container"
                                    : "HiddenResult"
                            }
                        >
                            {/* search return map */}
                            <div className="FilteredreturnContainer">
                                {filteredEvents &&
                                    filteredEvents?.map((event) => {
                                        return (
                                            <div
                                                className="SearchRecipeMappedContainer"
                                                key={event.id}
                                                onClick={() => setSearch("")}
                                            >
                                                <Link to={`/events/${event.id}`}>
                                                    <img
                                                        className="SearchRecipeIndividual"
                                                        src={event.previewImage}
                                                        alt="preview"
                                                    />
                                                </Link>
                                                <Link
                                                    className="SearchRecipeNavLinkTitle"
                                                    to={`/recipe/${event.id}`}
                                                >
                                                    {event.name}
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            !filteredEvents?.length &&
                                search !== "" &&
                                eventResults === true
                                ? "errorHandlingSearchContainer"
                                : "HiddenResult"
                        }
                    >
                        <div className="errorhandlingSearchmessage">No Events Found</div>
                    </div>
                    <div className={search?.length ? "SearchBarContainer" : "HiddenResult"}>
                        <button
                            className="toggleResultsSearch"
                            onClick={() => {
                                setGroupResults(!groupResults);
                            }}
                        >
                            {groupResults === true ? (
                                <div>Hide Groups Results</div>
                            ) : (
                                <div>Show Groups Results</div>
                            )}
                        </button>
                        <div
                            className={
                                filteredGroups?.length &&
                                    search?.length &&
                                    groupResults === true
                                    ? "Filteredrecipes-container"
                                    : "HiddenResult"
                            }
                        >
                            <div className="FilteredreturnContainer">
                                {filteredGroups &&
                                    filteredGroups?.map((group) => {
                                        return (
                                            <div
                                                className="SearchRecipeMappedContainer"
                                                key={group.id}
                                                onClick={() => setSearch("")}
                                            >
                                                <Link to={`/groups/${group.id}`}>
                                                    <img
                                                        className="SearchRecipeIndividual"
                                                        src={group.Images[0]?.url || "https://www.travelandleisure.com/thmb/lZeCZo1hq_41edFv-hEop-VtQ-w=/1600x1200/smart/filters:no_upscale()/red-pink-orange-purple-sunset-WHYCOLORS1220-7684b47c858b4e1e9d73018e213c7ff3.jpg"}
                                                    />
                                                </Link>
                                                <Link
                                                    className="SearchRecipeNavLinkTitle"
                                                    to={`/groups/${group.id}`}
                                                >
                                                    {group.name}
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            !filteredGroups?.length &&
                                search !== "" &&
                                groupResults === true
                                ? "errorHandlingSearchContainer"
                                : "HiddenResult"
                        }
                    >
                        <div className="errorhandlingSearchmessage">No Groups Found</div>
                    </div>
                </div>
            </>

        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}
