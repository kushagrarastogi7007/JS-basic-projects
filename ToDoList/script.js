const addButton = document.getElementById('add-btn');
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.querySelector('#error');
const countValue = document.querySelector('.count-value');

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

