const input = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const todoItems = document.getElementsByClassName('todo-item');
const footer = document.querySelector('.footer');
const clearComplete = document.getElementById('clear-complete');
const itemsLeft = document.getElementById('items-left');

const allItems = document.getElementById('all-items');
const activeItems = document.getElementById('active-items');
const completedItems = document.getElementById('completed-items');

const toggleButton = document.querySelector('.toggle-button');

allItems.style.color = 'red';

const setDraggedOver = (e) => {
  e.preventDefault();
  draggedOver = Number.isNaN(parseInt(e.target.innerText))
    ? e.target.innerText
    : parseInt(e.target.innerText);
};

const setDragging = (e) => {
  dragging = Number.isNaN(parseInt(e.target.innerText))
    ? e.target.innerText
    : parseInt(e.target.innerText);
};

const reorder = (e) => {
  var index1 = Array(...todoItems).findIndex(
    (item) => item.innerText === dragging
  );
  var index2 = Array(...todoItems).findIndex(
    (item) => item.innerText === draggedOver
  );

  let a = Array(...todoItems).splice(index1, 1);
  todoItems[index1].parentNode.removeChild(todoItems[index1]);
  todoList.insertBefore(a[0], todoItems[index2]);
};

function removeItem(e) {
  console.log('ck', e, todoItems);
}

input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();

    const newLi = document.createElement('li');
    newLi.className = 'todo-item';
    let circle = document.createElement('div');
    circle.className = 'completed';
    let cancel = document.createElement('a');
    var img = new Image();
    img.className = 'close-cross';
    img.src = '../images/icon-cross.svg';
    img.setAttribute('alt', 'close');
    cancel.appendChild(img);

    cancel.addEventListener('click', function () {
      var li = this.parentNode;
      li.remove();
      itemsLeft.innerText = `${todoItems.length} items left`;
    });

    circle.addEventListener('click', function () {
      circle.classList.toggle('task-complete');
      console.log(circle.parentElement.parentElement);
      circle.parentElement.classList.toggle('line-through');
    });

    let todoText = document.createTextNode(input.value);
    circle.className = 'round';

    newLi.appendChild(circle);
    newLi.appendChild(todoText);
    newLi.appendChild(cancel);

    newLi.draggable = true;
    newLi.addEventListener('drag', setDragging);
    newLi.addEventListener('dragover', setDraggedOver);
    newLi.addEventListener('drop', reorder);

    todoList.appendChild(newLi);

    console.log(input.value);

    footer.style.display = 'flex';
    input.value = '';
  }
  itemsLeft.innerText = `${todoItems.length} items left`;
});

clearComplete.addEventListener('click', function () {
  console.log(todoItems);
  for (let item of todoItems) {
    console.log(item.firstChild);
    if (item.firstChild.classList.contains('task-complete')) {
      console.log('complete');
      item.remove();
    }
  }
  itemsLeft.innerText = `${todoItems.length} items left`;
});

function filterItems(status = '') {
  console.log('status', status);
  if (status === 'active') {
    for (let item of todoItems) {
      if (item.firstChild.classList.contains('task-complete')) {
        item.style.display = 'none';
      } else {
        item.style.display = 'flex';
      }
    }
    allItems.style.color = 'black';
    activeItems.style.color = 'red';
    completedItems.style.color = 'black';
  } else if (status === 'completed') {
    for (let item of todoItems) {
      if (!item.firstChild.classList.contains('task-complete')) {
        item.style.display = 'none';
      } else {
        item.style.display = 'flex';
      }
    }
    allItems.style.color = 'black';
    activeItems.style.color = 'black';
    completedItems.style.color = 'red';
  } else {
    for (let item of todoItems) {
      item.style.display = 'flex';
    }
    allItems.style.color = 'red';
    activeItems.style.color = 'black';
    completedItems.style.color = 'black';
  }
}

activeItems.addEventListener('click', () => filterItems('active'));
completedItems.addEventListener('click', () => filterItems('completed'));
allItems.addEventListener('click', () => filterItems());

toggleButton.addEventListener('click', () => {
  console.log('toggle');
  toggleButton.classList.toggle('toggle-light');
});
