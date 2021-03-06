describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('succeeds with correct credentials', function () {
      cy.contains('login')
      cy.get('#username').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('logged in')
      cy.get('#show').click()
      cy.get('#title').type('Un huachimingo')
      cy.get('#author').type('El jojos')
      cy.get('#url').type('hola.com')
      cy.get('#create').click()
      cy.contains('new blog')
    })

    it('Can like a blog', function() {
      cy.contains('logged in')
      cy.get('#show').click()
      cy.get('#title').type('Un huachimingo')
      cy.get('#author').type('El jojos')
      cy.get('#url').type('hola.com')
      cy.get('#create').click()
      cy.contains('new blog')
      cy.contains('Un huachimingo')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains(1)
    })

    it('Can delete a blog', function() {
      cy.contains('logged in')
      cy.get('#show').click()
      cy.get('#title').type('Un huachimingo')
      cy.get('#author').type('El jojos')
      cy.get('#url').type('hola.com')
      cy.get('#create').click()
      cy.contains('new blog')
      cy.contains('Un huachimingo')
      cy.contains('view').click()
      cy.contains('remove').click()
    })

    it.only('Check order of likes', function() {
      const hello = {
        title: 'Hello',
        author: 'Washimingo',
        url:'hola.com'
      }
      const bye = {
        title: 'Bye',
        author: 'Huachiturro',
        url:'hola.com'
      }
      const comeback = {
        title: 'Comeback',
        author: 'Huachimango',
        url:'hola.com'
      }
      cy.contains('logged in')
      cy.newBlog(hello)
      cy.newBlog(bye)
      cy.newBlog(comeback)

      cy.get('#Comeback').within(() => {
        cy.contains('view').click()
        cy.get('button').contains('like').click()
        cy.wait(500)
        cy.get('button').contains('like').click()
        cy.wait(500)
        cy.get('button').contains('like').click()
        cy.wait(500)
      })

      cy.get('#Hello').within(() => {
        cy.contains('view').click()
        cy.get('button').contains('like').click()
        cy.wait(500)
      })

      cy.get('#Bye').within(() => {
        cy.contains('view').click()
        cy.get('button').contains('like').click()
        cy.wait(500)
        cy.get('button').contains('like').click()
        cy.wait(500)
      })

      cy.get('#blogs').find('[id$=-likes]')
    })
  })
})