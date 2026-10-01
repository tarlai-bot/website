import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="mb-5">
        {label && (
          <label
            htmlFor={selectId}
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-white uppercase tracking-widest"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            bg-gray-50 border text-gray-900 text-sm rounded
            block w-full p-2.5 transition-all duration-300 ease-in-out
            dark:bg-gray-700 dark:text-white
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary dark:border-gray-600 dark:focus:ring-primary dark:focus:border-primary"
            }
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = "Select";

export default Select;

