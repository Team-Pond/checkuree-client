// src/context/BookContext.tsx
import React, { createContext, useState, ReactNode } from 'react'
import { DayOfWeek } from '../utils'

export interface BookType {
  title: string
  id: number
  attendeeCount: number
  availableDays: DayOfWeek[]
  availableFrom: string
  availableTo: string
}

interface BookContextType {
  selectedBook: BookType | null
  setSelectedBook: (book: BookType) => void
}

const BookContext = createContext<BookContextType | undefined>(undefined)

const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null)

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  )
}

export { BookProvider, BookContext }
