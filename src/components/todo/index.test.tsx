import Todo from './index';

import { render } from '@testing-library/react';

describe('Todo', () => {
  it('renders the component', () => {
    const { container } = render(<Todo />);

    expect(container).toBeInTheDocument();
  });
});
