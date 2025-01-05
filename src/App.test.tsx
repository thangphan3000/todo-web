import App from './App';

import { render } from '@testing-library/react';

describe('App', () => {
  it('renders the component', () => {
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });
});
