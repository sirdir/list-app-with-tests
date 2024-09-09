import React from 'react';

export default function Search(props) {
  function handleChange(e) {
    let text = e.target.value;
    props.setSearch(text);
  }

  return (
    <div className="search">
      <input
        id="search"
        className="search-book"
        type="text"
        placeholder="Search.."
        value={props.search}
        onChange={handleChange}
      />
    </div>
  );
}
