import recipes from './recipes.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipe-list');
    const searchForm = document.querySelector('form');
    const searchInput = document.getElementById('search');

    function tagsTemplate(tags) {
        return tags.map(tag => `<span class="tags">${tag}</span>`).join(' ');
    }

    function ratingTemplate(rating) {
        const fullStars = '⭐'.repeat(Math.floor(rating));
        const emptyStars = '☆'.repeat(5 - Math.floor(rating));
        return `
            <div class="rating" aria-label="Rating: ${rating} out of 5 stars">
                ${fullStars}${emptyStars}
            </div>
        `;
    }

    function renderRecipes(recipes) {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');

            recipeElement.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <div>
                    ${tagsTemplate(recipe.tags)}
                    <h2>${recipe.name}</h2>
                    ${ratingTemplate(recipe.rating)}
                    <p class="description">${recipe.description}</p>
                </div>
            `;

            recipeList.appendChild(recipeElement);
        });
    }

    function getRandomRecipe(recipes) {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        return recipes[randomIndex];
    }

    function searchHandler(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();

        const filteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query) ||
                recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
                recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query));
        });


        filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));

        renderRecipes(filteredRecipes);
    }

    renderRecipes([getRandomRecipe(recipes)]);

    searchForm.addEventListener('submit', searchHandler);
});
