import './styles/styles.css';

import React, { useState } from 'react';
import Header from './Header';
import Main from './MainComponent';
import ArticleComponent from './ArticleComponent';
import ArticleBody from './ArticleBody';
import Search from './Search';
import Form from './Form';
import TitleArticle from './TitleArticle';
import UnorderedList from './UnorderedList';
import usePersistantState from './usePersistantState'; // Fixed import

const btnRemove = <i className="fa fa-trash"></i>;
const noteEmpty = <p className="empty-notes">No notes</p>;

export default function MainContainer() {
  const [article, setArticle] = usePersistantState('articleKey', []); // Fixed call to usePersistantState
  const [search, setSearch] = useState('');

  let filteredNotes = article?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  const filtered = search === '' ? article : filteredNotes;

  function renderArticle(name) {
    let component = filtered?.map((item) => {
      return (
        (
          <ArticleBody
            id={item.id}
            name={name}
            title={item.title}
            body={item.body}
            key={item.id}
            deleteTask={popupDelete}
            btnDelete={btnRemove}
          />
        ) ?? []
      );
    });

    return component !== undefined && component.length !== 0 ? component : noteEmpty;
  }

  function addNewBook(title, textArea) {
    const newArticle = {
      id: +new Date(),
      title: title,
      body: textArea,
    };

    setArticle([...article, newArticle]);
  }

  function popupDelete(id) {
    const confirmBox = window.confirm('Do you really want to delete this Item');

    if (confirmBox === true) {
      return deleteTask(id);
    } else {
      return;
    }
  }

  function deleteTask(mark) {
    const deleteItem = article.filter((item) => mark !== item.id);
    setArticle(deleteItem);
  }

  return (
    <React.Fragment>
      <Header>
        <Search search={search} setSearch={setSearch} />
      </Header>
      <Main>
        <Form addTitle={addNewBook} />
        <ArticleComponent>
          <TitleArticle titleArticle={'Active'} />
          <div id="completed">
            <UnorderedList>{renderArticle()}</UnorderedList>
          </div>
        </ArticleComponent>
      </Main>
    </React.Fragment>
  );
}
