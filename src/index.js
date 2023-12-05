import './styles.css';
import {renderWebsite} from './app.js'

function loadWebsite() {
    const content = document.getElementById('content');

    content.appendChild(renderWebsite.createHeader());
    content.appendChild(renderWebsite.createSidebar());
    content.appendChild(renderWebsite.createWorkspace());
    content.appendChild(renderWebsite.createAddProjectForm());

    //open add project form handler
    const openAddProjectForm = document.querySelector('.add-project-button');
    const addProjectForm = document.querySelector('.add-project-form');
    const closeWindowButton = document.querySelector('.close-window-button');

    openAddProjectForm.addEventListener('click', () => {
      addProjectForm.classList.toggle('activated');
    })
    console.log(closeWindowButton)
    closeWindowButton.addEventListener('click', (e) => {
      e.preventDefault;
      addProjectForm.classList.toggle('activated');
    })
  }
  
loadWebsite()