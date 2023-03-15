import React, { useState } from 'react';

type AddRecipeProps = {
    onAddRecipe: (recipe: { name: string, ingredients: string[], description: string }) => void
}

const AddRecipe: React.FC<AddRecipeProps> = ({ onAddRecipe }) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const recipe = { name, ingredients: ingredients.split(','), description };
        onAddRecipe(recipe);
        setName('');
        setIngredients('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nom de la recette" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Ingrédients (séparés par des virgules)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default AddRecipe;