import React, {useEffect, useState} from 'react'
import './App.css'
import tmdb from './tmdb';
import List from './components/movieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';


const App = () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

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

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className='page'>

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

       <section className='lists'>
        {movieList.map((item, key)=>(
          <List key={key} title={item.title} items={item.items} />
        ))}
       </section>

       <footer>
        Feito por <span>Alemão Dev</span><br />
        Direitos de imagem para Netflix<br/>
        Dados pegos pelo site TMDB.org
       </footer>

      {movieList.length <= 0 &&
        <div className='loading'>
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />

        </div>
      }
    </div>
  );
}

export default App