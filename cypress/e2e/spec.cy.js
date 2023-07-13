describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
  })
})

describe('Name', function () {
  it('Test', function () {
    cy.visit('localhost:3000')
    cy.get('input[name="name"]').type('Kubilay Özdemir')
  })
});

describe('Check Info', function () {
  it('Check contain info', function () {
    cy.visit('localhost:3000')
    cy.get('button.button')
      .should('contain', 'Gönder')

  })
})

describe('Mail', function () {
  it('Mail Test', function () {
    cy.visit('localhost:3000')
    cy.get('input[type="email"]').type('kubilayozdemir95@gmail.com')
  })
});

describe('Password', function () {
  it('Password Test', function () {
    cy.visit('localhost:3000')
    cy.get('input[type="password"]').type('123456789K')
  })
});

describe('Kullanım Kosulları', () => {
  it('Kullanım kosulları kutusu', () => {
    cy.visit('localhost:3000')
    cy.get('#checkbox')
      .check()

    cy.get('#checkbox')
      .should('be.checked')
  })
})


describe('Input Kontrolü', () => {
  it('Boş input', () => {
    cy.visit('localhost:3000')

    cy.get('input[type="email"]').type('kubilayozdemir95@gmail.com')
    cy.get('input[type="password"]').type('123456789K')
    cy.get('#checkbox')
      .check()

      .get('button.button')
       .click()

       cy.get('input[name="name') 
      .should('not.have.value', '') 

  })
})

describe('Form Submit', () => {
  it('Formun submit', () => {
    cy.visit('localhost:3000') 
   
    cy.get('button.button') 
    .click() 
    
    cy.get('input[name="name"], input[type="email"],input[type="password"],input[type="checkbox"]') 
     .should("have.value")
    
  
  })
})








