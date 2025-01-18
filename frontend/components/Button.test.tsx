import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Button from './Button';

test('renders button with text', () => {
  render(<Button text="Click Me" />);
  expect(screen.getByText(/click me/i)).toBeInTheDocument();
});

test('calls onClick when clicked', async () => {
  const handleClick = vi.fn();
  render(<Button text="Click Me" onClick={handleClick} />);
  await userEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
