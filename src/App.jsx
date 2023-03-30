import React from 'react'
import { Route,Routes} from 'react-router-dom'
import ListPage from './pages/ListPage/ListPage'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import AddCharacterPage from './pages/AddCharacterPage/AddCharacterPage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import NotFound from './pages/NotFound/NotFound'

const App = () => {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<ListPage/>} />
        <Route path="/characters/:id" element={<DetailsPage/>} />
        <Route path="/add" element={<AddCharacterPage/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App