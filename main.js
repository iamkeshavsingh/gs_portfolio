todos = [{
    id: 1,
    title: 'Meeting',
    description: 'Meeting at 6:00 pm with VC.'
}, {
    id: 2,
    title: 'College',
    description: 'bjbvhdvhvhv'
}];


var show_todo = document.querySelector('.show_todo');


if (todos.length == 0) {
    show_todo.textContent = 'No todos To display';
}
else {

    todos.forEach(function (todo) {

        var todo_wrapper = document.createElement('div');

        var wrapper_div = document.createElement('div');
        var action_wrapper = document.createElement('div');

        var title = document.createElement('h3');
        var description = document.createElement('h5');

        title.textContent = todo.title;
        description.textContent = todo.description;

        var deleteButton = document.createElement('button');
        var editButton = document.createElement('button');

        deleteButton.addEventListener('click', function () {
            console.log(todo.id);
            // deleteTodo
        });

        editButton.addEventListener('click', function () {
            console.log(todo.id);
            // editTood
        })

        deleteButton.textContent = 'Delete';
        editButton.textContent = 'Edit';

        wrapper_div.appendChild(title);
        wrapper_div.appendChild(description);

        action_wrapper.appendChild(deleteButton);
        action_wrapper.appendChild(editButton);

        todo_wrapper.appendChild(wrapper_div);
        todo_wrapper.appendChild(action_wrapper);

        show_todo.appendChild(todo_wrapper);

    });
}

