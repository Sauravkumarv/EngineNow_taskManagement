import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [signupForm, setSignUpForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);

  // Flip animation on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
      setHasFlipped(true);
    }, 300);
    return () => clearTimeout(timer);
  });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    return username.length >= 3 && username.length <= 20;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "userName") {
      if (!value) {
        error = "Username is required";
      } else if (!validateUsername(value)) {
        error = "Username must be 3-20 characters";
      }
    } else if (name === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!validateEmail(value)) {
        error = "Please enter a valid email";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (!validatePassword(value)) {
        error = "Password must be at least 6 characters";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      userName: "",
      email: "",
      password: "",
    };

    if (!signupForm.userName) {
      newErrors.userName = "Username is required";
    } else if (!validateUsername(signupForm.userName)) {
      newErrors.userName = "Username must be 3-20 characters";
    }

    if (!signupForm.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(signupForm.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!signupForm.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(signupForm.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // Check if there are any errors
    if (newErrors.userName || newErrors.email || newErrors.password) {
      return alert("Somethimg wrong",errors);
    }
navigate("/login")
    setSignUpForm({
  userName: "",
  email: "",
  password: "",
});

    console.log('Form submitted:', signupForm);
    // Add your API call here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
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
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
              <p className="text-sm sm:text-base text-gray-500">Start your journey with us</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 sm:space-y-5">
                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="userName"
                    value={signupForm.userName}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.userName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    value={signupForm.email}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                    placeholder="Create a password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    value={signupForm.password}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                >
                  Create Account
                </button>
              </div>

              {/* Login Link */}
              <div className="mt-5 sm:mt-6 text-center">
                <p className="text-sm sm:text-base text-gray-600">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Login
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

export default SignUp;