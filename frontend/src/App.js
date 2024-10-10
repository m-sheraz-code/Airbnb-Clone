import './App.css';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import TotalCards from './components/TotalCards';
import Footer from './components/Footer';

function App() {

  return (
    <div>
      <Navbar/>
      <SearchBar/>
      <Categories/>
      <TotalCards/>
      <Footer/>
    </div>
  );
}

export default App;
