import React, { useState, useEffect } from 'react';
import SearchInput from './parts/Searchinput';
import './styles.css';

const api = 'https://kitsu.io/api/edge/';

export default function App() {
  const [ info, setInfo ] = useState({});
  const [ text, setText ] = useState('');

  useEffect(() => {
    if(text){
      setInfo({});
      fetch(`${api}anime?filter[text]=${text}`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
          console.log(response)
        });
    }
  }, [text]);

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
    </div>
  );
}