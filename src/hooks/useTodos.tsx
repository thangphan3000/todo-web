import { useCallback, useReducer } from 'react';

interface Todo {
  id: number;
  content: string;
  done: boolean;
}

enum TodoAction {
  add = 'add',
  remove = 'remove',
}

type ActionType =
  | { type: TodoAction.add; text: string }
  | { type: TodoAction.remove; id: number };

export const useTodos = (
  initialTodos: Todo[],
): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} => {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case TodoAction.add:
        return [
          ...state,
          {
            id: state.length,
            content: action.text,
            done: false,
          },
        ];
      case TodoAction.remove:
        return state.filter(({ id }) => action.id !== id);
      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: TodoAction.add,
      text: text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: TodoAction.remove,
      id,
    });
  }, []);

  return {
    todos,
    addTodo,
    removeTodo,
  };
};
