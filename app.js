document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('todo-input');
    const dueDateInput = document.getElementById('todo-date');
    const taskList = document.getElementById('todo-list');
    const darkModeBtn = document.getElementById('darkModeToggle');
    const addButton = document.getElementById('submit');
    const body = document.body;

    // Add Task Event - Corrected to Button Click
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;

        if (taskText === '' || dueDate === '') {
            alert('Please enter a task and select a due date.');
            return;
        }

        const listItem = document.createElement('div');
        listItem.classList.add('todo-item');

        // Calculate priority
        const priority = calculatePriority(dueDate);
        listItem.classList.add(priority);

        listItem.innerHTML = `
            <span class="text">${taskText} - ${dueDate}</span>
            <div class="action-items">
                <i class="fa-solid fa-check"></i>
                <i class="fa-solid fa-trash"></i>
            </div>
        `;

        taskList.appendChild(listItem);

        // Clear input fields
        taskInput.value = '';
        dueDateInput.value = '';
    });

    // Delete or Complete Task Event
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-trash')) {
            e.target.closest('.todo-item').remove();
        } else if (e.target.classList.contains('fa-check')) {
            e.target.closest('.todo-item').classList.toggle('completed');
        }
    });

    // Dark Mode Toggle - Fixed Class Name
    darkModeBtn.addEventListener('click', function () {
        body.classList.toggle('dark-theme');
    });

    // Calculate Priority Based on Due Date
    function calculatePriority(dueDate) {
        const today = new Date();
        const due = new Date(dueDate);
        const timeDiff = (due - today) / (1000 * 60 * 60 * 24);

        if (timeDiff <= 1) {
            return 'high';
        } else if (timeDiff <= 3) {
            return 'medium';
        } else {
            return 'low';
        }
    }
});
