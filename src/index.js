import './styles.css';
import {renderWebsite} from './app.js'
import {todoLogic} from './app.js'

function loadWebsite() {
    const content = document.getElementById('content');

    content.appendChild(renderWebsite.createHeader());
    content.appendChild(renderWebsite.createSidebar());
    content.appendChild(renderWebsite.createWorkspace());
    content.appendChild(renderWebsite.createAddProjectForm());
    content.appendChild(renderWebsite.createAddTodoForm());

    // Set of DOM Selectors
    const openAddProjectForm = document.getElementById('addProjectButton');
    const addProjectForm = document.getElementById('createProjectForm');
    const closeWindowButton = document.querySelector('.close-window-button');
    const addTodoButton = document.querySelector('#add-todo-button');
    const addTodoForm = document.getElementById('create-todo-form');
    const closeTodoWindowButton = document.querySelector('#create-todo-form .close-window-button');
    const TodoContainer = document.querySelector('.todo-container');


    // Toggle Add Project Form Visibility
    openAddProjectForm.addEventListener('click', () => {
      addProjectForm.classList.toggle('activated');
    })

    // Close Add Project Form
    closeWindowButton.addEventListener('click', (e) => {
      e.preventDefault();
      addProjectForm.classList.toggle('activated');
    })
  
    // Add Project Form Submission and Refresh Sidebar
    addProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      todoLogic.createProject(project.value);
      project.value = ''; // reset form
      addProjectForm.classList.toggle('activated'); //close project form
      renderWebsite.renderProjects(document.querySelector('.project-container'));
    })

    // Add To Do Event Handler
    addTodoButton.addEventListener('click', (e) => {
      addTodoForm.classList.toggle('activated');
    })

    // Close Add Todo Form
    closeTodoWindowButton.addEventListener('click', (e) => {
      e.preventDefault();
      addTodoForm.classList.toggle('activated');
    })

    // Submit New Todo 
    addTodoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target.elements;

      const title = form.title.value;
      const description = form.description.value;
      const dueDate = form.duedate.value;

      todoLogic.createTodo(title, description, dueDate, undefined , undefined , undefined , undefined,  todoLogic.getCurrentProject());
      e.target.reset(); // reset form fields
      addTodoForm.classList.toggle('activated'); // close form

      renderWebsite.renderTodos(TodoContainer);
    })
  }
  
loadWebsite()