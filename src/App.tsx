import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type Todo = {
  id: string
  title: string
  completed: boolean
}

const STORAGE_KEY = 'minimal-todo-app.todos'

function loadTodos(): Todo[] {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY)

    if (!storedTodos) {
      return []
    }

    const parsedTodos: unknown = JSON.parse(storedTodos)

    if (!Array.isArray(parsedTodos)) {
      return []
    }

    return parsedTodos.filter(
      (todo): todo is Todo =>
        typeof todo === 'object' &&
        todo !== null &&
        typeof todo.id === 'string' &&
        typeof todo.title === 'string' &&
        typeof todo.completed === 'boolean',
    )
  } catch {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [title, setTitle] = useState('')
  const completedCount = todos.filter((todo) => todo.completed).length
  const incompleteCount = todos.length - completedCount

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: trimmedTitle, completed: false },
    ])
    setTitle('')
  }

  function toggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id: string) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <main>
      <section aria-labelledby="page-title" className="todo-app">
        <div className="title-row">
          <h1 id="page-title">Todo</h1>
          <dl aria-label="タスク数" className="todo-counts">
            <div className="total-count">
              <dt>すべて</dt>
              <dd>{todos.length}</dd>
            </div>
            <div className="completed-count">
              <dt>完了済み</dt>
              <dd>{completedCount}</dd>
            </div>
            <div className="incomplete-count">
              <dt>未完了</dt>
              <dd>{incompleteCount}</dd>
            </div>
          </dl>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-todo">新しい Todo</label>
          <div className="input-row">
            <input
              id="new-todo"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="例: 牛乳を買う"
              value={title}
            />
            <button type="submit">追加</button>
          </div>
        </form>

        {todos.length === 0 ? (
          <p className="empty-message">Todo はありません。</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id}>
                <label>
                  <input
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    type="checkbox"
                  />
                  <span className={todo.completed ? 'completed' : undefined}>
                    {todo.title}
                  </span>
                </label>
                <button onClick={() => deleteTodo(todo.id)} type="button">
                  削除
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
