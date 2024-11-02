// Sample recipes array
const recipes = [
    { id: 1, name: "Garlic Chicken", ingredients: ["chicken", "garlic", "butter"] },
    { id: 2, name: "Tomato Pasta", ingredients: ["pasta", "tomatoes", "garlic"] },
    { id: 3, name: "Avocado Salad", ingredients: ["avocado", "lettuce", "tomatoes"] },
    { id: 4, name: "Veggie Stir Fry", ingredients: ["broccoli", "carrots", "bell peppers"] }
  ];
  
  let favoriteRecipes = JSON.parse(localStorage.getItem("favorites")) || [];
  
  function searchRecipes() {
    const ingredientsInput = document.getElementById('ingredients').value.toLowerCase();
    const ingredients = ingredientsInput.split(',').map(item => item.trim());
    
    const filteredRecipes = recipes.filter(recipe => 
      ingredients.every(ingredient => recipe.ingredients.includes(ingredient))
    );
    
    displayRecipes(filteredRecipes);
  }
  
  function displayRecipes(recipeArray) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';
    
    if (recipeArray.length === 0) {
      recipeList.innerHTML = '<li>No recipes found.</li>';
      return;
    }
  
    recipeArray.forEach(recipe => {
      const li = document.createElement('li');
      li.className = 'recipe-item';
      li.innerHTML = `
        <h4>${recipe.name}</h4>
        <button onclick="addToFavorites(${recipe.id})">Add to Favorites</button>
      `;
      recipeList.appendChild(li);
    });
  }
  
  function addToFavorites(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe && !favoriteRecipes.find(r => r.id === recipe.id)) {
      favoriteRecipes.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));
      displayFavorites();
    }
  }
  
  function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';
    
    if (favoriteRecipes.length === 0) {
      favoritesList.innerHTML = '<li>No favorites added.</li>';
      return;
    }
    
    favoriteRecipes.forEach(recipe => {
      const li = document.createElement('li');
      li.className = 'recipe-item';
      li.innerHTML = `
        <h4>${recipe.name}</h4>
        <button onclick="removeFromFavorites(${recipe.id})">Remove</button>
      `;
      favoritesList.appendChild(li);
    });
  }
  
  function removeFromFavorites(recipeId) {
    favoriteRecipes = favoriteRecipes.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));
    displayFavorites();
  }
  
  window.onload = displayFavorites;
  