// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable<Subject = any> {
    Login(): Chainable<any>
    StudentFormStep1(studentData: {
      name: string
      birth: string
      gender: 'male' | 'female'
    }): Chainable<any>
    StudentFormStep2(): Chainable<any>
    BookFormStep1(bookData: { name: string }): Chainable<any>
    BookFormStep2(bookData: { name: string }): Chainable<any>
  }
}
