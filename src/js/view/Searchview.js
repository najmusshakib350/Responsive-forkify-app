import { elements } from './base';

export const getInput=() => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = "";
};
export const clearResults = () => {
    elements.searchResult.innerHTML = "";
    elements.searchResPages.innerHTML = "";
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

export const clearLoader=() =>{
    const loader=document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};

const limitRecipeTitle =(title,limit = 17) =>{
     if(title.length > limit){
            let newTitle=[];
            const a1=title.split(' ');
            a1.reduce((acc,curr) =>{
                if(acc+curr.length <= limit){
                    newTitle.push(curr);
                }
                return acc+curr.length;
            },0);
            return `${newTitle.join(' ')}...`;
     }else{
           return title;
     }
};


const renderRecipe = (recipe) =>{
    const markup =`
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher_url}</p>
            </div>
        </a>
    `;
    elements.searchResult.insertAdjacentHTML('beforeend', markup);
};
const createButton=(page,type) =>
    `<button class="btn-inline results__btn--${type}" data-shakib=${type==='prev' ? page-1 : page+1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page${type==='prev' ? page-1 : page+1}</span>
    </button>`
;
const renderButton= (page,recipes,resPerpage)=>{
    const pages=Math.ceil(recipes/resPerpage);
    let button;
    if(page===1 && pages>1){
       button =createButton(page,'next');
    }
    else if(page <pages){
        button =`
           ${createButton(page,'prev')}
           ${createButton(page,'next')}
        `;
    }
    else if(page===pages && pages>1){
         button=createButton(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};
export const renderResults = ( recipes, page=1,resPerpage=10 ) => {
    const start=(page-1) *10;
    const end=(page*10);

    recipes.slice(start,end).forEach(renderRecipe);

    renderButton(page,recipes.length, resPerpage);
}; 