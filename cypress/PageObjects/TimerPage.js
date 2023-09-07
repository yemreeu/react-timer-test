class Timer {
  btnStart = "[data-testid=start-button]";
  btnStop = "[data-testid=stop-button]";
  btnReset = "[data-testid=reset-button]";
  display = "[data-testid=time-display]";

  clickStart() {
    cy.get(this.btnStart).click();
  }

  clickStop() {
    cy.get(this.btnStop).click();
  }

  clickReset() {
    cy.get(this.btnReset).click();
  }

  getDefaultDisplayedTime() {
    cy.get(this.display).should("contain", "25:00");
  }
}

export default Timer;
