const input = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const todoItems = document.getElementsByClassName('todo-item');
const footer = document.querySelector('.footer');
const clearComplete = document.getElementById('clear-complete');
const itemsLeft = document.getElementById('items-left');

// todoList.addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log('ck', e.target.input, todoItems);
// });

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

    todoList.appendChild(newLi);

    console.log(input.value);

    footer.style.display = 'flex';
    input.value = '';
  }
  itemsLeft.innerText = `${todoItems.length} items left`;
});

clearComplete.addEventListener('click', function () {
  console.log(todoItems);
  // todoItems.forEach((item) => console.log('item', item));
  for (let item of todoItems) {
    console.log(item.firstChild);
    if (item.firstChild.classList.contains('task-complete')) {
      console.log('complete');
      // var li = item.parentNode;
      item.remove();
    }
  }
  itemsLeft.innerText = `${todoItems.length} items left`;
});
