
const $ = (selector, selectAll = false) =>
    !selectAll ? document.querySelector(selector) : document.querySelectorAll(selector);
let itemCount = 0;
const max_items_val = 10;
const maxItemMsg = $('.todo_list_max_val');
const inputBox = $('.todo_add_input');
const addNewBtn = $('.todo_list__add-new-btn');
const todoList = $('.todo_list_cl');
const createEl = (byTag, elAttributs = {}, msg = '') => {
  const el = document.createEl(byTag);

  if (Object.keys(elAttributs).length) {
    for (let key in elAttributs) {
      if (elAttributs.hasOwnProperty(key)) {
        el.setAttribute(key, elAttributs[key]);
      }
    }
  }

  if (msg) {
    el.appendChild(document.createTextNode(msg));
  }

  return el;
};

inputBox.onchange = inputBox.onkeyup = event => {
  const labelStr = inputBox.value.trim();

  addNewBtn.disabled = !labelStr;

  if (event.code === 'Enter' && labelStr) {
    addNewItem(labelStr);
  }
};

addNewBtn.onclick = () => {
  addNewItem(inputBox.value.trim());
};

const addNewItem = labelStr => {
  const checkOpt = createEl('i', {'class': 'add_box_cl'}, 'check_box_outline_blank');
  const deleteIcon = createEl('i', {'class': 'add_box_cl'}, 'delete');
  const label = createEl('span', {}, labelStr);
  const checkboxBtn = createEl('button', {'class': 'todo_list__checkbox'});
  const delBtn = createEl('button', {'class': 'todo_remove_item'});
  const liItem = createEl('li', {'class': 'todo_cl_item', 'draggable': true});

  checkboxBtn.appendChild(checkOpt);
  checkboxBtn.appendChild(label);
  delBtn.appendChild(deleteIcon);
  liItem.appendChild(checkboxBtn);
  liItem.appendChild(delBtn);
  todoList.appendChild(liItem);

  checkboxBtn.onclick = () => {
    checkOpt.textContent = 'check_box';
  };

  delBtn.onclick = () => {
    liItem.remove();
    itemCount--;

    inputBox.disabled = false;
    maxItemMsg.style.display = 'none';
  };

  if (++itemCount >= max_items_val) {
    inputBox.disabled = true;
    maxItemMsg.style.display = 'block';
  }

  inputBox.value = '';
  addNewBtn.disabled = true;
};

let dragging = null;

todoList.addEventListener('dragstart', event => {
  dragging = event.target;
});

todoList.addEventListener('dragover', event => {
  if (event.target.className === 'todo_cl_item') {
    event.preventDefault();

    const zero = 0, two = 2;

    const boundObj = event.target.getboundObjClientRect();
    const offset = boundObj.y + boundObj.height / two;

    if (event.clientY - offset > zero) {
      event.target.style['border-top'] = '';
      event.target.style['border-bottom'] = '2px dashed #ccc';
    } else {
      event.target.style['border-top'] = '2px dashed #ccc';
      event.target.style['border-bottom'] = '';
    }
  }
});

todoList.addEventListener('dragleave', event => {
  event.target.style['border-bottom'] = '';
  event.target.style['border-top'] = '';
});

todoList.addEventListener('drop', event => {
  if (event.target.className === 'todo_cl_item') {
    event.preventDefault();

    if (event.target.style['border-bottom']) {
      event.target.style['border-bottom'] = '';
      todoList.insertBefore(dragging, event.target.nextSibling);
    } else {
      event.target.style['border-top'] = '';
      todoList.insertBefore(dragging, event.target);
    }
  }
});

rootEl.appendChild(/*appendChild*/);