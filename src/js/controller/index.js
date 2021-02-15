import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from '../../css/style.css';
import rescss from '../../css/responsive.css';
import Search from './../model/Search'
import Recipe from './../model/Recipe'
import * as searchview from './../view/Searchview';
import { elements } from './../view/base';
import * as recipeView from './../view/recipeView';
import { List } from './../model/list';



const state={};
const controlSearch= async ()=>{
    const query=searchview.getInput();
    //const query=getInput();
    state.search=new Search(query);
    searchview.clearInput();
    searchview.clearResults();
    searchview.renderLoader(elements.searchRes);
    await state.search.getResults();
    searchview.clearLoader();
    searchview.renderResults(state.search.result);
};

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', (e) =>{
    let btn=e.target.closest('.btn-inline');
    if(btn){
        const dataGoto=parseInt(btn.dataset.shakib);
        searchview.clearResults();
        searchview.renderResults(state.search.result, dataGoto);
    }
});


const controlRecipe=async () =>{
    const id=window.location.hash.replace('#', match => '');
    recipeView.clearResult();
    recipeView.renderLoader(elements.recipe);

    if(id){
        try{
            state.recipe= new Recipe(id);
            await state.recipe.getResults();
            state.recipe.calcServings();
            state.recipe. parseIngredients();
            recipeView.renderRecipe(state.recipe);
            recipeView.clearLoader(recipeView.elementStrings);

        }catch(err){
            //console.log(err);
        }
    }
};
window.addEventListener('hashchange', controlRecipe);



elements.recipe.addEventListener('click', event =>{
    if(event.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe); 
        }
    }else if(event.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe); 
    }else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        recipeView.controlList(state.recipe.ingredients);
    }
});

elements.shopping.addEventListener('click', event =>{
    const btn = event.target.closest('.shopping__item');
    const delete_num= btn.dataset.shopping; 
    const btn_del = event.target.closest('.shopping__delete');
    if(btn_del){
        let item=document.querySelector(`[data-shopping="${delete_num}"]`);
        if(item) item.parentElement.removeChild(item);
    }
    const item_update = event.target.closest('.shopping__count_value');
    const value=parseFloat(event.target.value);
    //console.log(value);
});

