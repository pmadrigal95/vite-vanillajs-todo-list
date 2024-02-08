import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Pending: 'pending',
    Completed: 'completed',
};

const state = {
    todos: [],
    filter: Filters.All,
};


const initStore = () => {

    console.log('initStore 🥑');

    loadStore();

};

const loadStore = () => {

    const stateTemp = localStorage.getItem('state');

    if (!stateTemp) return;

    const { todos = [] , filter = Filters.All } = JSON.parse(stateTemp);

    state.filter = filter;

    state.todos = todos;
};

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
};

/**
 * 
 * @param {Filters} filter 
 */
const getTodos = (filter = Filters.All) => {

    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        default:
            throw new Error(`Option ${filter} is not valid.`);
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

    saveStateToLocalStorage();
};

/**
 * 
 * @param {uuid} todoId 
 */
const toggleTodo = (todoId) => {
    if (!todoId) throw new Error('todoId is required');

    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }

        return todo;
    });

    saveStateToLocalStorage();
};

/**
 * 
 * @param {uuid} todoId 
 */
const deleteTodo = (todoId) => {
    if (!todoId) throw new Error('todoId is required');

    state.todos = state.todos.filter(todo => todo.id !== todoId);

    saveStateToLocalStorage();
};


const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);

    saveStateToLocalStorage();
};

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;

    saveStateToLocalStorage();
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