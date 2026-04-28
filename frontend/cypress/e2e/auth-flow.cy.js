describe('Auth flow', () => {
  it('redirects anonymous users to login', () => {
    cy.visit('/');

    cy.url().should('include', '/login');
    cy.contains('h1', 'Acceso').should('be.visible');
  });

  it('persists credentials and opens empleados page', () => {
    cy.intercept('GET', '**/api/empleados', {
      statusCode: 200,
      body: []
    }).as('getEmpleados');

    cy.visit('/login');
    cy.get('input[formControlName="username"]').type('admin');
    cy.get('input[formControlName="password"]').type('admin');
    cy.contains('button', 'Guardar y continuar').click();

    cy.url().should('include', '/empleados');
    cy.contains('h1', 'CRUD de Empleados').should('be.visible');
    cy.wait('@getEmpleados');

    cy.window().then((win) => {
      const stored = win.localStorage.getItem('empleados.auth');
      expect(stored).to.not.equal(null);
    });
  });

  it('executes CRUD flow with fixtures and API intercepts', () => {
    cy.fixture('empleados.json').then((fixture) => {
      const createdEmpleado = { ...fixture.created };
      const updatedPayload = { ...fixture.updated };

      cy.intercept('GET', '**/api/empleados', (req) => {
        req.reply({ statusCode: 200, body: fixture.initial });
      }).as('getEmpleados');

      cy.intercept('POST', '**/api/empleados', (req) => {
        expect(req.body).to.deep.equal({
          nombre: fixture.created.nombre,
          direccion: fixture.created.direccion,
          telefono: fixture.created.telefono
        });

        req.reply({ statusCode: 201, body: createdEmpleado });
      }).as('createEmpleado');

      cy.intercept('PUT', '**/api/empleados/EMP-0002', (req) => {
        expect(req.body).to.deep.equal(updatedPayload);
        req.reply({ statusCode: 200, body: { clave: 'EMP-0002', ...updatedPayload } });
      }).as('updateEmpleado');

      cy.intercept('DELETE', '**/api/empleados/EMP-0002', (req) => {
        req.reply({ statusCode: 204, body: null });
      }).as('deleteEmpleado');

      cy.visit('/login');
      cy.get('input[formControlName="username"]').type('admin');
      cy.get('input[formControlName="password"]').type('admin');
      cy.contains('button', 'Guardar y continuar').click();
      cy.wait('@getEmpleados');
      cy.contains('p', 'No hay empleados registrados.').should('be.visible');

      cy.get('app-empleado-create-form input[formControlName="nombre"]').type(fixture.created.nombre);
      cy.get('app-empleado-create-form input[formControlName="direccion"]').type(fixture.created.direccion);
      cy.get('app-empleado-create-form input[formControlName="telefono"]').type(fixture.created.telefono);
      cy.contains('button', 'Crear empleado').click();

      cy.wait('@createEmpleado');
      cy.wait('@getEmpleados');

      cy.window().then((win) => {
        return win.fetch('http://localhost:8080/api/empleados/EMP-0002', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPayload)
        });
      });
      cy.wait('@updateEmpleado');

      cy.window().then((win) => {
        return win.fetch('http://localhost:8080/api/empleados/EMP-0002', {
          method: 'DELETE'
        });
      });
      cy.wait('@deleteEmpleado');
    });
  });
});