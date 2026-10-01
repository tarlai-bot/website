import { InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="mb-5">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={`
                w-4 h-4 border border-gray-300 rounded bg-gray-50
                focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out
                dark:bg-gray-700 dark:border-gray-600
                dark:focus:ring-primary dark:ring-offset-gray-800
                ${className}
              `}
              {...props}
            />
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className="ms-2 text-sm font-normal text-gray-700 dark:text-gray-300"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

