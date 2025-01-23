import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { FaArrowUp } from "react-icons/fa";


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [taskText, setTaskText] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  const addTask = (text: string) => {
    if (text.trim() === '') return;
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };


  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const remainingTasks = tasks.filter(task => !task.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; 
  });

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-3xl shadow-xl w-[600px]">
    <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>
      <div className="mt-4 flex flex-betwwen">
        <button onClick={handleOpen} className={`p-2 border hover:bg-gray-200 ${open ? 'rotate-180' : ''}`} >
            <FaArrowUp className='text-3xl' />
        </button>
        <input
          type="text"
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
          placeholder="Новая задача"
          className="w-full p-2 border"
        />
        <button onClick={() => addTask(taskText)} className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
          Добавить
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ${open ? 'h-auto' : 'h-0'}`}>
        {filteredTasks.map(task => (
          <TodoItem key={task.id} task={task} toggleComplete={toggleComplete} />
        ))}
      </div>

      <div className="mb-4 mt-2 flex justify-between pt-6 ">
      <p className="p-2">{remainingTasks} items left</p>
      <div className='flex gap-8'>
        <button onClick={() => setFilter('all')} className={`hover:bg-gray-300 rounded-2xl p-2 py-2 cursor-pointer text-sm ${filter === 'all' ? 'bg-gray-300' : ''}`}>
          All
        </button>
        <button onClick={() => setFilter('active')} className={`hover:bg-gray-300 rounded-2xl p-2 py-2 cursor-pointer text-sm ${filter === 'active' ? 'bg-gray-300' : ''}`}>
          Active
        </button>
        <button onClick={() => setFilter('completed')} className={`hover:bg-gray-300 rounded-2xl p-2 py-2 cursor-pointer text-sm ${filter === 'completed' ? 'bg-gray-300' : ''}`}>
          Completed
        </button>
      </div>
        <button onClick={deleteCompletedTasks}  className={`hover:bg-gray-300 rounded-2xl p-2 py-2 cursor-pointer text-sm`}>
          Clear Completed
        </button>
      </div>

    </div>
  );
};

export default TodoList;