import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="mb-5">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-white uppercase tracking-widest"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            bg-gray-50 border text-gray-900 text-sm rounded
            block w-full p-2.5 transition-all duration-300 ease-in-out
            dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary dark:border-gray-600 dark:focus:ring-primary dark:focus:border-primary"
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

