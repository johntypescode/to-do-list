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

        /////////////////////////////////////////////////
        // Create the new list item mark-up structure. //
        /////////////////////////////////////////////////
        const list_item_container = $html('li', task_list_container);
        const mark_item_off = $html('input', list_item_container, { type: 'checkbox' });
        const mark_as_priority = $html('span', list_item_container, { class: 'prioritize', innerHTML: '&star;' });
        const task_descr_container = $html('div', list_item_container, { class: 'task-descr'});
        const task_descr_label = $html('span', task_descr_container, { innerText: task_descr_value });
        const edit_bttn = $html('button', list_item_container, { class: 'edit-item', innerHTML: 'Edit' });
        const delete_bttn = $html('button', list_item_container, { class: 'delete-item', innerHTML: 'Delete' });

        ///////////////////////////////////
        // Mark an item off of the list. //
        ///////////////////////////////////
        mark_item_off.addEventListener('change', ($change_event) => {
            $change_event.preventDefault();
            $change_event.stopPropagation();

            task_descr_label.classList.toggle('completed');
        });

        ///////////////////////////////////
        // Mark a task item as priority. //
        ///////////////////////////////////
        mark_as_priority.addEventListener('click', () => {
            list_item_container.classList.toggle('priority');
            if(list_item_container.classList.contains('priority')) {
                mark_as_priority.classList.add('yellow');
                mark_as_priority.innerHTML = '&starf;'; // Prioritized.
            }
            else {
                mark_as_priority.classList.remove('yellow');
                mark_as_priority.innerHTML = '&star;'; // Not prioritized.
            }
        });

        //////////////////////////////////////
        // Edit task list item description. //
        //////////////////////////////////////
        edit_bttn.addEventListener('click', ($click_event) => {
            $click_event.preventDefault();
            $click_event.stopPropagation();

            // Temporarily hide the existing description label until the a new value is submitted.
            task_descr_label.style.display = 'none';
            
            // Create an editor form.
            const descr_editor = $html('textarea', task_descr_container, { innerText: task_descr_label.innerText });
            const save_editor = $html('button', task_descr_container, { innerHTML: 'Save...' });

            // Temporarily disable further modifications until a new value is processed.
            mark_item_off.disabled = true;
            edit_bttn.disabled = true;
            delete_bttn.disabled = true;

            // Automatically focus in on the editor.
            descr_editor.focus();
            descr_editor.setSelectionRange(descr_editor.value.length, descr_editor.value.length);

            save_editor.addEventListener('click', ($event) => {
                $event.preventDefault();
                $event.stopPropagation();

                const new_value = descr_editor.value.trim();
                if(new_value.length > 0 && new_value.length >= 4) {
                    task_descr_label.textContent = new_value;
                    task_descr_label.style.display = 'block';

                    // Hide the editor form.
                    task_descr_container.removeChild(descr_editor);
                    task_descr_container.removeChild(save_editor);

                    // Re-enable further modifications.
                    mark_item_off.disabled = false;
                    edit_bttn.disabled = false;
                    delete_bttn.disabled = false;
                }
                else {
                    alert('Error: task description should contain at least four (4) characters at minimum; try again.');
                    descr_editor.focus();
                    return false;                    
                }
            });
        });

        delete_bttn.addEventListener('click', ($event) => {
            $event.preventDefault();
            $event.stopPropagation();

            if(confirm('Warning: you are about to permanently delete this task from the list. This action cannot be undone. Are you sure you want to do this?')) {
                task_list_container.removeChild(list_item_container);
            }
        });
    };

    /**
     * Append a new task to the list.
     * ==============================
     */
    const add_task_to_list = ($event) => {
        $event.preventDefault();
        $event.stopPropagation();

        // Grab the value of the new list item.
        const task_value = new_task_input.value;

        // Task should contain at least 4 characters to avoid cluttering up the DOM with otherwise 
        // useless elements.
        if(task_value.length >= 4) {
            generate_list_item(task_value);

            new_task_input.value = '';
            new_task_input.focus();
        }
        // Anything less than 4 will trigger an error.
        else {
            alert('Error: task description should contain at least four (4) characters at minimum; try again.');
            return false;
        }
    };

    add_task_bttn.addEventListener('click', add_task_to_list);
};