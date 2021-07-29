import React, { FC, SyntheticEvent, useState } from 'react';

const SAVE_JOB = 'Save Job';
const SAVING = 'Saving...';
const SAVED = 'Saved!';
const NOT_SAVED = 'Not Saved';
const SAVED_RESULTS_ROUTE = '/savedResults';
const POST = 'POST';
const HEADERS = {
  'Content-Type': 'application/json',
};

interface SaveButtonProps {
  title: string;
  location: string;
  description: string;
  link: string;
  companyName: string;
  apiWebsite: string;
  apiId: number;
}

const SaveButton: FC<SaveButtonProps> = (props: SaveButtonProps) => {
  const [buttonText, setButtonText] = useState(SAVE_JOB);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    setButtonText(SAVING);

    fetch(SAVED_RESULTS_ROUTE, {
      method: POST,
      body: JSON.stringify(props),
      headers: HEADERS,
    })
      .then(() => setButtonText(SAVED))
      .catch(err => {
        console.log(`Error while saving result: ${err}`);
        setButtonText(NOT_SAVED);
      });
  };

  return <button onClick={handleClick}>{buttonText}</button>;
};

export default SaveButton;
