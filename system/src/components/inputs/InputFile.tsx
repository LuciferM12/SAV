import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface CustomImageInputProps {
  onChange: (file: File | null) => void
  label?: string
  name: string
}

const CustomImageInput: React.FC<CustomImageInputProps> = ({ onChange, label = "Upload Image", name}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md relative">
        <div className="space-y-1 text-center">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="mx-auto h-32 w-auto rounded-md" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
          )}
          <div className="flex text-sm text-gray-600 dark:text-gray-300">
            <label
              htmlFor={name}
              className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>{preview ? 'Change image' : 'Upload a file'}</span>
              <input
                id={name}
                name={name}
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/*"
                ref={fileInputRef}
              />
            </label>
            {!preview && <p className="pl-1">or drag and drop</p>}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomImageInput;