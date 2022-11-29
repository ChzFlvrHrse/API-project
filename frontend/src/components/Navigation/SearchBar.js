import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEventsThunk } from "../../store/events";
import './SearchBar.css';

export function SearchBar() {
    const [search, setSearch] = useState('');
    const [eventResults, setEventResults] = useState(true);

    const dispatch = useDispatch()

    let allEventsArr;
    let filteredEvents;

    useEffect(() => {
        dispatch(getEventsThunk());
    }, [dispatch, search])

    const allEvents = useSelector(state => state.events.Events);

    console.log(allEvents)

    allEventsArr = Object.values(allEvents);

    if (allEventsArr?.length > 0) {
        filteredEvents = allEventsArr?.filter(values => values.name?.toLowerCase().includes(search.toLowerCase()))
    } else {
        filteredEvents = "";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

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
            </div>
            <div className={search?.length ? "SearchBarContainer" : "HiddenResult"}>
                <button
                    className="toggleResultsSearch"
                    onClick={() => {
                        setEventResults(!eventResults);
                    }}
                >
                    {eventResults == true ? (
                        <div>Hide Events Results</div>
                    ) : (
                        <div>Show Events Results</div>
                    )}
                </button>
                <div
                    className={
                        filteredEvents?.length &&
                            search?.length &&
                            eventResults == true
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
                        eventResults == true
                        ? "errorHandlingSearchContainer"
                        : "HiddenResult"
                }
            >
                <div className="errorhandlingSearchmessage">No Events Found</div>
            </div>
        </>

    )
}
