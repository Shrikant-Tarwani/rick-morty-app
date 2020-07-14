import React,  { useState, useEffect } from 'react';
import { getEpisode } from 'rickmortyapi'
import './App.css';
import Card from './Card'

function App() {
  const [episodes, setEpisodes] = useState([[]]);
  const [pageNo, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('');

const handleNext = () => {
      setPage(pageNo + 1)
}

const handlePrevious = () => {
  if(pageNo > 1){
  setPage(pageNo - 1)}
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
const handleChange = e => {  
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

const handleHome = () => {
  setPage(1)
  setSearchValue('')
}

const search = useFormInput('');

const handleSearch = () => {       
    setSearchValue(search.value);
}


  useEffect(() => {
    const findEpisodes = async () => {
        await getEpisode({ page: pageNo, name: searchValue }).then(
            (response) => {            
              setEpisodes(response.results);
            }
        ).catch(error => {

        })
    };
    findEpisodes();
  }, [pageNo, searchValue]);
if (episodes){
  const items = episodes.map(function(item){
    return (<div>
      <Card name = {item['name']} id = {item['id']} date = {item['air_date']} />
    <br/>
    </div>
    
    );
  });


  return (
    <div className="App">
      <br/>
      <div>
      <input className="name-input" type="text" {...search} placeholder="Enter name of Episode"/>
      <input className="search-button btn btn-primary" type="button" value='Search' onClick={handleSearch} />
      <br/>
      </div>
      <br/>
      <ul>
       {items}
      </ul>
      <ul class="pagination margin40">
      <li className="page-item"><input className="prev-button page-link" type="button" value='Prev' onClick={handlePrevious} /></li>
      <li className="page-item"><input className="next-button page-link" type="button" value='Next' onClick={handleNext} /></li>
      </ul>
    </div>
  );
}
else{
  return (
    <div className="App">
    <div>No Episodes</div>
    <input className="home-button" type="button" value='Home' onClick={handleHome} />
    </div>
    
  );
}}

export default App;
