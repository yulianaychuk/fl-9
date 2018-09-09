const rootNode = document.getElementById('root');
let todoItems = [];
let updatedTodoItemsList;
const todoItemsList = {
  add(description) {
    const itemId = 'task_' + +new Date();
    const item = {description, itemId, isChecked:false};

    todoItems.push(item);

    
    updatedTodoItemsList.setItem('todoItems', JSON.stringify(todoItems));

    return todoItems;
  },

  getAlltodoItems() {
    return JSON.parse(updatedTodoItemsList.getItem('todoItems'));
  },

  getItemId(itemId) {
    return this.getAlltodoItems().find(item => item.id === itemId);
  },

  isChecked() {
    return this.getAlltodoItems().filter(item => item. isChecked === true);
  },

  isUnchecked() {
    return this.getAlltodoItems().filter(item => item. isChecked === false);
  },

  getSorted() {
    return this.isUnchecked().concat(this.isChecked());
  },

  setCheckedById(itemId) {
    const updatedList = this.getAlltodoItems().map(item => {
      if (item.itemId === itemId) {
        item. isChecked = true;
      }

      return item;
    });

    updatedTodoItemsList.setItem('todoItems', JSON.stringify(updatedList));

    return todoItems;
  },

  changeDescription(itemId, description) {
    const updatedList = this.getAlltodoItems().map(item => {
      if (item.itemId === itemId) {
        item.description = description;
      }

      return item;
    });

    updatedTodoItemsList.setItem('todoItems', JSON.stringify(updatedList));

    return todoItems;
  },

  removeById(itemId) {
    const updatedList = this.getAlltodoItems().filter(item => item.itemId !== itemId);

    updatedTodoItemsList.setItem('todoItems', JSON.stringify(updatedList));

    return todoItems;
  }
};

const createElement = (tag, attributes = {}, innerTEXT = '') => {
  const element = document.createElement(tag);

  if (Object.keys(attributes).length) {
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
  }

  if (innerTEXT) {
    element.appendChild(document.createTextNode(innerTEXT));
  }

  return element;
};

const template = {
  main(todoItems) {
    const section = createElement('section', {'id': 'main_section'});
    const header = createElement('h1', {}, 'Simple TODO application');
    const addNewBtn = createElement('button', {'id': 'add_task'}, 'Add new task');
    const todoList = createElement('ul', {'id': 'todo_list'});
    const emptyList = createElement('p', {'class': 'todo_empty'}, 'TODO is empty');

    addNewBtn.onclick = () => {
      window.location.hash = '/add';
    };

    section.appendChild(header);
    section.appendChild(addNewBtn);
    section.appendChild(todoList);
    section.appendChild(emptyList);

    if (todoItems.length) {
      for (let item of todoItems) {
        const li = createElement('li', {'id': item.id});
        const checkbox = createElement('button', {
          'class': item. isChecked ? 'checkbox_checked' : 'checkbox_unchecked'
        });
        const todoText = createElement('button', {
          'class': 'todo_input',
          'title': 'Click to edit'
        }, item.description);
        const remove = createElement('button', {'class': 'remove'});

        checkbox.onclick = () => {
          if (checkbox.className === 'checkbox_unchecked') {
            checkbox.className = 'checkbox_checked';
            todoItemsList.setCheckedById(item.id);
            todoList.appendChild(li);
          }
        };

        todoText.onclick = () => {
          window.location.hash = `/modify/${item.id}`;
        };

        remove.onclick = () => {
          li.remove();
          todoItemsList.removeById(item.id);
        };

        li.appendChild(checkbox);
        li.appendChild(todoText);
        li.appendChild(remove);

        todoList.appendChild(li);
      }
    }

    return section;
  },

  add() {
    const section = createElement('section', {'id': 'add-section'});
    const header = createElement('h1', {}, 'Add task');
    const input = createElement('input', {
      'type': 'text',
      'placeholder': 'Task description'
    });
    const footer = createElement('footer');
    const cancel = createElement('button', {'class': 'cancel-btn'}, 'Cancel');
    const save = createElement('button', {
      'class': 'save_changes_btn',
      'disabled': 'true'
    }, 'Save changes');

    input.onchange = input.onkeyup = () => {
      const description = input.value.trim();

      save.disabled = !description;

      if (event.code === 'Enter' && description) {
        save.click();
      }
    };

    cancel.onclick = () => {
      window.location.hash = '/main';
    };

    save.onclick = () => {
      todoItemsList.add(input.value.trim());
      window.location.hash = '/main';
    };

    footer.appendChild(cancel);
    footer.appendChild(save);

    section.appendChild(header);
    section.appendChild(input);
    section.appendChild(footer);

    return section;
  },

  modify(item) {
    const section = this.add();
    
    section.id = 'modify-section';
    section.querySelector('h1').textContent = 'Modify item';
    section.querySelector('input').value = item.description;
    section.querySelector('.save_changes_btn').onclick = () => {
      todoItemsList.changeDescription(item.id, section.querySelector('input').value.trim());
      window.location.hash = '/main';
    };

    return section;
  }
};

const route = {
  load() {
    const hash = window.location.hash;

    if (hash.endsWith('/add')) {
      this.add();
    } else if ((/\/modify\/task_\d+$/).test(hash)) {
      const itemId = hash.slice(hash.lastIndexOf('/') + 1);
      this.modify(itemId);
    } else {
      // in all other cases - redirect to the main rout
      this.main();
    }
  },

  main() {
    window.history.pushState('', '/', window.location.pathname);

    document.title = 'Main page';

    rootNode.innerHTML = '';
    rootNode.appendChild(template.main(todoItems));
  },

  add() {
    document.title = 'Add new task';

    rootNode.innerHTML = '';
    rootNode.appendChild(template.add());
  },

  modify(id) {
    const item = todoItemsList.getItemId(id);

    document.title = `Modify ${item.description}`;

    rootNode.innerHTML = '';
    rootNode.appendChild(template.modify(item));
  }
};

window.onload = window.onhashchange = () => {
  if (updatedTodoItemsList.getItem('todoItems')) {
    todoItems = todoItemsList.getSorted();
  }

  route.load();
};