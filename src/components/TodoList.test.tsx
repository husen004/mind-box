import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import '@testing-library/jest-dom';

test('добавление задачи и отображение количества оставшихся задач', () => {
  render(<TodoList />);
  expect(screen.getByText('Осталось выполнить: 1')).toBeInTheDocument();
});

test('фильтрация по активным задачам', () => {
  render(<TodoList />);
  fireEvent.click(screen.getByText('Активные'));
  expect(screen.getByText('Осталось выполнить: 1')).toBeInTheDocument();
});

test('удаление выполненных задач', () => {
  render(<TodoList />);
  fireEvent.click(screen.getByText('Удалить выполненные'));
  expect(screen.getByText('Осталось выполнить: 1')).toBeInTheDocument();
});