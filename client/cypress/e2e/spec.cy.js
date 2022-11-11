/// <reference types="cypress"/>

describe('Coin test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:61834');
		cy.get('.input-container:nth-child(2) input').type('developer');
    cy.get('.input-container:nth-child(3) input').type('skillbox');
		cy.contains('Войти').click();
		cy.get('main').should('have.class', 'main');
	});

	it('Open account', () => {
		cy.get('.all-cards-container .card:nth-child(1) .card-container .transaction-btn')
			.click()
			cy.get('.main-center-account').should('have.text', '№ 74213041477477406320783754')
	});

  it('Create account', () => {
    cy.get('.all-cards-container').then(e => {
      const current = e[0].querySelectorAll('.card').length
      cy.contains('+ Создать новый счёт').click()
      cy.get(`.card:nth-child(${current + 1})`).should('have.class', 'card')
    })
  })

  it('Overdrafted', () => {
    cy.get(`.card:nth-child(2) .card-container .transaction-btn`).click()
    cy.get('.send-number-input').type('74213041477477406320783754' )
    cy.get('.send-sum-input').type('1000')
    cy.get('.send-btn').click()
    cy.get('.error-container').should('have.class', 'error-container')
  })

  it('current send', () => {
    cy.get('.card:nth-child(2) .account-number').then(text => {
    cy.get(`.card:nth-child(1) .card-container .transaction-btn`).click()
    cy.get('.send-number-input').type(text[0].textContent)
    cy.get('.send-sum-input').type('1000')
    cy.get('.send-btn').click()
    cy.get('.main-top-btn').click()
    cy.get(`.card:nth-child(2) .card-container .transaction-btn`).click()
    cy.get('.balance-value').should('have.text', '1000 ₽')
    })
  })

});
