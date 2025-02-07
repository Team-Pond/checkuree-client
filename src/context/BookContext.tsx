// src/context/BookContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { DayOfWeek } from "../utils";

export interface Book {
  title: string;
  id: number;
  attendeeCount: number;
  availableDays: DayOfWeek[];
  availableFrom: string;
  availableTo: string;
}

interface BookContextType {
  selectedBook: Book | null;
  setSelectedBook: (book: Book) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookProvider, BookContext };
