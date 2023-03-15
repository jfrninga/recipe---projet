import React, { useState } from 'react';

type ShoppingRecipeProps = {
  ingredients: string[];
  onUpdateIngredients: (updatedIngredients: string[]) => void;
  onDeleteIngredients: () => void;
};

const ShoppingRecipe: React.FC<ShoppingRecipeProps> = ({
  ingredients,
  onUpdateIngredients,
  onDeleteIngredients,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIngredients, setEditedIngredients] = useState(ingredients);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedIngredients(ingredients);
    }
  };

  const handleSaveEdit = () => {
    onUpdateIngredients(editedIngredients);
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedIngredients(event.target.value.split(','));
  };

  const handleDeleteIngredients = () => {
    onDeleteIngredients();
  };

  return (
    <div>
      <h2 className="shopping-list-title">Liste des ingrédients</h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedIngredients.join(',')}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveEdit}>Enregistrer</button>
          <button onClick={handleToggleEdit}>Annuler</button>
        </div>
      ) : (
        <>
          {ingredients.length > 0 ? (
            <div>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <button onClick={handleToggleEdit}>Modifier la liste</button>
              <button onClick={handleDeleteIngredients}>Supprimer la liste</button>
            </div>
          ) : (
            <p><i>Aucun ingrédient pour le moment.</i></p>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingRecipe;