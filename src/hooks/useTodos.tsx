import axios from 'axios';
import { useCallback, useEffect, useReducer } from 'react';

interface Todo {
  id: number;
  content: string;
}

enum TodoAction {
  add = 'add',
  remove = 'remove',
  setTodos = 'setTodos',
}

type ActionType =
  | { type: TodoAction.add; id: number; content: string }
  | { type: TodoAction.remove; id: number }
  | { type: TodoAction.setTodos; todos: Todo[] };

export const useTodos = (
  initialTodos: Todo[],
): {
  todos: Todo[];
  addTodo: (content: string) => void;
  removeTodo: (id: number) => void;
} => {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case TodoAction.add:
        return [
          ...state,
          {
            id: action.id,
            content: action.content,
          },
        ];
      case TodoAction.remove:
        return state.filter(({ id }) => action.id !== id);
      case TodoAction.setTodos:
        return action.todos;
      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = useCallback(async (content: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/todos`,
        {
          content,
        },
      );

      dispatch({
        id: response.data.data.id,
        content: response.data.data.content,
        type: TodoAction.add,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding todo:', error);
    }
  }, []);

  const removeTodo = useCallback(async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/todos/${id}`);

      dispatch({
        type: TodoAction.remove,
        id,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding todo:', error);
    }
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/todos`,
        );
        dispatch({
          type: TodoAction.setTodos,
          todos: response.data.data,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return {
    todos,
    addTodo,
    removeTodo,
  };
};
