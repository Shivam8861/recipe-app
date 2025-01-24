const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');

// funtion to get the recipe
const fetchRecipes = async (query) => {
    try {
        recipecontainer.innerHTML = 'Getting your recipe';
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
                    <p>${meal.strArea}</p>
                    <p>${meal.strCategory}</p>
                `;
                recipecontainer.appendChild(recipeDiv);
            });
        } else {
            console.log('No meals found');
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
// console.log("btn clicked");
    
});
