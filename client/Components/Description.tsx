import React, { FC } from 'react';

interface DescriptionProps {
  description?: string,
}

const Description: FC<DescriptionProps> = (
  { description }: DescriptionProps
) => (
  <p
    className="description"
    dangerouslySetInnerHTML={{ __html: description }}
  />
);

export default Description;
