import recipes from './recipes.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipe-list');
    const searchForm = document.querySelector('form');
    const searchInput = document.getElementById('search');

    // Function to render recipes
    function renderRecipes(recipes) {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');

            const tags = recipe.tags.map(tag => `<span class="tags">${tag}</span>`).join(' ');

            recipeElement.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <div>
                    ${tags}
                    <h2>${recipe.name}</h2>
                    <div class="rating" aria-label="Rating: ${recipe.rating} out of 5 stars">
                        ${'⭐'.repeat(Math.floor(recipe.rating))}${'☆'.repeat(5 - Math.floor(recipe.rating))}
                    </div>
                    <p class="description">${recipe.description}</p>
                </div>
            `;

            recipeList.appendChild(recipeElement);
        });
    }

    // Function to get a random recipe
    function getRandomRecipe(recipes) {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        return recipes[randomIndex];
    }

    // Display a random recipe on page load
    renderRecipes([getRandomRecipe(recipes)]);

    // Search functionality
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();

        const filteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(query));
        });

        renderRecipes(filteredRecipes);
    });
});