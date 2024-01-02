import "./styles.css";
import notebookEditIcon from "./Assets/notebook-edit.svg";
import plusCircle from "./Assets/plus-circle.svg";
import windowCloseIcon from "./Assets/window-close.svg";
import squareEditIcon from "./Assets/square-edit-outline.svg";
import trashCanIcon from "./Assets/trash-can.svg";
import plusBoxIcon from "./Assets/plus-box.svg";
import { format } from "date-fns";
import "lodash";

export const todoLogic = (function() {
  //module containing all application logic
  let todos = [];
  let projects = [];
  let currentProject = "Todo";

  function createTodo(
    title,
    description,
    dueDate,
    priority,
    done = false,
    notes,
    checklist,
    project = "Todo"
  ) {
    const newTodo = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      done: done,
      notes: notes,
      checklist: checklist,
      project: project,
      id: _.uniqueId()
    };
    todos.push(newTodo);
    return { newTodo };
  }

  function createProject(title, todoList) {
    const newProject = {
      title: title,
      todoList: todoList
    };
    projects.push(newProject);
    return { newProject, projects };
  }

  function setProject(project) {
    currentProject = project;
  }

  function getCurrentProject() {
    return currentProject;
  }

  function getCurrentTodos(activeProject) {
    const currentTodos = todos.filter(todo => {
      return todo.project == activeProject;
    });
    return currentTodos;
  }

  function editTodo(todoSelector, newTitle, newDescription, newDueDate) {
    let obj = todos.find((o, i) => {
      if (o.id === todoSelector) {
        todos[i].title = newTitle;
        todos[i].description = newDescription;
        todos[i].dueDate = newDueDate;
      }
    });
  }

  function checkIfProjectExists(projectTitle) {
    if (projects.some(project => project.title === projectTitle)) {
      return true;
    } else {
      return false;
    }
  }

  function deleteTodo(TodoId) {
    let obj = todos.findIndex(({ id }) => id === TodoId);
    console.log(obj);
    todos.splice(obj, 1);
  }

  return {
    todos,
    projects,
    createTodo,
    createProject,
    setProject,
    getCurrentProject,
    getCurrentTodos,
    checkIfProjectExists,
    editTodo,
    deleteTodo
  };
})();

todoLogic.createProject("Todo");
todoLogic.createProject("Test Project");
todoLogic.createTodo(
  "Example Todo",
  "This is my first todo item",
  "12/1/2023",
  "high",
  false,
  "notes",
  "checklist"
);

export const renderWebsite = (function() {
  //module containing all user interface generation logic
  let selectedTodo = "";

  function createHeader() {
    const header = document.createElement("div");
    header.classList.add("header-container");

    const title = document.createElement("h1");
    title.classList.add("header-title");
    title.innerHTML = "To-Do App";

    const dashIcon = new Image();
    dashIcon.src = notebookEditIcon;
    //dashIcon.type = "image";
    dashIcon.classList.add("header-icon");

    header.appendChild(title);
    header.appendChild(dashIcon);

    return header;
  }

  function createSidebar() {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar-container");

    const title = document.createElement("h1");
    title.classList.add("sidebar-item");
    title.innerHTML = "Projects";
    sidebar.appendChild(title);

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    sidebar.appendChild(projectContainer);

    //iterate through and add projects to sidebar
    renderProjects(projectContainer);

    //add new project button
    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add("add-project-button");
    addProjectButton.id = "addProjectButton";
    const buttonText = document.createElement("span");
    buttonText.classList.add("add-project-button", "button-text");
    buttonText.innerHTML = "Add Project";
    const buttonIcon = document.createElement("span");
    buttonIcon.classList.add("add-project-button", "button-icon");
    const plusCircleIcon = new Image();
    plusCircleIcon.src = plusCircle;
    //buttonIcon.appendChild(plusCircleIcon);
    buttonText.appendChild(plusCircleIcon);
    addProjectButton.appendChild(buttonText);

    sidebar.appendChild(addProjectButton);
    return sidebar;
  }

  function renderProjects(projectContainer) {
    projectContainer.replaceChildren(); // this clears out the projects first before rendering
    todoLogic.projects.forEach(function(item) {
      projectContainer.appendChild(renderProject(item));
    });
  }

  function renderProject(project) {
    const title = document.createElement("li");
    title.classList.add("project-title");
    title.innerHTML = project.title;
    title.addEventListener("click", function() {
      renderWebsite.resetActiveProjects(
        document.querySelectorAll(".project-title")
      );
      title.classList.toggle("activated");
      todoLogic.setProject(title.innerHTML);
      renderTodos(document.querySelector(".todo-container"));
    });

    return title;
  }

  function createWorkspace() {
    const workspace = document.createElement("div");
    workspace.classList.add("workspace-container");

    const TodoContainer = document.createElement("div");
    TodoContainer.classList.add("todo-container");
    workspace.appendChild(TodoContainer);
    renderTodos(TodoContainer);

    // Render The Add Todo Button
    const addTodoButton = document.createElement("input");
    addTodoButton.type = "image";
    addTodoButton.id = "add-todo-button";
    addTodoButton.src = plusBoxIcon;

    workspace.appendChild(addTodoButton);

    return workspace;
  }

  function renderTodos(TodoContainer) {
    TodoContainer.replaceChildren();
    const currentTodos = todoLogic.getCurrentTodos(
      todoLogic.getCurrentProject()
    );
    currentTodos.forEach(function(item) {
      TodoContainer.appendChild(createTodoDisplay(item));
    });
  }

  function createTodoDisplay(item) {
    const Todo = document.createElement("div");
    Todo.classList.add("todo");

    const title = document.createElement("p");
    title.classList.add("todo-title");
    title.innerHTML = item.title;

    const description = document.createElement("p");
    description.classList.add("todo-description");
    description.innerHTML = item.description;

    const dueDate = document.createElement("p");
    dueDate.classList.add("todo-duedate");
    dueDate.innerHTML = item.dueDate;

    const priority = document.createElement("p");
    priority.classList.add("todo-priority");
    priority.innerHTML - item.priority;

    const done = document.createElement("input");
    done.classList.add("todo-done");
    done.type = "checkbox";
    // Set the Checkbox Initial State
    if (item.done === true) {
      done.checked = true;
    } else {
      done.checked = false;
    }

    const editButton = document.createElement("input");
    editButton.classList.add("todo-edit");
    editButton.type = "image";
    editButton.src = squareEditIcon;
    editButton.addEventListener("click", function() {
      selectedTodo = item.id;
      document.querySelector(".edit-todo-title").defaultValue = item.title;
      document.querySelector(".edit-todo-description").defaultValue =
        item.description;
      if (item.dueDate) {
        document.querySelector(".edit-todo-duedate").value = format(
          new Date(item.dueDate),
          "yyyy-MM-dd"
        );
      } else {
        document.querySelector(".edit-todo-duedate").value = "";
      }
      document.getElementById("edit-todo-form").classList.toggle("activated");
    });

    const deleteButton = document.createElement("input");
    deleteButton.classList.add("todo-delete");
    deleteButton.type = "image";
    deleteButton.src = trashCanIcon;
    deleteButton.addEventListener("click", function() {
      const TodoContainer = document.querySelector(".todo-container");
      todoLogic.deleteTodo(item.id);
      renderWebsite.renderTodos(TodoContainer);
    });

    Todo.appendChild(title);
    Todo.appendChild(description);
    Todo.appendChild(dueDate);
    Todo.appendChild(priority);
    Todo.appendChild(editButton);
    Todo.appendChild(deleteButton);
    Todo.appendChild(done);

    return Todo;
  }

  function createAddProjectForm() {
    const form = document.createElement("form");
    form.id = "createProjectForm";
    form.classList.add("add-project-form");
    const header = document.createElement("div");
    header.classList.add("add-project-form-header");
    form.appendChild(header);
    const title = document.createElement("h1");
    title.classList.add("add-project-form-title");
    title.innerHTML = "Add New Project";
    header.appendChild(title);
    const windowCloseButton = document.createElement("button");
    windowCloseButton.classList.add("close-window-button");
    const windowClose = new Image();
    windowClose.src = windowCloseIcon;
    windowClose.classList.add("close-window-icon");
    windowCloseButton.appendChild(windowClose);
    header.appendChild(windowCloseButton);
    const titleInput = document.createElement("input");
    titleInput.classList.add("add-project-form-title-input");
    titleInput.id = "project";
    titleInput.type = "text";
    titleInput.placeholder = "Project Title";
    form.appendChild(titleInput);
    const submitButton = document.createElement("input");
    submitButton.classList.add("create-project-submit");
    submitButton.type = "submit";
    submitButton.value = "Create Project";
    form.appendChild(submitButton);

    return form;
  }

  function createAddTodoForm() {
    const form = document.createElement("form");
    form.id = "create-todo-form";
    const header = document.createElement("div");
    header.id = "create-todo-form-header";
    form.appendChild(header);
    const title = document.createElement("h1");
    title.innerHTML = "Add New To Do";
    header.appendChild(title);
    const windowCloseButton = document.createElement("button");
    windowCloseButton.classList.add("close-window-button");
    const windowClose = new Image();
    windowClose.src = windowCloseIcon;
    windowClose.classList.add("close-window-icon");
    windowCloseButton.appendChild(windowClose);
    header.appendChild(windowCloseButton);
    const titleInput = document.createElement("input");
    titleInput.classList.add("create-todo-title");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.placeholder = "Todo Title";
    form.appendChild(titleInput);
    const submitButton = document.createElement("input");
    submitButton.id = "create-todo-submit";
    submitButton.type = "submit";
    submitButton.value = "Create Todo";
    form.appendChild(submitButton);

    const description = document.createElement("input");
    description.classList.add("create-todo-description");
    description.type = "text";
    description.name = "description";
    description.placeholder = "Description: ex) laundry, bills, etc.";
    form.appendChild(description);

    const dueDateContainer = document.createElement("label");
    dueDateContainer.classList.add("create-todo-duedate-label");
    dueDateContainer.innerHTML = "Due Date: ";
    const dueDate = document.createElement("input");
    dueDate.classList.add("create-todo-duedate");
    dueDate.type = "date";
    dueDate.name = "duedate";
    dueDateContainer.appendChild(dueDate);
    form.appendChild(dueDateContainer);

    //     priority: priority,
    //     notes: notes,
    //     checklist: checklist,
    //     project: project,

    return form;
  }

  function createEditForm() {
    const form = document.createElement("form");
    form.id = "edit-todo-form";
    const windowCloseButton = document.createElement("button");
    windowCloseButton.classList.add("close-window-button");
    const windowClose = new Image();
    windowClose.src = windowCloseIcon;
    windowClose.classList.add("close-window-icon");
    windowCloseButton.appendChild(windowClose);
    form.appendChild(windowCloseButton);
    const titleInput = document.createElement("input");
    titleInput.classList.add("edit-todo-title");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.contentEditable = true;
    form.appendChild(titleInput);
    const submitButton = document.createElement("input");
    submitButton.id = "edit-todo-submit";
    submitButton.type = "submit";
    submitButton.value = "Accept Changes";
    form.appendChild(submitButton);

    const description = document.createElement("input");
    description.classList.add("edit-todo-description");
    description.type = "text";
    description.name = "description";
    description.contentEditable = true;
    form.appendChild(description);

    const dueDateContainer = document.createElement("label");
    dueDateContainer.classList.add("edit-todo-duedate-label");
    dueDateContainer.innerHTML = "Due Date: ";
    const dueDate = document.createElement("input");
    dueDate.classList.add("edit-todo-duedate");
    dueDate.type = "date";
    dueDate.name = "duedate";
    dueDateContainer.appendChild(dueDate);
    form.appendChild(dueDateContainer);

    // Edit Todo Form Submission Listener
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = e.target.elements;
      const newTitle = data.title.value;
      const newDescription = data.description.value;
      const newDueDate = data.duedate.value;

      console.log(newDueDate);

      todoLogic.editTodo(selectedTodo, newTitle, newDescription, newDueDate);
      form.classList.toggle("activated");
      form.reset();
      renderTodos(document.querySelector(".todo-container"));
    });

    return form;
  }

  function resetActiveProjects(allProjectElements) {
    // Function to reset all sidebar projects to not be highlighted
    allProjectElements.forEach(function(item) {
      item.classList.remove("activated");
    });
  }

  return {
    createHeader,
    createSidebar,
    createWorkspace,
    createAddProjectForm,
    renderProjects,
    renderTodos,
    createAddTodoForm,
    resetActiveProjects,
    createEditForm
  };
})();
