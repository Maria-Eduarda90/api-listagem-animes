import React, { useState, useEffect } from 'react';
import qs from 'qs';

import SearchInput from './parts/Searchinput';
import Pagination from './parts/Pagination';
import './styles/global.css';

const api = 'https://kitsu.io/api/edge/';

const limit = 15;

export default function App() {
  const [ info, setInfo ] = useState({});
  const [ text, setText ] = useState('');
  const [ offset, setOffset ] = useState(0);

  useEffect(() => {
    //setInfo({});

    const query = {
      page: {
        limit,
        offset,
      }
    };

    if(text){
      query.filter = {
        text,
      }
    }

    fetch(`${api}anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response);
      });
  }, [text, offset]);

  return (
    <div className="App">
        <header>
          <h1><span>A</span>n<span>i</span>m<span>e</span>s</h1>
          <SearchInput value={text} onChange={(search) => setText(search)}/>
        </header>
        <section className="container-header">
          {text && !info.data && (
            <div>
              <div className="loader"></div>
            </div>
          )}
          
          {info.data && (
            <ul className="animes-list">
              {info.data.map((anime) => (
                <li key={anime.id}>
                  <a className="img-container">
                    <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle}/>
                  </a>
                  <p>{anime.attributes.canonicalTitle}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        {info.meta && (
          <Pagination limit={limit} total={info.meta.count} offset={offset} setOffset={setOffset}/>
        )}
    </div>
  );
}