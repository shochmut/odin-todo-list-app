import './styles.css';
import notebookEditIcon from './Assets/notebook-edit.svg'
import plusCircle from './Assets/plus-circle.svg'
import windowCloseIcon from './Assets/window-close.svg'

export const todoLogic = (function() {
    //module containing all application logic
    let todos = [];
    let projects = [];

    function createTodo(title, description, dueDate, priority, state, notes, checklist, project = 'Todo') {
        const newTodo = {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            state: state,
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

    return{todos, projects, createTodo, createProject};
})();

todoLogic.createProject('Todo')
todoLogic.createProject('Test Project')
todoLogic.createTodo('Example Todo', 'This is my first todo item', '12/1/2023', 'high', 'not started', 'notes', 'blank')


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
        title.innerHTML = 'Test Sidebar';
        sidebar.appendChild(title);

        //iterate through and add projects to sidebar
        todoLogic.projects.forEach(function (item, index) {sidebar.appendChild(renderProject(item))});

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

    function renderProject(project) {
        const display = document.createElement('div');
        display.classList.add('project-container');

        const title = document.createElement('li');
        title.classList.add('project-title');
        title.innerHTML = project.title;
        display.appendChild(title);
        return display
    }

    function createWorkspace() {
        const workspace = document.createElement('div');
        workspace.classList.add('workspace-container');

        const title = document.createElement('h1');
        title.classList.add('workspace-item');
        title.innerHTML = 'Test Workspace';

        workspace.appendChild(title);
        return workspace;
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

    return {createHeader, createSidebar, createWorkspace, createAddProjectForm}
    
})();


