import React, { FC, useState } from 'react';

const Filters: FC<any> = (props: any) => {
  const [experience, setExperience] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [salary, setSalary] = useState<string>('');

  const labelToSetState = {
    experience: setExperience,
    location: setLocation,
    salary: setSalary,
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

    //we don't want to add info, so no 'POST', instead we want to get search results back based on this criteria, so we'd likely query the database based on the criteria somehow
    fetch('/TBD', {
      method: 'POST',
      body: JSON.stringify({ criteria }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <div>
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
            id="name"
            name="Location"
            placeholder="Location"
            onChange={handleChange}
          />
          <input
            className="searchFields"
            type="text"
            id="name"
            name="Salary"
            placeholder="Minimum Salary"
            onChange={handleChange}
          />
        </form>
      </label>
    </div>
  );
};

export default Filters;
