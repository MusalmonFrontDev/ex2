import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoginTab: boolean;
  isRegistered: boolean;
}

const initialState: AuthState = {
  isLoginTab: true,
  isRegistered: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.isLoginTab = action.payload;
      state.isRegistered = false;
    },

    registerSuccess: (state) => {
      state.isRegistered = true;
      state.isLoginTab = true;
    },
  },
});

export const { setTab, registerSuccess } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const AuthFormContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoginTab, isRegistered } = useSelector(
    (state: RootState) => state.auth
  );

  const isDarkMode = useSelector(
    (state: any) => state.theme?.isDarkMode
  );

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoginTab) {
      dispatch(registerSuccess());

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      alert('Login success');
    }
  };

  return (
    <div
      className={'min-h-screen flex items-center justify-center p-4'}
    >
      <div
        className={`relative w-full max-w-[500px] p-10 rounded-2xl shadow-lg border flex flex-col items-center ${
          isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-100'
        }`}
      >
        <div className="flex items-center gap-4 mb-8 text-2xl font-semibold">
          <button
            type="button"
            onClick={() => dispatch(setTab(true))}
            className={
              isLoginTab
                ? isDarkMode
                  ? 'text-white'
                  : 'text-gray-900'
                : 'text-gray-400'
            }
          >
            Login
          </button>

          <span className="text-gray-400">|</span>

          <button
            type="button"
            onClick={() => dispatch(setTab(false))}
            className={
              !isLoginTab
                ? 'text-emerald-600'
                : 'text-gray-400'
            }
          >
            Register
          </button>
        </div>

        <p
          className={`text-sm mb-6 self-start ${
            isDarkMode
              ? 'text-gray-300'
              : 'text-gray-600'
          }`}
        >
          {isLoginTab
            ? 'Enter your email and password to login.'
            : 'Create a new account.'}
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
        >
          {!isLoginTab && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className={`w-full px-4 py-3 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className={`w-full px-4 py-3 border rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-200 text-gray-700'
            }`}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className={`w-full px-4 py-3 border rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-emerald-500 text-white'
                : 'bg-white border-emerald-500 text-gray-700'
            }`}
          />

          {!isLoginTab && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className={`w-full px-4 py-3 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            />
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg"
          >
            {isLoginTab ? 'Login' : 'Register'}
          </button>
        </form>

        {!isLoginTab && isRegistered && (
          <div className="mt-4 text-emerald-600">
            ✓ Аккаунт успешно создан
          </div>
        )}
      </div>
    </div>
  );
};

const AuthForm: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthFormContent />
    </Provider>
  );
};

export default AuthForm;