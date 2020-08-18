var state = {
    todos: [],
    isEdit: false,
    id: null
};
var todo_form = document.querySelector('.todo_form_wrapper');
var title = document.querySelector('#title');
var description = document.querySelector('#description');
var cancelButton = document.querySelector('#cancel');
function reset() {
    title.value = '';
    description.value = '';
}

todo_form.addEventListener('submit', function (event) {
    event.preventDefault();



    if (state.isEdit) {
        var newTodo = {
            id: state.id,
            title: title.value,
            description: description.value
        };

        state.todos = todos_helper.editTodo(state.id, newTodo);
        resetEdit();
    }
    else {
        var newTodo = {
            id: todos_helper.getId(),
            title: title.value,
            description: description.value
        };

        state.todos = todos_helper.createTodo(newTodo);
    }


    reset();
    updateTodoList();
});


var todos_helper = (function (state) {

    function createTodo(newTodo) {
        return [...state.todos, newTodo];
    }

    function deleteTodo(todoId) {
        return state.todos.filter(todo => todo.id != todoId);
    }

    function editTodo(todoId, newTodo) {
        var idx = state.todos.findIndex(todo => todo.id == todoId);

        if (idx == -1) return state.todos;
        var newTodos = [...state.todos];
        newTodos[idx] = newTodo;

        return newTodos;

    }

    function getTodo(todoId) {
        return state.todos.find(todo => todo.id == todoId);
    }

    function getId() {
        return state.todos.length == 0 ? 1 : state.todos[state.todos.length - 1].id + 1;
    }

    return {
        createTodo,
        deleteTodo,
        editTodo,
        getTodo,
        getId
    };
})(state);


function resetEdit() {
    cancelButton.style.display = 'none';
    state.isEdit = false;
    state.id = null;
    reset();
}

function handleEdit(id) {
    cancelButton.style.display = 'inline-block';
    cancelButton.addEventListener('click', resetEdit);
    var todo = todos_helper.getTodo(id);
    title.value = todo.title;
    description.value = todo.description;
    state.isEdit = true;
    state.id = id;
}

var updateTodoList = (function (state) {
    var show_todo = document.querySelector('.show_todo');

    return function () {

        show_todo.innerHTML = '';

        if (state.todos.length == 0) {
            show_todo.textContent = 'No todos To display';
        }
        else {

            state.todos.forEach(function (todo) {

                var todo_wrapper = document.createElement('div');

                var wrapper_div = document.createElement('div');
                var action_wrapper = document.createElement('div');

                var title = document.createElement('h3');
                var description = document.createElement('h5');

                title.textContent = todo.title;
                description.textContent = todo.description;

                var deleteButton = document.createElement('button');
                var editButton = document.createElement('button');

                function handleDelete(id) {
                    state.todos = todos_helper.deleteTodo(id);
                    updateTodoList();
                }


                deleteButton.addEventListener('click', () => handleDelete(todo.id));

                editButton.addEventListener('click', () => handleEdit(todo.id));

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
    }

})(state);

updateTodoList();