import React from 'react';

interface TodoItemProps {
  task: { id: number; text: string; completed: boolean };
  toggleComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, toggleComplete }) => {
  return (
    <div className="flex items-center space-x-4 p-2 border-b">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        className="h-4 w-4"
      />
      <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
    </div>
  );
};

export default TodoItem;