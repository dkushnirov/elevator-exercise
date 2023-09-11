import { render, screen } from '../../utils/test-utils';

import App from './App';

describe('App', () => {
  it('Renders hello world', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Multi-storey building');
  });
});
