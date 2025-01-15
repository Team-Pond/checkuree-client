// src/context/BookContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface Book {
  title: string;
  id: string;
}

interface BookContextType {
  selectedBook: Book | null;
  setSelectedBook: (book: Book) => void;
}

export const BookContext = createContext<BookContextType | undefined>(
  undefined
);

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};
