import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti(props) {
    
  const handleChange = (values) => {
      props.handleChange(values);
  }  
  return (
    <div className="single_select">
        <div className="headline">{props.headline}</div>
        <Select
        className="select"
        closeMenuOnSelect={!props.isMulti}
        components={animatedComponents}
        isMulti={props.isMulti}
        options={props.options}
        isClearable={true}
        onChange={handleChange}
        />
    </div>
  );
}