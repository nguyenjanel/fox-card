/**
 * Copyright 2025 nguyenjanel
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `fox-card`
 * 
 * @demo index.html
 * @element fox-card
 */
export class FoxCard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "fox-card";
  }

  constructor() {
    super();
     this.handleClick = this.handleClick.bind(this);

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/fox-card.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-inventOrange);
        font-family: var(--ddd-font-navigation);
        justify-content: center;
        display: inline-flex;
        box-shadow: 0 10px 20px rgba(0,0,0,0.15); /* soft shadow */
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        justify-content: center; /* centers horizontally */
        align-items: center;
        border-radius: 20px;
        border: 2px solid #ffc0cb;
        box-shadow: 0 0 15px rgba(255, 182, 193, 0.5);
      }
      h3 span {
        font-size: var(--fox-card-label-font-size, var(--ddd-font-size-s));
      }
      .img-cont{
        min-width: 400px;
        min-height: 200px;
        max-width: 400px;
        overflow: hidden;
        border-radius: 10px;
      }
      .img-cont img {
        max-width: 100%;
        border-radius: 10px;
        transition: transform 0.3s ease;
      }
      .img-cont img:hover {
        transform: scale(1.05);
      }
      .bar button {
        padding: 8px 20px;
        border: black;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .bar button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
      }
      .bar button.like.active {
        background-color: red;
        color: white;
      }
      .bar button.dislike.active {
        background-color: gray;
        color: white;
      }
      .caption a {
      color: white;
      text-decoration: none; /* optional: remove underline */
    }

    .caption a:hover {
      text-decoration: underline; /* optional hover effect */
    }
    `];
  }
    handleClick(e){
    console.log("Button clicked:", e.target); // <— should log every click
    const btn = e.target;
    if (btn.classList.contains("like")) {
      btn.classList.toggle("active");
    }
    else if (btn.classList.contains("dislike")) {
      btn.classList.toggle("active");
    }
    else if (btn.classList.contains("share")) {
      console.log("Link copied!");
    }
  }

  // Lit render the HTML
  render() {
    return html`
  <div class="wrapper">
    <h3>Fox Card</h3>
    <div class="img-cont">
      <img src="" alt = "fox pic">
    </div>
    <div class="bar">
      <button class="like" @click=${this.handleClick}>Like</button>
      <button class="dislike" @click=${this.handleClick}>Dislike</button>
      <button class="share" @click=${this.handleClick}>Share</button>
    </div>
    <div class="caption">
      <p></p>
    </div>
  </div>`;
  }

  firstUpdated() {
    // Make the API request when the element is ready
    fetch("https://randomfox.ca/floof/")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((data) => {
        // Update the image source and caption dynamically
        const img = this.renderRoot.querySelector("img");
        const caption = this.renderRoot.querySelector(".caption p");

        if (img) img.src = data.image;
        if (caption) {
        caption.innerHTML = `
          <p>
            <a href="${data.link}" target="_blank" rel="noopener noreferrer">
              View this fox 🦊
            </a>
          </p>
        `;
      }
      })
      .catch((err) => console.error("Error fetching fox:", err));
  }
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
  
}

globalThis.customElements.define(FoxCard.tag, FoxCard);