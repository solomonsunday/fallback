"use client"
import ErrorModal from '@/components/modal/ErrorModal';
import { ErrorContextProps, ErrorResponse } from '@/utils/interface';
import React, { createContext, useContext, useState, ReactNode } from 'react';

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useErrorContext = (): ErrorContextProps => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<ErrorResponse | null>(null);

  const handleError = (error: ErrorResponse| null) => {
    setError(error);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setError: handleError, clearError }}>
      {children}
      {error && <ErrorModal />}
    </ErrorContext.Provider>
  );
};
