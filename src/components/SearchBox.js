import React from 'react';

const SearchBox = (props) => {
  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        value={props.value}
        //check this value in ReactDevTools in Chrome (component>state>searchValue)
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder='search IMDB movies'
      ></input>
    </div>
  );
};

export default SearchBox;
