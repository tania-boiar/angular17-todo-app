# Angular17TodoApp

A Todo List application built with Angular 17 and Angular Material.
This project demonstrates the use of Angular’s newest features like Signals, the @if / @for template syntax, error handling with rollback, and a clean modular component structure.
Todos are stored in a MockAPI backend, with full CRUD support.

## Tech Stack
* Angular 17 (standalone components + Signals API)
* Angular Material (tabs, dialogs, buttons, icons, spinners)
* RxJS for API and error handling
* [MockAPI.io](https://mockapi.io/) as backend

## Features
* Create / Edit / Delete todos
* Mark todos as completed / active with automatic completion date
* Due dates displayed alongside tasks
* Loading states with Angular Material spinners
* Empty states with friendly messages
* Error handling with rollback when API calls fail
* Modular components:
  - TodoListComponent → main container
  - TodoItemComponent → individual todo with checkbox, dates, actions
  - TodoTabComponent → handles filtering (all, active, completed)
  - TodoFormComponent → modal dialog for add/edit with validation

## Getting Started

### Clone repository
```
git clone https://github.com/tania-boiar/angular17-todo-app.git
cd angular17-todo-app
```

### Install dependencies
`npm install`

### Run dev server
`ng serve`

👉 App will run at [http://localhost:4200](http://localhost:4200)

## API
### Base URL

[https://68cec39c6dc3f350777ff464.mockapi.io/api/v1/todos](https://68cec39c6dc3f350777ff464.mockapi.io/api/v1/todos)


### Endpoints
**GET** /todos → fetch all todos
**GET** /todos/:id → fetch single todo
**POST** /todos → create new todo
**PUT** /todos/:id → update todo
**DELETE** /todos/:id → delete todo
**Bulk delete completed** → parallel delete requests

## API Documentation

This project’s API is documented using **OpenAPI/Swagger**.
- [Swagger Spec](./swagger.yaml)  
- You can view and edit it online using [Swagger Editor](https://editor.swagger.io/).

### Future Improvements
🔑 Authentication
📊 Pagination / infinite scroll
🌙 Dark mode toggle
🧪 Unit & e2e test coverage