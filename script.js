// the features that i want add on
// 1. User can input the todo task and add it into "todo" section
// either by pressing enter or clicking add button
// 2. User can edit a submitted task and need to confirm the changes
// either by pressing enter or clicking save. User can cancel the changes
// 3. User can remove a submitted task
// 4. User can click the task that has done and move it into "completed" section
// 5. User can click the task on "completed" section and move it back into "todo" section
// 6. User can click filter either based on task name or completed tasks.
// advanced: User can drag the task and place it into a new place on the list order.

// Prompt the user for their name
const name = prompt('Please enter your name:');
// Update the greeting element with the user's name
const greetingElement = document.getElementById('greeting');

greetingElement.textContent = name? `Hello world, ${name}!` : "Hello world";

// Get the required elements from the HTML
const inputBox = document.getElementById('input-box');
const addButton = document.getElementById('add-button');
const listContainer = document.getElementById('list-container');
const completedContainer = document.getElementById('completed-container');
const filterInput = document.getElementById('filter-input');
const filterCheckbox = document.getElementById('filter-checkbox-clicked');

// Create an array to store the tasks
let tasks = [];

// Function to render the tasks in the UI
function renderTasks() {
    // Clear the existing tasks
    listContainer.innerHTML = '';
    completedContainer.innerHTML = '';
  
    // Filter the tasks based on the filter input and checkbox
    const filteredTasks = tasks.filter(task => {
      if (filterCheckbox.checked) {
        completedContainer.style.display = 'block';
        listContainer.style.display = 'none';
        return task.name.toLowerCase().includes(filterInput.value.toLowerCase()) && task.completed;
      } else {
        completedContainer.style.display = 'block';
        listContainer.style.display = 'block';
        return task.name.toLowerCase().includes(filterInput.value.toLowerCase());
      }
    });
  
    // Check if the "Need to do!" text should be shown
    const showNeedToDoText = !filterCheckbox.checked;

    // Show or hide the "Need to do!" text based on the filter checkbox and tasks length
    const todoListText = document.querySelector('.todo-list p');
    todoListText.style.display = showNeedToDoText ? 'block' : 'none';

    // Render the tasks in the UI
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        const taskName = document.createElement('span');
        taskName.setAttribute('id', 'task-name')
        taskName.textContent = task.name;
  
        // Create the edit button include save and cancel buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = task.name;
            editInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    const newName = editInput.value.trim();
                    if (newName === '') {
                        alert('Task name cannot be empty. The task will not be changed.');
                    } else {
                        task.name = newName;
                        renderTasks();
                    }
                }
              });
    
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', () => {
                const newName = editInput.value.trim();
                if (newName === '') {
                    alert('Task name cannot be empty. The task will not be changed.');
                } else {
                    task.name = newName;
                    renderTasks();
                }
            });
    
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('click', () => {
                renderTasks();
            });
    
            // Replace the task name with the edit input field and buttons
            li.innerHTML = '';
            li.appendChild(editInput);
            li.appendChild(saveButton);
            li.appendChild(cancelButton);
        });
  
        // Add button to remove the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            const confirmRemove = confirm('Are you sure you want to remove this task?');
            if (confirmRemove) {
                tasks = tasks.filter(t => t !== task);
                renderTasks();
            }
        });
  
        // Create a container for the buttons (edit && remove)
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(removeButton);
        li.appendChild(taskName);
        li.appendChild(buttonContainer);

        // Add the appropriate class based on the task's completion status
        // if (task.completed) {
        //     li.classList.add('checked');
        // }
    
        // Add event listener for toggling the task's completion status
        taskName.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks();
        });
  
        // Append the task to the appropriate container
        if (task.completed) {
            li.classList.add('checked');
            li.style.textDecoration = 'line-through';
            completedContainer.appendChild(li);
        } else {
            listContainer.appendChild(li);
        }
    });
}

// Function to add a new task
function addTask() {
  const taskName = inputBox.value.trim();
  if (taskName) {
    const task = {
      name: taskName,
      completed: false
    };
    tasks.push(task);
    renderTasks();
    inputBox.value = '';
  }
}

// Event listener for the add button
addButton.addEventListener('click', addTask);

// Event listener for the enter key in the input box
inputBox.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Event listener for the filter input
filterInput.addEventListener('input', renderTasks);

// Event listener for the filter checkbox
filterCheckbox.addEventListener('change', renderTasks);

// Initial rendering of the tasks
renderTasks();