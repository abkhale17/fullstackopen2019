describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'drapper',
      username: 'madmen',
      password: '1960'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('madmen')
      cy.get('#password').type('1960')
      cy.get('#login-btn').click()
      cy.contains('madmen is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('madmen')
      cy.get('#password').type('wrongpw')
      cy.get('#login-btn').click()
      cy.get('.message')
        .should('contain','Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'madmen is logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username:'madmen', password:'1960' })
      })
  
      it('A blog can be created', function() {
        cy.createBlog({
          title: 'Mad Men',
          author: 'Matthew Weiner',
          url: 'madmen1960.com',
          likes: 4
        })
      })

      it('User can like a blog', function() {
        cy.createBlog({
          title: 'Mad Men',
          author: 'Matthew Weiner',
          url: 'madmen1960.com',
          likes: 4
        })
        cy.get('.display').click()
        cy.get('#like').click()
        cy.contains('Likes: 5')
      })

      it('Only creator of that blog can delete it', function() {
        cy.createBlog({
          title: 'A blog Mean to delete',
          author: 'Anonumous',
          url: 'asdjasda.com',
          likes: 213
        })
        cy.get('.display').click()
        cy.get('#delete').click()
        cy.contains('title: A blog Mean to delete').should('not.exist')
      })

      it('other users cant delete others blog', function() {
        cy.createBlog({
          title: 'A blog Mean to delete',
          author: 'Anonumous',
          url: 'asdjasda.com',
          likes: 213
        })
        const user = {
          name: 'unauthorizedUser',
          username: 'yuck',
          password: '12345'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
        cy.get('.display').click()
        cy.get('#delete').should('not.exist')
      })
    })

    describe('Blog order => Descending', function() {
      beforeEach(() => {
        cy.login({ username:'madmen', password:'1960' })
        cy.createBlog({
          title: 'WEst world',
          author: 'Jonathan nolan and lisa joy',
          url: 'westdestinations.com',
          likes: 4234
        })
        cy.createBlog({
          title: 'Memento',
          author: 'Jonathan nolan ',
          url: 'memento.com',
          likes: 2321323
        })
        cy.createBlog({
          title: 'Interstellar',
          author: 'christaphore nolan',
          url: 'spacec.com',
          likes: 324
        })
      })

      it('blogs are ordered according to likes with the blog with the most likes being first', function() {
        cy.get('.displayBlog').then( ($blog) => {
          cy.get('.defaultBlogView').then( ($b) => {
            cy.get('.display').then(($btn) => {
              cy.wrap($btn[0]).click()
              cy.wrap($btn[1]).click()
              cy.wrap($btn[2]).click()
            })

          cy.get('.likesCount').then( ($likes) => {
              cy.get('span').then(($l) => {
                var likesArray = []
                for (let index = 0; index < $likes.length; index++) {
                  likesArray.push(parseInt($l[index].innerHTML))
                }
                var originalLikes = [...likesArray]
                likesArray.sort((a,b) => b - a)
                expect(originalLikes).to.deep.eq(likesArray)
                console.log(likesArray)
              })
              })
          })
        })
        
      })
    })
  })
})