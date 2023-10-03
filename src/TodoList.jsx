import React, { useState, useRef } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const sectionRef = useRef(null);

  const addNameToList = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newItem = {
      id: Date.now(),
      text: inputValue.trim(),
      isSubItem: inputValue.trim().startsWith('>'),
      completed: false  // New property for task completion status
    };

    setTasks([...tasks, newItem]);
    setInputValue('');

    scrollToBottom();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const scrollToBottom = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <main>
        <header>
          <h1>Todo List</h1>
        </header>
        <section ref={sectionRef}>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
        <footer>
          <form className="wrapper" onSubmit={addNameToList}>
            <input
              type="text"
              placeholder="Add more"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button title="Add" type="submit">+</button>
          </form>
          <small>Use the "&gt;" to add a subitem</small>
        </footer>
      </main>
    </div>
  );
}

export default TodoList;
