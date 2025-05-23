import { useField } from 'formik';
import { Input } from './Input';
import { Label } from './Label';
import { FC } from 'react';

interface CustomFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}

export const CustomField: FC<CustomFieldProps> = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  className = '',
  ...props
}) => {
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
