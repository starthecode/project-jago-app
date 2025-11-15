import React from 'react';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/slices/userSlice';
// import InputGroup from './InputGroup';
// import { AuthButton } from './Buttons/AuthButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import InputGroup from '../../components/formfields/InputGroup';
import { AuthButton } from '../../components/buttons/AuthButton';
import type { RootState } from '../../redux/store';

export const AuthForm = ({ activeTab }: { activeTab: 'signin' | 'signup' }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    fullname: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = React.useState('');
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isForgotPass, setIsForgotPass] = React.useState(false);
  const [isOtpVerified, setIsOtpVerified] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const { error: errorMessage } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(signInFailure(''));
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSendOtp = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.email) {
      return dispatch(signInFailure('Please provide email'));
    }

    if (!isForgotPass && !formData.password) {
      return dispatch(signInFailure('Please provide password'));
    }

    setIsLoading(true);

    try {
      const res = await fetch('/otp/getOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: isForgotPass ? undefined : formData.password,
          type:
            activeTab === 'signup'
              ? 'signup'
              : isForgotPass
              ? 'forgotpass'
              : 'signin',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to send OTP');
      }

      setIsLoading(false);
      setIsOtpSent(true);
      setTimeLeft(60);
      toast.success('OTP sent to your email');
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    }
  };

  // Timer for Resend
  React.useEffect(() => {
    if (isOtpSent && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isOtpSent, timeLeft]);

  const handleOtpVerify = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp) {
      return dispatch(signInFailure('Please enter OTP'));
    }

    setIsLoading(true);

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const otpRes = await fetch(`${API_URL}/otp/verifyOtp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp,
          type:
            activeTab === 'signup'
              ? 'signup'
              : isForgotPass
              ? 'forgotpass'
              : 'signin',
        }),
      });

      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        throw new Error(otpData.error || 'Invalid OTP');
      }

      setIsLoading(false);
      setIsOtpVerified(true);

      if (isForgotPass) {
        toast.success('OTP verified. Please set your new password.');
      } else {
        await handleAuthAfterOtp();
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false);
        dispatch(signInFailure(error.message));
        toast.error(error.message);
      }
    }
  };

  const handleAuthAfterOtp = async () => {
    dispatch(signInStart());

    try {
      const endpoint = activeTab === 'signup' ? '/auth/signup' : '/auth/signin';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      toast.success(
        activeTab === 'signup'
          ? 'Account created successfully!'
          : 'Login successful!'
      );

      if (activeTab === 'signup') {
        navigate('/login');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error instanceof Error) dispatch(signInFailure(error.message));
    }
  };

  const handlePasswordReset = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      return dispatch(signInFailure('Please fill out all password fields'));
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return dispatch(signInFailure('Passwords do not match'));
    }

    setIsLoading(true);

    try {
      const res = await fetch('/auth/updatePass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || data.message || 'Failed to update password'
        );
      }

      setIsLoading(false);
      toast.success('Password updated successfully!');

      setIsForgotPass(false);
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setFormData({
        fullname: '',
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
      setOtp('');
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false);
        dispatch(signInFailure(error.message));
        toast.error(error.message);
      }
    }
  };

  const resetForgotPasswordFlow = () => {
    setIsForgotPass(false);
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setFormData({ ...formData, newPassword: '', confirmPassword: '' });
    setOtp('');
  };

  const getButtonText = () => {
    if (isOtpSent && !isOtpVerified) return 'Verify OTP';
    if (isOtpVerified && isForgotPass) return 'Update Password';

    if (activeTab === 'signup') return 'Sign Up';
    if (isForgotPass) return 'Send OTP';
    return 'Sign In';
  };

  return (
    <div className="w-full max-w-md">
      {errorMessage && (
        <div className="mb-6 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <span className="text-red-600 dark:text-red-400 text-sm font-medium">
            {errorMessage}
          </span>
        </div>
      )}

      {!isOtpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          {activeTab === 'signup' && (
            <InputGroup
              type="text"
              name="fullname"
              placeholder="Enter your Full Name"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          )}

          <InputGroup
            type="email"
            name="email"
            placeholder="Enter your email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />

          {!isForgotPass && (
            <div className="relative overflow-hidden">
              <InputGroup
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 flex my-auto h-10"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          )}

          <AuthButton type="submit" isLoading={isLoading} disabled={isLoading}>
            {getButtonText()}
          </AuthButton>
        </form>
      ) : !isOtpVerified ? (
        <form onSubmit={handleOtpVerify} className="space-y-6">
          <InputGroup
            type="text"
            name="otp"
            placeholder="Enter verification code"
            id="otp"
            value={otp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value.trim())
            }
            className="w-full text-center text-lg tracking-widest"
          />

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <AuthButton type="submit" isLoading={isLoading} disabled={isLoading}>
            Verify Code
          </AuthButton>

          <AuthButton
            variant="secondary"
            onClick={handleSendOtp}
            disabled={timeLeft > 0 || isLoading}
            type="button"
          >
            {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend Code'}
          </AuthButton>
        </form>
      ) : isForgotPass ? ( // Only show password reset form for forgot password flow
        <form onSubmit={handlePasswordReset} className="space-y-6">
          <InputGroup
            type="password"
            name="newPassword"
            placeholder="New password"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full"
          />

          <InputGroup
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full"
          />

          <AuthButton type="submit" isLoading={isLoading} disabled={isLoading}>
            Update Password
          </AuthButton>
        </form>
      ) : (
        // For regular login/signup after OTP verification, show nothing or a loading state
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Completing your request...
          </p>
        </div>
      )}
      <div className="mt-5">
        {activeTab !== 'signup' && !isForgotPass && !isOtpSent && (
          <AuthButton
            variant="text"
            onClick={() => setIsForgotPass(true)}
            className="text-sm"
          >
            Forgot your password?
          </AuthButton>
        )}

        {isForgotPass && (
          <AuthButton
            variant="text"
            onClick={resetForgotPasswordFlow}
            className="text-sm"
          >
            ← Back to Sign In
          </AuthButton>
        )}
      </div>
    </div>
  );
};
