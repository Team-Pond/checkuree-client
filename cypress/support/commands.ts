/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('Login', () => {
  return cy
    .request('POST', `${Cypress.env('api_server')}/auth/signin`, {
      username: 'dkandkdlel',
      password: 'test123123!!',
    })
    .then((response) => {
      const accessToken = response.body.data.accessToken
      // cy.setCookie()의 체인 내에서 response를 반환하도록 수정
      return cy.setCookie('accessToken', accessToken).then(() => {
        return response
      })
    })
})

Cypress.Commands.add('StudentFormStep1', ({ name, birth, gender }) => {
  cy.get('[data-cy="name-input"]').should('be.visible').type(name)
  cy.get('[data-cy="birth-input"]').type(birth)
  gender === 'male'
    ? cy.get('[data-cy="male-radio"]').click()
    : cy.get('[data-cy="female-radio"]').click()
  cy.get('[data-cy="today-enroll-label"]').click()
})

Cypress.Commands.add('StudentFormStep2', () => {
  cy.get('[data-cy="curriculum-select"]').should('be.visible').click()
  cy.get('[data-cy="add-icon"]').first().click()
  cy.get('[data-cy="schedule-0"]').first().click()
  cy.get('[data-cy="add-schedule-button"]').click()
})

Cypress.Commands.add('BookFormStep1', ({ name }) => {
  cy.get('[data-cy="title"]').should('be.visible').type(name)
  cy.get('[data-cy="월"]').click()
  cy.get('[data-cy="startTime"]').click()
  cy.get('.fixed.inset-0').click({ force: true })
  cy.get('.fixed.inset-0').should('not.exist')
  cy.get('[data-cy="endTime"]').click()
  cy.get('.fixed.inset-0').click({ force: true })
  cy.get('.fixed.inset-0').should('not.exist')
})

Cypress.Commands.add('BookFormStep2', ({ name }) => {
  cy.get('[data-cy="curriculum-add-button"]').should('be.visible').click()
  cy.get('[data-cy="curriculum-input"]').should('be.visible').type(name)
  cy.get('[data-cy="subject-add-button"]').click()
  cy.get('[data-cy="add-icon"]').first().click()
  cy.get('[data-cy="bottom-drawer"]').click({ force: true })
  cy.get('[data-cy="curriculum-confirm"]').click()
})
