import React, { useState } from 'react';

export default function Form(props) {
  const [title, setTitle] = useState('');
  const [textArea, setTextArea] = useState('');
  const [limit, setLimit] = useState(50);

  function handleChangeTitle(e) {
    const reduceLimit = e.target.value.length;
    const updateLimit = 50 - reduceLimit;
    if (reduceLimit === 51) {
      window.alert("title shouldn't exceed 50 characters");
      return;
    }
    setTitle(e.target.value);
    setLimit(updateLimit);
  }

  function handleChangeTextArea(e) {
    setTextArea(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTitle(title, textArea);
    setTitle('');
    setTextArea('');
    setLimit(50);
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="title-form">Create Notes</h2>
      <h3 className="limit-caracter">Limit caracter : {limit}</h3>
      <input
        id="new-note-title"
        className="note-title"
        type="text"
        placeholder="Note Title.."
        value={title}
        onChange={handleChangeTitle}
        required
      />
      <textarea
        id="new-text-area"
        className="text-area"
        type="text"
        placeholder="Write here.."
        value={textArea}
        onChange={handleChangeTextArea}
        required
      />
      <button type="submit" id="new-note-submit" className="note-submit btn-summit">
        Add Note
      </button>
    </form>
  );
}
