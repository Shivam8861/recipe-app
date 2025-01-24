const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// funtion to get the recipe
const fetchRecipes = async (query) => {
    recipecontainer.innerHTML = 'Getting your recipe...';
    try {
        
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
             
        recipecontainer.innerHTML = '';
        if(response.meals && response.meals.length > 0) {
            response.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}</span> Dish</p>
                    <p>Category <span>${meal.strCategory}</span></p>
                `
                const button = document.createElement('button');
                button.textContent = 'View Recipe';
                recipeDiv.appendChild(button);

                button.addEventListener('click', () => {
                    openRecipePopup(meal);
                });

                recipecontainer.appendChild(recipeDiv);
            });
        } else {
            console.log('No meals found');
        }
    } catch (error) {
        recipecontainer.innerHTML="<h2>Error in getting recipes...</h2>";
    }
}
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i < 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `;
    recipeDetailsContent.parentElement.style.display = 'block';
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none';
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});
