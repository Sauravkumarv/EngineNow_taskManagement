import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../../api/axios';

const Login = () => {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  // Flip animation on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "identifier") {
      if (!value) {
        error = "Username or email is required";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      identifier: "",
      password: "",
    };

    if (!form.identifier) {
      newErrors.identifier = "Username or email is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

   
    if (newErrors.identifier || newErrors.password) {
      return;
    }

    
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/login", form);

      if (response.data.user) {
        // Store token in localStorage
        // localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        alert("Login successful!");

        
        setForm({
          identifier: "",
          password: "",
        });

        
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm sm:max-w-md perspective-1000">
        <div
          className={`relative transition-all duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-0' : 'rotate-y-90'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-90deg)',
          }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-sm sm:text-base text-gray-500">Login to continue</p>
            </div>

            {/* Form */}
            <form method="POST" onSubmit={handleSubmit}>
              <div className="space-y-4 sm:space-y-5">
                {/* Username or Email */}
                <div>
                  <label htmlFor="username_email" className="block text-sm font-medium text-gray-700 mb-2">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    id="username_email"
                    name="identifier"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter username or email"
                    value={form.identifier}
                    disabled={loading}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.identifier
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  {errors.identifier && (
                    <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    value={form.password}
                    disabled={loading}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>

              {/* Signup Link */}
              <div className="mt-5 sm:mt-6 text-center">
                <p className="text-sm sm:text-base text-gray-600">
                  Don't have an account?{' '}
                  <a
                    href="/signup"
                    className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;