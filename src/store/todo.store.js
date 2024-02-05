import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Pending: 'pending',
    Completed: 'completed',
};

const state = {
    todos: [
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del alma'),
        new Todo('Piedra de la paz'),
        new Todo('Piedra del infinito'),
    ],
    filter: Filters.All,
};


const initStore = () => {

    console.log('initStore 🥑');

    console.log(state);

};

const loadStore = () => {
    throw new Error('Not implemented');
};

/**
 * 
 * @param {Filters} filter 
 */
const getTodos = (filter = Filters.All ) => {

    switch( filter ) {
        case Filters.All:
            return [...state.todos];

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );

        case Filters.Completed:
            return state.todos.filter( todo => todo.done );

        default: 
        throw new Error(`Option ${ filter } is not valid.`);
    };

};

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {

    if (!description) throw new Error('Description is required');

    state.todos.push(
        new Todo(description)
    );
};

/**
 * 
 * @param {uuid} todoId 
 */
const toggleTodo = ( todoId ) => {
    if (!todoId) throw new Error('todoId is required');

    state.todos = state.todos.map( todo => {
        if (todo.id = todoId) {
            todo.done = !todo.done;
        }

        return todo;
    });
};

/**
 * 
 * @param {uuid} todoId 
 */
const deleteTodo = ( todoId ) => {
    if (!todoId) throw new Error('todoId is required');

    state.todos = state.todos.filter( todo => todo.id !== todoId );
};


const deleteCompleted = (  ) => {
    state.todos = state.todos.filter( todo => todo.done );
};

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter; 
};


const getCurrentFilter = () => {
   return state.filter.toString();
};


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
};