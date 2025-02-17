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

    /**
     * Generate an HTML element in the DOM.
     * ====================================
     */

    const $html = (tag_type, parent_of, attrs = {}) => {
        const new_html_element = document.createElement(tag_type);

        if(Object.keys(attrs).length > 0) {
            const attrs_to_set = Object.entries(attrs);
            for(const [key, value] of attrs_to_set) {
                const check_key = key.toLowerCase();
                if(check_key === 'innerhtml') new_html_element.innerHTML = attrs[key];
                else if(check_key === 'innertext') new_html_element.innerText = attrs[key];
                else if(check_key === 'textcontent') new_html_element.textContent = attrs[key];
                else new_html_element.setAttribute(key, value);
            }
        }

        return parent_of.appendChild(new_html_element);
    };

    /**
     * Generate the HTML mark-up structure for new task list items. 
     * This serves as a sort of template.
     * ============================================================
     */

    const generate_list_item = (task_descr_value) => {
        const list_item_container = $html('li', task_list_container);
        const mark_item_off = $html('input', list_item_container, { type: 'checkbox' });
        const mark_as_priority = $html('span', list_item_container, { class: 'prioritize', innerHTML: '&star;' });
        const task_descr_container = $html('div', list_item_container, { class: 'task-descr'});
        const task_descr_label = $html('span', task_descr_container, { innerText: task_descr_value });
    };

    add_task_bttn.addEventListener('click', ($event) => {
        $event.preventDefault();
        $event.stopPropagation();

        const task_value = new_task_input.value;

        // Task should contain at least 4 characters to avoid cluttering up the DOM with otherwise 
        // useless elements.
        if(task_value.length >= 4) {
            generate_list_item(task_value);
        }
        // Anything less than 4 will trigger an error.
        else {
            alert('Error: task description should contain at least four (4) characters at minimum; try again.');
            return false;
        }
    });
};