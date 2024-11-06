import { useState } from 'react';

function Categories({ onCategorySelect }) {
  const categories = ['All', 'Room', 'Top cities', 'Amazing views', 'Trending', 'Historical homes', 'Bed & breakfasts', 'Mansions', 'Castle', 'OMG'];
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="categories">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
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
