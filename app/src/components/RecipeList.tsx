import React, { useState } from 'react';

type RecipeListProps = {
    recipes: {
        id: number,
        name: string,
        description: string,
        ingredients: string[]
    }[],
    onDeleteRecipe: (id: number) => void,
    onEditRecipe: (id: number, recipe: {name?: string, description?: string, ingredients?: string[]}) => void,
    onAddToShoppingRecipe: (ingredients: string[]) => void,
};

const RecipeList = ({ recipes, onDeleteRecipe, onEditRecipe, onAddToShoppingRecipe }: RecipeListProps) => {
    const [editingRecipeId, setEditingRecipeId] = useState(-1);
    const [editingName, setEditingName] = useState('');
    const [editingDescription, setEditingDescription] = useState('');
    const [editingIngredients, setEditingIngredients] = useState('');

    const handleEditClick = (recipe: any) => {
        setEditingRecipeId(recipe.id);
        setEditingName(recipe.name);
        setEditingDescription(recipe.description);
        setEditingIngredients(recipe.ingredients.join(', '));
    };

    const handleSaveClick = (id: number) => {
        const newRecipe = {
            name: editingName,
            description: editingDescription,
            ingredients: editingIngredients.split(',').map((i: string) => i.trim())
        };
        onEditRecipe(id, newRecipe);
        setEditingRecipeId(-1);
    };

    const handleCancelClick = () => {
        setEditingRecipeId(-1);
    };

    return (
        <div>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    {editingRecipeId === recipe.id ? (
                        <>
                            <input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} />
                            <textarea value={editingDescription} onChange={(e) => setEditingDescription(e.target.value)}></textarea>
                            <input type="text" value={editingIngredients} onChange={(e) => setEditingIngredients(e.target.value)} />
                            <button onClick={() => handleSaveClick(recipe.id)}>Save</button>
                            <button onClick={() => handleCancelClick()}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <h2 className="recipe-title"> Nom de la recette : {recipe.name}</h2>
                            <p> Description : {recipe.description}</p>
                            <ul className="recipe-ingredients-list"> Ingrédients : 
                                {recipe.ingredients.map((ingredient) => (
                                    <li className="recipe-ingredient" key={ingredient}>{ingredient}</li>
                                ))}
                            </ul>
                            <button onClick={() => onDeleteRecipe(recipe.id)}>Delete</button>
                            <button className="recipe-edit-button" onClick={() => handleEditClick(recipe)}>Edit</button>
                            <button onClick={() => onAddToShoppingRecipe(recipe.ingredients)}>Add to Shopping List</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
