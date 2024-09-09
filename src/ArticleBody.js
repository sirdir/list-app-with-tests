import React from 'react';

export default function ArticleBody(props) {
  return (
    <li className="todo stack-small">
      <div className="Contact-item-body">
        <h3 className="title-article">{props.title}</h3>
        <p className="text-article">{props.body}</p>
      </div>
      <div className="btn-group">
        <button type="button" className="btn-delete btn-circle" onClick={() => props.deleteTask(props.id)}>
          {props.btnDelete}
        </button>
      </div>
    </li>
  );
}
