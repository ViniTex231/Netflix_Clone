import React, {useEffect, useState} from 'react'
import './App.css'
import tmdb from './tmdb';
import List from './components/movieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';


const App = () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista total
      let list = await tmdb.getHomeList()
      setMovieList(list)

      //Pegando o featured
      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)

    }

    loadAll()
  }, [])

  return (
    <div className='page'>

      <Header />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

       <section className='lists'>
        {movieList.map((item, key)=>(
          <List key={key} title={item.title} items={item.items} />
        ))}
       </section>
    </div>
  );
}

export default App