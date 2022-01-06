import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from '../utils/actions';

import { reducer } from '../utils/reducers';

// create sample of global state
const initialState = {
    products: [],
    categories: [{ name: 'food' }],
    currentCategory: '1',
};

test('UPDATE_PRODUCTS', () => {
    // pass in current state object and action (type of action, and value of new data used)
    let newState = reducer(initialState, {
        // update products list with array of products
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });

    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });

    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
});