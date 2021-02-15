import { v4 as uuidv4 } from 'uuid';
import { elements } from './base';
export const renderItem= (el) =>{
    const markup=`
        <li class="shopping__item"  data-shopping=${uuidv4()}>
        <div class="shopping__count">
            <input type="number" value="${el.count}" step="0" class="shopping__count_value">
            <p>${el.unit}</p>
        </div>
        <p class="shopping__description">${el.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
        </li> 
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);
}