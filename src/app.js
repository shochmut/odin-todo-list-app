import './styles.css';
import notebookEditIcon from './Assets/notebook-edit.svg'


const todoLogic = (function() {
    //module containing all application logic
    let TodoList = [];

    function createTodo(title, description, dueDate, priority, state, notes, checklist, project = 'Todo') {
        TodoList.push()
        return {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            state: state,
            notes: notes,
            checklist: checklist,
            project: project,
        };
    }

    function createProject(title) {
        return {
            title: title,
        };
    }


    return{TodoList, createTodo, createProject};
})();

todoLogic.createProject('Todo')
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

    return {createHeader}
    
})();


