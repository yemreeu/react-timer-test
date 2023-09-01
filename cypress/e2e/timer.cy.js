describe("Timer App", () => {
  it("Should wait for 5 seconds after the page loads", () => {
    cy.visit("/");
    cy.wait(5000);
  });

  it("Should not allow stopping the timer before it's started", () => {
    cy.visit("/");

    cy.get("[data-testid=stop-button]").click();

    cy.get("[data-testid=time-display]").should("contain", "25:00");
  });

  it("Should not allow resetting the timer before it's started", () => {
    cy.visit("/");

    cy.get("[data-testid=reset-button]").click();

    cy.get("[data-testid=time-display]").should("contain", "25:00");
  });

  it("Should start the timer and check the initial time is 25:00", () => {
    cy.visit("/");
    cy.get("[data-testid=time-display]").should("have.text", "25:00");
    cy.get("[data-testid=start-button]").click();
  });

  it("Should stop the timer after 5 seconds and check the time is 24:55", () => {
    cy.visit("/");
    cy.get("[data-testid=start-button]").click();
    cy.wait(5000);
    cy.get("[data-testid=stop-button]").click();
    cy.get("[data-testid=time-display]").should("have.text", "24:55");
  });

  it("Should reset the timer and check the time is 25:00", () => {
    cy.visit("/");
    cy.get("[data-testid=start-button]").click();
    cy.wait(5000);
    cy.get("[data-testid=reset-button]").click();
    cy.get("[data-testid=time-display]").should("have.text", "25:00");
  });

  it("Should not restart the timer when 'Start' button is clicked while the timer is already running", () => {
    cy.visit("/");
    cy.get("[data-testid=start-button]").click();
    cy.wait(1000);
    cy.get("[data-testid=start-button]").click();
    cy.get("[data-testid=time-display]").should("not.contain", /24\s*:/);
  });

  it("Should reset the timer when 'Reset' button is clicked after stopping the timer", () => {
    cy.visit("/");
    cy.get("[data-testid=start-button]").click();

    cy.wait(5000);

    cy.get("[data-testid=stop-button]").click();

    cy.get("[data-testid=reset-button]").click();

    cy.get("[data-testid=time-display]").should("contain", "25:00");
  });

  it("Should not change the timer when 'Stop' button is clicked multiple times while the timer is running", () => {
    cy.visit("/");
    cy.get("[data-testid=start-button]").click();

    cy.wait(1000);

    cy.get("[data-testid=stop-button]").click();
    cy.get("[data-testid=time-display]").should("not.contain", /25\s*:/);

    cy.wait(1000);

    cy.get("[data-testid=stop-button]").click();
    cy.get("[data-testid=time-display]").should("not.contain", /25\s*:/);

    cy.wait(1000);

    cy.get("[data-testid=stop-button]").click();
    cy.get("[data-testid=time-display]").should("not.contain", /25\s*:/);
  });

  it("Should not go negative after 25 minutes and 5 seconds", () => {
    cy.visit("/");

    cy.clock();

    cy.get("[data-testid=start-button]").click();

    cy.tick(25 * 60 * 1000 + 5000);

    cy.get("[data-testid=time-display]").should("not.contain", /-\d+\s*:/);

    cy.clock().invoke("restore");
  });

  it("Should handle timer timeout and reach 0:00", () => {
    cy.visit("/");

    cy.clock();

    cy.get("[data-testid=start-button]").click();

    cy.tick(60 * 60 * 1000); // 1 hour

    cy.get("[data-testid=time-display]").should("contain", "0:00");

    cy.clock().invoke("restore");
  });

  it("Should persist timer functionality after page reload", () => {
    cy.visit("/");
    cy.get("[data-testid=start-button]").click();

    cy.wait(2000);

    cy.reload();

    cy.get("[data-testid=time-display]").should("not.contain", /25\s*:/);
  });
});
