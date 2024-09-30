document.addEventListener('DOMContentLoaded', function () {
    const recipeContainer = document.getElementById('recipes');
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');
    

    searchBtn.addEventListener('click', () => {
        const query = searchBox.value.trim();
        if (query !== '') {
            fetchRecipes(query);
        } else {
            alert("Please enter a search term");
        }
    });

    async function fetchRecipes(query) {
        const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            if (data.meals) {
                displayRecipes(data.meals);
            } else {
                recipeContainer.innerHTML = `<p>No recipes found for "${query}". Try another search.</p>`;
            }
        } catch (error) {
            recipeContainer.innerHTML = `<p>There was an error fetching the recipes. Please try again later.</p>`;
        }
    }

    function displayRecipes(recipes) {
        recipeContainer.innerHTML = ''; 
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <h2 class="recipe-title">${recipe.strMeal}</h2>
            `;
    
            const recipeTitle = recipeElement.querySelector('.recipe-title');
            recipeTitle.addEventListener('click', () => {
                localStorage.setItem('selectedRecipe', JSON.stringify(recipe)); // Store the selected recipe
                window.location.href = 'recipe.html'; // Navigate to the recipe details page
            });
    
            recipeContainer.appendChild(recipeElement);
        });
    }
    
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
    

    fetchRecipes('chicken');
});
document.addEventListener('DOMContentLoaded', function () {
    const recipeContainer = document.getElementById('recipes');
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');
    const suggestionsContainer = document.getElementById('suggestions');

    // Event listener for search button
    searchBtn.addEventListener('click', () => {
        const query = searchBox.value.trim();
        if (query !== '') {
            fetchRecipes(query);
        } else {
            alert("Please enter a search term");
        }
    });

    // Event listener for input to show suggestions
    searchBox.addEventListener('input', () => {
        const query = searchBox.value.trim();
        if (query) {
            fetchSuggestions(query);
        } else {
            suggestionsContainer.innerHTML = ''; // Clear suggestions
            suggestionsContainer.style.display = 'none'; // Hide suggestions
        }
    });

    // Function to fetch recipe suggestions
    async function fetchSuggestions(query) {
        const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            if (data.meals) {
                displaySuggestions(data.meals);
            } else {
                suggestionsContainer.innerHTML = '<p>No suggestions found.</p>';
                suggestionsContainer.style.display = 'none'; // Hide suggestions
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    // Function to display suggestions
    function displaySuggestions(meals) {
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions
        suggestionsContainer.style.display = 'block'; // Show suggestions

        meals.forEach(meal => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = meal.strMeal;

            // Click event for each suggestion
            suggestionItem.addEventListener('click', () => {
                searchBox.value = meal.strMeal; // Set input to the selected suggestion
                fetchRecipes(meal.strMeal); // Fetch the selected recipe
                suggestionsContainer.style.display = 'none'; // Hide suggestions
            });

            suggestionsContainer.appendChild(suggestionItem);
        });
    }

    // Function to fetch recipes from TheMealDB API
    async function fetchRecipes(query) {
        const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            if (data.meals) {
                displayRecipes(data.meals);
            } else {
                recipeContainer.innerHTML = `<p>No recipes found for "${query}". Try another search.</p>`;
            }
        } catch (error) {
            console.error('Error fetching data from the API:', error);
            recipeContainer.innerHTML = `<p>There was an error fetching the recipes. Please try again later.</p>`;
        }
    }

    // Function to display the fetched recipes
    function displayRecipes(recipes) {
        recipeContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <h2 class="recipe-title">${recipe.strMeal}</h2>
            `;

            const recipeTitle = recipeElement.querySelector('.recipe-title');
            recipeTitle.addEventListener('click', () => {
                localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
                window.location.href = 'recipe.html';
            });

            recipeContainer.appendChild(recipeElement);
        });
    }

    // Fetch and display a default recipe (e.g., chicken) on page load
    fetchRecipes('chicken');
});
