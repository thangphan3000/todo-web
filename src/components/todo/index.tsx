import React from 'react';

import { useEffect, useRef } from 'react';
import { useTodos } from '../../hooks/useTodos';
import axios from 'axios';

const Todo: React.FC = () => {
  const todoInputRef = useRef<HTMLInputElement>(null);
  const { todos, addTodo, removeTodo } = useTodos([]);

  const cleanUp = () => {
    const { current } = todoInputRef;

    if (current) current.value = '';
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_API}/todos`)
      // eslint-disable-next-line no-console
      .then((resp) => console.log(resp))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mx-auto w-[400px] p-6 bg-white rounded-xl shadow-xl space-y-6 mt-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
        To-Do List
      </h1>

      {todos.map(({ id, content }) => (
        <div key={id} className="flex items-center justify-between">
          <div>{id}</div>
          <div>{content}</div>
          <button
            onClick={() => removeTodo(id)}
            className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex">
        <input
          type="text"
          ref={todoInputRef}
          className="h-11 p-3 rounded-lg border border-gray-400 focus:outline-sky-500 transition duration-300 ease-in"
        />
        <button
          onClick={() => {
            addTodo(todoInputRef.current?.value || '');
            cleanUp();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 rounded"
        >
          Add todo
        </button>
      </div>
    </div>
  );
};

export default Todo;
