const input = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const todoItems = document.getElementsByClassName('todo-item');
const footer = document.querySelector('.footer');
todoList.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('ck', e.target.input, todoItems);
});

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

    let todoText = document.createTextNode(input.value);
    circle.className = 'round';

    newLi.appendChild(circle);
    newLi.appendChild(todoText);
    newLi.appendChild(cancel);

    todoList.appendChild(newLi);

    console.log(input.value);

    footer.style.display = 'flex';
  }
});
