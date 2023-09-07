import Timer from "../PageObjects/TimerPage.js";



describe("Timer App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // For taking screenshot when test failures
  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.screenshot();
    }
  });

  const tm = new Timer();
  it("Should display '25:00' when the page is loaded", () => {
    
    tm.getDefaultDisplayedTime();
  });

  it("Should not allow stopping the timer before it's started", () => {
    tm.clickStop();
    tm.getDefaultDisplayedTime();
  });

  it("Should not allow resetting the timer before it's started", () => {
    tm.clickReset();
    tm.getDefaultDisplayedTime();
  });

  it("Should start the timer and check the initial time is 25:00", () => {
    tm.getDefaultDisplayedTime();
    tm.clickStart();
  });

  it("Should stop the timer after 5 seconds and check the time is 24:55", () => {
    tm.clickStart();
    cy.wait(5000);
    tm.clickStop();
    cy.get("[data-testid=time-display]").should("have.text", "24:55");
  });

  it("Should reset the timer and check the time is 25:00", () => {
    tm.clickStart();
    cy.clock();
    cy.tick(5000);
    tm.clickReset();
    tm.getDefaultDisplayedTime();
  });

  it("Should not restart the timer when 'Start' button is clicked while the timer is already running", () => {
    tm.clickStart();
    cy.wait(1000);
    tm.clickStart();
    cy.get("[data-testid=time-display]").should("not.contain", /24\s*:/);
  });

  it("Should reset the timer when 'Reset' button is clicked after stopping the timer", () => {
    tm.clickStart();
    cy.clock();
    cy.tick(5000);
    tm.clickStop();
    tm.clickReset();
    tm.getDefaultDisplayedTime();
  });

  it("Should not change the timer when 'Stop' button is clicked multiple times while the timer is running", () => {
    tm.clickStart();
    cy.clock();
    cy.tick(1000);
    tm.clickStop();
    cy.get("[data-testid=time-display]").should("not.contain", /25\s*:/);
    cy.clock();
    cy.tick(1000);
    tm.clickStop();
    cy.get("[data-testid=time-display]").should("not.contain", /25\s*:/);
    cy.clock();
    cy.tick(1000);
    tm.clickStop();
    cy.get("[data-testid=time-display]").should("not.contain", /25\s*:/);
  });

  it("Should not go negative after 25 minutes and 5 seconds", () => {
    cy.clock();
    tm.clickStart();
    cy.tick(25 * 60 * 1000 + 5000);
    cy.get("[data-testid=time-display]").should("not.contain", /-\d+\s*:/);
    cy.clock().invoke("restore");
  });

  it("Should handle timer timeout and reach 0:00", () => {
    cy.clock();
    tm.clickStart();
    cy.tick(60 * 60 * 1000);
    cy.get("[data-testid=time-display]").should("contain", "0:00");
    cy.clock().invoke("restore");
  });

  it("Should persist timer functionality after page reload", () => {
    tm.clickStart();
    cy.clock();
    cy.tick(2000);
    cy.reload();
    cy.get("[data-testid=time-display]").should("not.contain", /25\s*:/);
  });
});
