import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

const Filters: FC<any> = (props: any) => {
  const [experience, setExperience] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const labelToSetState = {
    experience: setExperience,
    location: setLocation,
    keyword: setKeyword,
  };

  const handleChange = event => {
    event.preventDefault();
    let { name, value } = event.target;
    const updateState = labelToSetState[name];
    updateState(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const criteria = {
      experience,
      location,
    };
  };

  const getResults = () => {
    const query = `?page=1&locations=${location.replace(
      /\s/g,
      '%20'
    )}&keywords=${keyword}&level=${experience}`;
    console.log('query', query);
    fetch(`/search${query}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => props.setResults(data));
  };

  return (
    <div className="FiltersContainer">
      <label>
        <form onSubmit={handleSubmit} className="InputsContainer">
          <input
            type="search"
            className="searchfields"
            name="keyword"
            placeholder="Keyword"
            onChange={handleChange}
          />
          <select
            id="experience"
            name="experience"
            onChange={handleChange}
            className="searchfields"
          >
            <option selected>Experience Level</option>
            <option value="Internship">Internship</option>
            <option value="Entry%20Level">Entry</option>
            <option value="Mid%20Level">Mid</option>
            <option value="Senior%20Level">Senior</option>
            <option value="management">Management</option>
          </select>
          <input
            className="searchFields"
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />
          <button
            className="searchbarbutton"
            type="button"
            onClick={() => getResults()}
          >
            Search
          </button>
          <Link to="/FavoritePage">
            <button
              className="savedsearches"
              type="button"
            >
              My Saved Searches
            </button>
          </Link>
        </form>
      </label>
    </div>
  );
};

export default Filters;
