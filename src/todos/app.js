import html from './app.html?raw';

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    // Cuando la Funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html; // {{ name }}
        document.querySelector(elementId).append(app);
    })();

};