document.addEventListener('DOMContentLoaded', function () {
    const recipeTitle = document.getElementById('recipe-title');
    const recipeDetailsContainer = document.getElementById('recipe-details');
    const backBtn = document.getElementById('back-btn');

    // Get the recipe data from local storage
    const recipe = JSON.parse(localStorage.getItem('selectedRecipe'));

    if (recipe) {
        // Populate the title and details
        recipeTitle.textContent = recipe.strMeal;
        recipeDetailsContainer.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <p><strong>Recipe ID:</strong> ${recipe.idMeal}</p>
            <p><strong>Category:</strong> ${recipe.strCategory}</p>
            <p><strong>Origin:</strong> ${recipe.strArea}</p>
            <h3>Ingredients:</h3>
            <ul>${getIngredients(recipe).map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <h3>Instructions:</h3>
            <p>${recipe.strInstructions}</p>
        `;
    } else {
        recipeDetailsContainer.innerHTML = '<p>No recipe details available.</p>';
    }

    // Add event listener for the back button
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; // Navigate back to homepage
    });

    // Function to extract ingredients from the recipe object
    function getIngredients(recipe) {
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${ingredient} - ${measure}`);
            }
        }
        return ingredients;
    }
});
