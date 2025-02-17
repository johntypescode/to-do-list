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

    // Initial test for `$html()`
    $html('p', $('body'), { innerText: 'You only see me because of JavaScript! :0'});

};