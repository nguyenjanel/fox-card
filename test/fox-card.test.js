import { html, fixture, expect } from '@open-wc/testing';
import "../fox-card.js";

describe("FoxCard test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <fox-card
        title="title"
      ></fox-card>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
