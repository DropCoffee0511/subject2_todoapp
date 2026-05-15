let todos = [];

let todoListEl = null;
let todoEmptyEl = null;
let todoCountEl = null;

function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  };
  todos.push(newTodo);
}

function toggleTodo(id) {
  const todo = todos.find((item) => item.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((item) => item.id !== id);
  renderTodos();
}

function updateStatus() {
  if (!todoCountEl) return;
  const n = todos.length;
  todoCountEl.textContent = `총 ${n}개의 할 일`;
}

function renderTodos() {
  if (!todoListEl || !todoEmptyEl) return;
  todoListEl.innerHTML = "";
  todos.forEach((todo) => {
    const row = document.createElement("div");
    row.className = "todo-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-check";
    checkbox.dataset.id = String(todo.id);
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", "완료");

    const textSpan = document.createElement("span");
    textSpan.className =
      "todo-text" + (todo.completed ? " todo-text--completed" : "");
    textSpan.textContent = todo.text;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "todo-delete";
    delBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
      </svg>
    `;
    delBtn.dataset.deleteId = String(todo.id);
    delBtn.setAttribute("aria-label", "할 일 삭제");

    row.appendChild(checkbox);
    row.appendChild(textSpan);
    row.appendChild(delBtn);
    todoListEl.appendChild(row);
  });
  todoEmptyEl.hidden = todos.length > 0;
  updateStatus();
}

document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.querySelector("#app-title");
  if (titleEl) {
    // 확장: 동적 제목, 다국어 등
  }

  const todoInput = document.querySelector("#todoInput");
  const addButton = document.querySelector("#addButton");
  todoListEl = document.querySelector("#todoList");
  todoCountEl = document.querySelector("#todoCount");
  todoEmptyEl = document.querySelector("#todo-empty");
  const dateEl = document.querySelector("#current-date");

  // 오늘 날짜 표시
  if (dateEl) {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateEl.textContent = now.toLocaleDateString('ko-KR', options);
  }
  const form = todoInput?.form;

  if (!todoInput || !addButton || !todoListEl || !todoCountEl || !todoEmptyEl || !form) {
    return;
  }

  todoListEl.addEventListener("change", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement) || t.type !== "checkbox") return;
    const id = Number(t.dataset.id);
    if (Number.isNaN(id)) return;
    toggleTodo(id);
  });

  todoListEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".todo-delete");
    if (!(btn instanceof HTMLElement)) return;
    const id = Number(btn.dataset.deleteId);
    if (Number.isNaN(id)) return;
    deleteTodo(id);
  });

  addButton.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text === "") {
      alert("할 일을 입력해 주세요.");
      return;
    }
    addTodo(text);
    todoInput.value = "";
    renderTodos();
  });

  todoInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    addButton.click();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});
