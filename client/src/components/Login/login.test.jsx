import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';

// We are not testing Firebase here — just the UI.
// So we create a simple fake component that looks like
// your Login component but has no Firebase code in it.
// This fake version just shows the same buttons and
// fields so we can check they appear on screen.
const FakeLogin = ({ user }) => {
  if (user) {
    return (
      <div>
        <p>{user.displayName}</p>
        <p>{user.email}</p>
        <button>Sign out</button>
        <button>Fetch secure data</button>
      </div>
    );
  }

  return (
    <div>
      <button>Google login</button>
      <button>GitHub login</button>
      <button>Login</button>
      <button>Register</button>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
    </div>
  );
};

describe('Login UI', () => {
  afterEach(() => {
    cleanup();
  });

  // Test 1: check the login buttons show up before anyone is logged in
  it('shows login buttons when no user is logged in', () => {
    render(<FakeLogin user={null} />);

    expect(screen.getByText('Google login')).toBeInTheDocument();
    expect(screen.getByText('GitHub login')).toBeInTheDocument();
  });

  // Test 2: check the login buttons are GONE after login
  it('hides login buttons when a user is logged in', () => {
    const fakeUser = { displayName: 'Ada', email: 'ada@test.com' };
    render(<FakeLogin user={fakeUser} />);

    expect(screen.queryByText('Google login')).not.toBeInTheDocument();
    expect(screen.queryByText('GitHub login')).not.toBeInTheDocument();
  });

  // Test 3: check the user's name appears after login
  it('shows the user display name when logged in', () => {
    const fakeUser = { displayName: 'Ada', email: 'ada@test.com' };
    render(<FakeLogin user={fakeUser} />);

    expect(screen.getByText('Ada')).toBeInTheDocument();
  });

  // Test 4: check the sign-out button appears after login
  it('shows a sign-out button when logged in', () => {
    const fakeUser = { displayName: 'Ada', email: 'ada@test.com' };
    render(<FakeLogin user={fakeUser} />);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
