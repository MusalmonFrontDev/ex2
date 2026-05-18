
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoginTab: boolean;
  isRegistered: boolean;
  isDarkMode: boolean;
}

const initialState: AuthState = {
  isLoginTab: false,
  isRegistered: false,
  isDarkMode: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTab: (state, { payload }: { payload: boolean }) => {
      state.isLoginTab = payload;
      if (payload) state.isRegistered = false;
    },
    registerSuccess: (state) => {
      state.isRegistered = true;
    },
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setTab, registerSuccess, toggleTheme } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;


const AuthForm: React.FC = () => {
  const dispatch = useDispatch();
  
  const { isLoginTab, isRegistered, isDarkMode } = useSelector((state: RootState) => state.auth || initialState);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoginTab) {
      dispatch(registerSuccess());
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className={`relative w-[500px] p-10 rounded-2xl shadow-sm border flex flex-col items-center transition-colors ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        <button className="absolute top-5 right-5 text-emerald-600 hover:text-emerald-700 text-2xl">✕</button>

        <div className="flex items-center gap-4 mb-8 text-2xl font-semibold">
          <button type="button" onClick={() => dispatch(setTab(true))} className={isLoginTab ? (isDarkMode ? 'text-gray-100' : 'text-gray-800') : 'text-gray-400'}>Login</button>
          <span className="text-gray-300">|</span>
          <button type="button" onClick={() => dispatch(setTab(false))} className={!isLoginTab ? 'text-emerald-600' : 'text-gray-400'}>Register</button>
        </div>

        <p className={`text-[15px] mb-6 self-start ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{isLoginTab ? 'Enter your username and password to login.' : 'Enter your email and password to register.'}</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {!isLoginTab && (
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 text-[15px] ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-200 text-gray-700 placeholder-gray-400"}`} />
          )}

          <input type="email" placeholder={isLoginTab ? 'almamun_uxui@outlook.com' : 'Enter your email address'} value={email} onChange={(e) => setEmail(e.target.value)} required className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 text-[15px] ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-200 text-gray-700 placeholder-gray-400"}`} />

          <div className="relative w-full">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-[15px] ${isDarkMode ? "bg-gray-700 border-emerald-500 text-white placeholder-gray-400" : "bg-white border-emerald-500 text-gray-700 placeholder-gray-400"}`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">{showPassword ? '👁️' : '👁️‍🗨️'}</button>
          </div>

          {!isLoginTab && (
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 text-[15px] ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-200 text-gray-700 placeholder-gray-400"}`} />
          )}

          {isLoginTab && (
            <button type="button" className="text-emerald-600 hover:underline text-[15px] self-end mt-1">Forgot Password?</button>
          )}

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg text-lg transition-colors mt-4">{isLoginTab ? 'Login' : 'Register'}</button>
        </form>

        <div className="w-full flex items-center my-6">
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
          <span className="px-3 text-gray-500 text-sm">{isLoginTab ? 'Or login with' : 'Or register with'}</span>
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button type="button" className={`w-full py-3 border rounded-lg flex items-center justify-center gap-3 font-medium text-[15px] ${isDarkMode ? "border-gray-600 text-gray-200 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
            {isLoginTab ? 'Login with Google' : 'Continue with Google'}
          </button>
          <button type="button" className={`w-full py-3 border rounded-lg flex items-center justify-center gap-3 font-medium text-[15px] ${isDarkMode ? "border-gray-600 text-gray-200 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" alt="Facebook" className="w-5 h-5" />
            {isLoginTab ? 'Login with Facebook' : 'Continue with Facebook'}
          </button>
        </div>

        {!isLoginTab && isRegistered && (
          <div className="flex items-center gap-2 mt-6 text-emerald-600 font-medium text-[15px]">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-xs">✓</span>
            <span>Аккаунт успешно создан</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;