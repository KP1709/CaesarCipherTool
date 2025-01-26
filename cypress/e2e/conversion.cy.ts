describe('Basic functionality', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test="plain-text__input"]').type('hello')
    cy.get('[data-test="encrypt-btn"]').click()
    cy.get('[data-test="encrypted-text__display"]').should('have.value', 'hello')
  })
})

describe('Alphabet draw', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test="alphabet-shift__container"]').should('not.be.visible')
    cy.get('[data-test="alphabet-shift__btn"]').click()
    cy.get('[data-test="increment-step__btn"]').click()
    cy.get('[data-test="step-value"]').should('have.text', '1')
    cy.get('[data-test="increment-step__btn"]').click()
    cy.get('[data-test="decrement-step__btn"]').click()
    cy.get('[data-test="step-value"]').should('have.text', '1') 
    cy.get('[data-test="close-alphabet-shift__btn"]').click()

  })
})

describe('Conversion with letters', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test="plain-text__input"]').type('hello')
    cy.get('[data-test="encrypt-btn"]').click()
    cy.get('[data-test="alphabet-shift__btn"]').click()
    cy.get('[data-test="increment-step__btn"]').click()
    cy.get('[data-test="increment-step__btn"]').click()
    cy.get('[data-test="close-alphabet-shift__btn"]').click()
    cy.get('[data-test="encrypted-text__display"]').should('have.value', 'gdkkn')
  })
})

describe('Conversion with all character types', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test="plain-text__input"]').type('hello 1234 !@#$')
    cy.get('[data-test="encrypt-btn"]').click()
    cy.get('[data-test="alphabet-shift__btn"]').click()
    cy.get('[data-test="increment-step__btn"]').click()
    cy.get('[data-test="increment-step__btn"]').click()
    cy.get('[data-test="close-alphabet-shift__btn"]').click()
    cy.get('[data-test="encrypted-text__display"]').should('have.value', 'gdkkn 1234 !@#$')
  })
})