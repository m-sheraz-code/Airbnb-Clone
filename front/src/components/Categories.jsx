function Categories() {
  const categories = ['Beachfront', 'Cabins', 'Trending', 'Luxe', 'Mansions'];
  const [activeCategory, setActiveCategory] = useState('');

  return (
    <div className="categories">
      {categories.map(category => (
        <button 
          key={category} 
          onClick={() => setActiveCategory(category)} 
          className={activeCategory === category ? 'active' : ''}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
export default Categories;
