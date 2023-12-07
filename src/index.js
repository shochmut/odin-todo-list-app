import './styles.css';
import {renderWebsite} from './app.js'
import {todoLogic} from './app.js'

function loadWebsite() {
    const content = document.getElementById('content');

    content.appendChild(renderWebsite.createHeader());
    content.appendChild(renderWebsite.createSidebar());
    content.appendChild(renderWebsite.createWorkspace());
    content.appendChild(renderWebsite.createAddProjectForm());

    //open add project form handler
    const openAddProjectForm = document.getElementById('addProjectButton');
    const addProjectForm = document.getElementById('createProjectForm');
    const closeWindowButton = document.querySelector('.close-window-button');

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
      project.value = '';
      content.appendChild(renderWebsite.createSidebar());
    })
  }
  
loadWebsite()