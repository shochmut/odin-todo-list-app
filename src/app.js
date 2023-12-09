import './styles.css';
import notebookEditIcon from './Assets/notebook-edit.svg'
import plusCircle from './Assets/plus-circle.svg'
import windowCloseIcon from './Assets/window-close.svg'
import squareEditIcon from './Assets/square-edit-outline.svg'
import trashCanIcon from './Assets/trash-can.svg'
import plusBoxIcon from './Assets/plus-box.svg'

export const todoLogic = (function() {
    //module containing all application logic
    let todos = [];
    let projects = [];
    let currentProject = 'Todo';

    function createTodo(title, description, dueDate, priority, done=false, notes, checklist, project = 'Todo') {
        const newTodo = {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            done: done,
            notes: notes,
            checklist: checklist,
            project: project, 
        }
        todos.push(newTodo);
        return {newTodo};
    }

    function createProject(title, todoList) {
        const newProject = {
            title: title,
            todoList: todoList,
        }
        projects.push(newProject);
        return {newProject, projects};
    }

    function setProject(project) { 
        currentProject = project;
    }

    function getCurrentProject() {
        return currentProject;
    }





    return{todos, projects, createTodo, createProject, setProject, getCurrentProject};
})();

todoLogic.createProject('Todo')
todoLogic.createProject('Test Project')
todoLogic.createTodo('Example Todo', 'This is my first todo item', '12/1/2023', 'high', false, 'notes', 'checklist')


export const renderWebsite = (function() {
    //module containing all user interface generation logic
    function createHeader() {
        const header = document.createElement('div');
        header.classList.add('header-container')
    
        const title = document.createElement('h1');
        title.classList.add('header-title');
        title.innerHTML = 'To-Do App';
    
        const dashIcon = new Image();
        dashIcon.src = notebookEditIcon;
        //dashIcon.type = "image";
        dashIcon.classList.add('header-icon')
    
        header.appendChild(title);
        header.appendChild(dashIcon);
    
        return header;
    }

    function createSidebar() {
        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar-container');

        const title = document.createElement('h1');
        title.classList.add('sidebar-item');
        title.innerHTML = 'Projects';
        sidebar.appendChild(title);

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');
        sidebar.appendChild(projectContainer);
        
        //iterate through and add projects to sidebar
        renderProjects(projectContainer);

        //add new project button
        const addProjectButton = document.createElement('button');
        addProjectButton.classList.add('add-project-button');
        addProjectButton.id = 'addProjectButton';
        const buttonText = document.createElement('span');
        buttonText.classList.add('add-project-button', 'button-text');
        buttonText.innerHTML = 'Add Project';
        const buttonIcon = document.createElement('span');
        buttonIcon.classList.add('add-project-button', 'button-icon');
        const plusCircleIcon = new Image();
        plusCircleIcon.src = plusCircle;
        //buttonIcon.appendChild(plusCircleIcon);
        buttonText.appendChild(plusCircleIcon);
        addProjectButton.appendChild(buttonText);

        sidebar.appendChild(addProjectButton);
        return sidebar;
    }

    function renderProjects(projectContainer) {
        projectContainer.replaceChildren();  // this clears out the projects first before rendering
        todoLogic.projects.forEach(function (item) {projectContainer.appendChild(renderProject(item))});
    }

    function renderProject(project) {
        const title = document.createElement('li');
        title.classList.add('project-title');
        title.innerHTML = project.title;
        return title
    }

    function createWorkspace() {
        const workspace = document.createElement('div');
        workspace.classList.add('workspace-container');

        const title = document.createElement('h1');
        title.classList.add('workspace-item');
        title.innerHTML = 'Test Workspace';
        workspace.appendChild(title);

        renderTodos(workspace);

        // Render The Add Todo Button
        const addTodoButton = document.createElement('input');
        addTodoButton.type = 'image';
        addTodoButton.id = 'add-todo-button';
        addTodoButton.src = plusBoxIcon;

        workspace.appendChild(addTodoButton)

        return workspace;
    }

    function renderTodos(workspace) {
        workspace.replaceChildren();
        todoLogic.todos.forEach(function (item) {workspace.appendChild(createTodoDisplay(item))});
    }

    function createTodoDisplay(item) {
        const TodoContainer = document.createElement('div');
        TodoContainer.classList.add('todo-container');
        
        const title = document.createElement('p');
        title.classList.add('todo-title');
        title.innerHTML = item.title;

        const description = document.createElement('p');
        description.classList.add('todo-description');
        description.innerHTML = item.description;

        const dueDate = document.createElement('p');
        dueDate.classList.add('todo-duedate');
        dueDate.innerHTML = item.dueDate;

        const priority = document.createElement('p');
        priority.classList.add('todo-priority');
        priority.innerHTML - item.priority;

        const done = document.createElement('input');
        done.classList.add('todo-done');
        done.type = 'checkbox'
        // Set the Checkbox Initial State
        if (item.done === true) {
            done.checked = true;
        } else {
            done.checked = false
        }

        const editButton = document.createElement('input');
        editButton.classList.add('todo-edit');
        editButton.type = 'image';
        editButton.src = squareEditIcon;

        const deleteButton = document.createElement('input');
        deleteButton.classList.add('todo-delete');
        deleteButton.type = 'image';
        deleteButton.src = trashCanIcon;

        TodoContainer.appendChild(title);
        TodoContainer.appendChild(description);
        TodoContainer.appendChild(dueDate);
        TodoContainer.appendChild(priority);
        TodoContainer.appendChild(editButton);
        TodoContainer.appendChild(deleteButton);
        TodoContainer.appendChild(done);

        return TodoContainer;
    }

    function createAddProjectForm() {
        const form = document.createElement('form');
        form.id = "createProjectForm";
        form.classList.add('add-project-form');
        const header = document.createElement('div');
        header.classList.add('add-project-form-header');
        form.appendChild(header);
        const title= document.createElement('h1');
        title.classList.add('add-project-form-title');
        title.innerHTML = 'Add New Project';
        header.appendChild(title);
        const windowCloseButton = document.createElement('button');
        windowCloseButton.classList.add('close-window-button')
        const windowClose = new Image();
        windowClose.src = windowCloseIcon;
        windowClose.classList.add('close-window-icon');
        windowCloseButton.appendChild(windowClose)
        header.appendChild(windowCloseButton);
        const titleInput = document.createElement('input');
        titleInput.classList.add('add-project-form-title-input');
        titleInput.id = 'project'
        titleInput.type = 'text';
        titleInput.placeholder = 'Project Title'
        form.appendChild(titleInput);
        const submitButton = document.createElement('input');
        submitButton.classList.add('create-project-submit')
        submitButton.type = 'submit';
        submitButton.value = "Create Project";
        form.appendChild(submitButton);


        return form;
    }

    function createAddTodoForm() {
        const form = document.createElement('form');
        form.id = 'create-todo-form';
        const header = document.createElement('div');
        header.id = 'create-todo-form-header'
        form.appendChild(header);
        const title = document.createElement('h1');
        title.innerHTML = 'Add New To Do';
        header.appendChild(title);
        const windowCloseButton = document.createElement('button');
        windowCloseButton.classList.add('close-window-button')
        const windowClose = new Image();
        windowClose.src = windowCloseIcon;
        windowClose.classList.add('close-window-icon');
        windowCloseButton.appendChild(windowClose)
        header.appendChild(windowCloseButton);
        const titleInput = document.createElement('input');
        titleInput.classList.add('create-todo-title');
        titleInput.type = 'text';
        titleInput.name = 'title'
        titleInput.placeholder = 'Todo Title';
        form.appendChild(titleInput);
        const submitButton = document.createElement('input');
        submitButton.id = 'create-todo-submit';
        submitButton.type = 'submit';
        submitButton.value = "Create Todo";
        form.appendChild(submitButton);

        const description = document.createElement('input');
        description.classList.add('create-todo-description');
        description.type = 'text';
        description.name = 'description'
        description.placeholder = "Description: ex) laundry, bills, etc.";
        form.appendChild(description);

        const dueDateContainer = document.createElement('label');
        dueDateContainer.classList.add('create-todo-duedate-label');
        dueDateContainer.innerHTML = 'Due Date: ';
        const dueDate = document.createElement('input');
        dueDate.classList.add('create-todo-duedate');
        dueDate.type = 'date';
        dueDate.name = 'duedate';
        dueDateContainer.appendChild(dueDate);
        form.appendChild(dueDateContainer);








        //     priority: priority,
        //     notes: notes,
        //     checklist: checklist,
        //     project: project, 

        return form
    }

    return {createHeader, createSidebar, createWorkspace, createAddProjectForm, renderProjects, createAddTodoForm}
    
})();


