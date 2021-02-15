import { elements } from './base';
import { Fraction } from 'fractional';
import * as listView from './listView';
//import List from './../model/list'

export const clearResult=() =>{
    elements.recipe.innerHTML='';
};

export const elementStrings={
    loader:'loader'
};

export const renderLoader= parent =>{
    const loader=`
      <div class="${elementStrings.loader}">
        <div class="spinner-border" role="status">
           <span class="sr-only">Loading...</span>
        </div>
      </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader=(elementStrings) =>{
    const loader=document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};

const formatCount= count => {
   
    let [int,dec]=count.toString().split('.').map(el => parseInt(el));
    
    if (!dec) return count;

    if(int===0){
        const frnum=new Fraction(count);
        return `${frnum.numerator} / ${frnum.denominator}`;
    }else{
        const frnum=new Fraction(count-int);
        return `${int} ${frnum.numerator} / ${frnum.denominator}`;
    }  
};

const createIngredient= el =>`
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatCount(el.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${el.unit}</span>
                ${el.ingredient}
            </div>
        </li>
`;

export const renderRecipe = (recipe) =>{
     const markup=`
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">40</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>
                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg class="btn-decrease-svg">
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
        </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
           </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
            </ul>

            <button class="btn-small recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>


        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.source_url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
     `;  
     elements.recipe.insertAdjacentHTML('afterbegin', markup);
};


export const updateServingsIngredients= recipe =>{
    document.querySelector('.recipe__info-data--people').textContent=recipe.servings;
    const countElements=document.querySelectorAll('.recipe__count');
    countElements.forEach((el,i) =>{
        el.textContent=formatCount(recipe.ingredients[i].count);
    });
};

//Part 22222

export const controlList= (ingredients) =>{
  
    ingredients.forEach((el)=>{

        listView.renderItem(el);
    });
};