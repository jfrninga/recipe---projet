import React, { useState } from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import ShoppingRecipe from './components/ShoppingRecipe';
import AddRecipe from './components/AddRecipe';

type Recipe = {
  id: number;
  name: string;
  ingredients: string;
  description: string;
};

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  const handleAddRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, { id: Date.now(), ...recipe }]);
  };

  const handleDeleteRecipe = (id: number) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  const handleEditRecipe = (id: number, updatedRecipe: Recipe) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === id) {
        return { ...recipe, ...updatedRecipe };
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
  };

  const handleAddToShoppingRecipe = (ingredientsToAdd: string[]) => {
    const newIngredients = shoppingList.concat(ingredientsToAdd);
    setShoppingList(newIngredients);
  };

  const handleUpdateShoppingList = (newIngredients: string[]) => {
    setShoppingList(newIngredients);
  };

  const handleClearShoppingList = () => {
    setShoppingList([]);
  };

  return (
    <div>
      <RecipeList
        recipes={recipes}
        onDeleteRecipe={handleDeleteRecipe}
        onEditRecipe={handleEditRecipe}
        onAddToShoppingRecipe={handleAddToShoppingRecipe}
      />
      <ShoppingRecipe
        ingredients={shoppingList}
        onUpdateIngredients={handleUpdateShoppingList}
        onDeleteIngredients={handleClearShoppingList}
      />
      <AddRecipe onAddRecipe={handleAddRecipe} />
    </div>
  );
};

export default App;
