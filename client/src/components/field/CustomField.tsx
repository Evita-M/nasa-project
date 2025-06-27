import { useField } from 'formik';
import { Label } from './Label';
import { ComponentProps } from 'react';
import { Input } from './Input';

interface CustomFieldProps extends ComponentProps<'input'> {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
  [key: string]: any;
}

export const CustomField = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  errorMessage,
  className = '',
  ...props
}: CustomFieldProps) => {
  const [field, meta] = useField(name);
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full ${className}`}
        error={meta.touched && meta.error ? meta.error : undefined}
        {...field}
        {...props}
      />
    </div>
  );
};
