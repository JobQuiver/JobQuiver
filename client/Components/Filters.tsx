import React, { FC, useState } from 'react';

const Filters: FC<any> = (props: any) => {
  const [experience, setExperience] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const labelToSetState = {
    experience: setExperience,
    location: setLocation,
    salary: setSalary,
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
      salary,
    };
  };

  const getResults = () => {
    const query = `?page=1&locations=${location.replace(
      /\s/g,
      '%20'
    )}&keywords=${keyword}`;
    console.log('query', query);
    fetch(`/search${query}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => props.setResults(data));
  };

  return (
    <div className="FiltersContainer">
      <div className="SearchBar-Container">
        <input
          type="search"
          className="SearchBar"
          name="keyword"
          onChange={handleChange}
        />
        <button type="button" onClick={() => getResults()}>
          Search
        </button>
      </div>
      <div>
        <label>
          <form onSubmit={handleSubmit} className="InputsContainer">
            <select
              id="experience"
              name="experience"
              onChange={handleChange}
              className="Filters"
            >
              <option selected>Experience Level</option>
              <option value="Entry">Entry</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
            <input
              className="searchFields"
              type="text"
              name="location"
              placeholder="location"
              onChange={handleChange}
            />
            <input
              className="searchFields"
              type="text"
              id="name"
              name="salary"
              placeholder="Minimum Salary"
              onChange={handleChange}
            />
          </form>
        </label>
      </div>
    </div>
  );
};

export default Filters;
