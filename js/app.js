window.onload = () => {

    /**
     * Query selector shortcut accessors.
     * ==================================
     */
    
    const $ = (selector) => document.querySelector(selector);
    const $all = (selector) => document.querySelectorAll(selector);

    /**
     * Interface/UI elements.
     * ======================
     */

    const app_interface_container = $('main#app-interface');
    const task_form_container = $('form#task-form');
    const task_list_container = $('ul#task-list');
    const new_task_input = $('input#new-task');
    const add_task_bttn = $('input#add-task');


};