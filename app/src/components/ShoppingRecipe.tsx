import React, { useState, useEffect } from 'react';

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
    const [editedIngredients, setEditedIngredients] = useState<
        { id: number; name: string; checked: boolean }[]
    >([]);

    useEffect(() => {
        // Assign a unique ID to each ingredient
        const updatedIngredients = ingredients.map((ingredient, index) => ({
            id: index,
            name: ingredient,
            checked: false,
        }));
        setEditedIngredients(updatedIngredients);
    }, [ingredients]);

    const handleDeleteIngredients = () => {
        onDeleteIngredients();
    };

    const handleIngredientChange = (index: number, newIngredient: string) => {
        const updatedIngredients = [...editedIngredients];
        updatedIngredients[index].name = newIngredient;
        setEditedIngredients(updatedIngredients);
        onUpdateIngredients(updatedIngredients.map((ing) => ing.name));
    };

    const handleCheckboxChange = (id: number) => {
        const updatedIngredients = [...editedIngredients];
        const index = updatedIngredients.findIndex((ing) => ing.id === id);
        updatedIngredients[index].checked = !updatedIngredients[index].checked;
        setEditedIngredients(updatedIngredients);
    };

    const handleCheckAll = () => {
        const updatedIngredients = [...editedIngredients];
        const allChecked = editedIngredients.every((ing) => ing.checked);
        updatedIngredients.forEach((ing) => (ing.checked = !allChecked));
        setEditedIngredients(updatedIngredients);
    };

    const handleDeleteCheckedIngredients = () => {
        const updatedIngredients = editedIngredients.filter(
            (ing) => !ing.checked
        );
        setEditedIngredients(updatedIngredients);
        onUpdateIngredients(updatedIngredients.map((ing) => ing.name));
    };

    return (
        <div>
            <h2 className="shopping-list-title">Liste des ingrédients</h2>
            <>
                {editedIngredients.length > 0 ? (
                    <div>
                        <ul className="recipe-ingredients-list">
                            {editedIngredients.map((ingredient, index) => (
                                <li className="recipe-ingredient" key={ingredient.id} contentEditable={true}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={ingredient.checked}
                                            onChange={() => handleCheckboxChange(ingredient.id)}
                                        />
                                        <span
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) =>
                                                handleIngredientChange(
                                                    index,
                                                    e.currentTarget.textContent || ''
                                                )
                                            }
                                            style={{
                                                textDecoration: ingredient.checked
                                                    ? 'line-through'
                                                    : 'none',
                                            }}
                                        >
                                            {ingredient.name}
                                        </span>
                                    </label>
                                </li>

                            ))}
                        </ul>
                        <button onClick={handleDeleteCheckedIngredients}>
                            Supprimer les ingrédients cochés
                        </button>
                        <button onClick={handleCheckAll}>
                            {editedIngredients.every((ing) => ing.checked)
                                ? 'Tout décocher'
                                : 'Tout cocher'}
                        </button>
                        <button onClick={handleDeleteIngredients}>Supprimer la liste</button>
                    </div>
                ) : (
                    <p>
                        <i>Aucun ingrédient pour le moment.</i>
                    </p>
                )}
            </>
        </div>
    );
};

export default ShoppingRecipe
