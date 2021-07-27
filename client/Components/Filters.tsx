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
    console.log(event.target.value);
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

  // Try.replace(/ /g, '%20');
  // FORMAT ===== localhost:3000/search?page=1&locations=new york city&keywords=fullstack

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
      // .then(data => console.log(data))
      .then(data => props.setResults(data));
  };

  return (
    <div>
      <input
        type="search"
        className="SearchBar"
        name="keyword"
        onChange={handleChange}
      />
      <button type="button" onClick={() => getResults()}>
        Search
      </button>
      <label>
        <form onSubmit={handleSubmit}>
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
            // id="name"
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
  );
};

export default Filters;
