import { useState } from 'react';

function Categories() {
  const categories = ['Room', 'Top cities', 'Amazing views', 'Trending', 'Historical homes', 'Bed & breakfasts', 'Mansions', 'Castle', 'OMG'];
  const [activeCategory, setActiveCategory] = useState('');

  return (
    <div className="categories">
      {categories.map(category => (
        <button 
          key={category}
          onClick={() => setActiveCategory(category)} 
          className={activeCategory === category ? 'active' : ''}
        >
          <img src={require(`../assets/categories/${category}.jpg`)} alt={category} />
          <p>{category}</p>
        </button>
      ))}
    </div>
  );
}

export default Categories;
