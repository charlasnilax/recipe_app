import React, { useState, useEffect } from 'react';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const APP_ID = '153c56ee';
  const APP_KEY = 'b5d629905432130dfab34a39b958e430';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        setRecipes(data.hits);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search and update the searchQuery state
    // You can customize the search functionality as per your needs
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Recipe App</h1>
      <form>
        <input type="text" value={searchQuery} onChange={handleSearch} />
        <button type="submit">Search</button>
      </form>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.recipe.label}>
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

