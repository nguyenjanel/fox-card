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
    
    this.foxList = [];
    this.currentIndex = -1;

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
        color: var(--ddd-theme-default-athertonViolet);
        background-color: var(--ddd-theme-default-white);
        font-family: var(--ddd-font-navigation);
        justify-content: center;
        display: inline-flex;
        box-shadow: 0 10px 20px rgba(0,0,0,0.15); /* soft shadow */
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; /* centers horizontally */
        align-items: center;
        border-radius: 20px;
        border: 2px solid var(--ddd-theme-default-athertonViolet);
        box-shadow: 0 0 15px rgba(255, 182, 193, 0.5);
      }
      h3{
        font-size: var(--fox-card-label-font-size, var(--ddd-font-size-s));
        padding: 4px;
      }
      .img-cont{
        width: 400px;       /* set your preferred size */
        height: 400px;
        overflow: hidden;
        border-radius: 8px;
        padding: 8px;
      }
      .img-cont img {
        border-radius: 10px;
        border: 2px solid black;
        width: 100%;
        height: 100%;
        object-fit: cover;  
        display: block; 
      }
      .bar {
        display: flex;
        gap: 12px;
        justify-content: center;
        margin-top: 4px;
      }
      .bar button {
        padding: 8px 20px;
        border: 1px solid var(--ddd-theme-default-beaverBlue);
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        display: inline-flex;       
        align-items: center;        
        justify-content: center;     
        transition: transform 0.2s, box-shadow 0.2s;
        color: var(--ddd-theme-default-beaverBluew);
        transition: transform 0.2s, color 0.2s;
      }
      .bar button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        background-color: var(--ddd-theme-default-alertImmediate);
      }
      .bar button.like.active {
        background-color: red;
        color: white;
      }
      .bar button.dislike.active {
        background-color: gray;
        color: red;
      }
      .bar button.share{
        height: 40px;
      }
      .caption a {
      color: var(--ddd-theme-default-athertonViolet);
      text-decoration: none; /* optional: remove underline */
    }
      .caption a:hover {
        text-decoration: underline; 
      }
      .nav-bar {
        display: flex;
        align-items: center;      
        justify-content: center; 
        gap: 10px;               
        margin-bottom: 10px;
      }
      .nav-bar h3{
          margin: 0;
          font-size:  var(--ddd-font-size-l);
      }
      .nav-bar button {
        background: none;
        border: none;
        font-size: 40px;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.2s;
      }
      .nav-bar button:hover {
        background-color: var(--ddd-theme-default-alertImmediate);
        transform: scale(1.1);
      }
      @media (prefers-color-scheme: dark) {
        :host {
          background-color: var(--ddd-theme-default-potential50);
        }
        .bar button{
          background-color: var(--ddd-theme-default-limestoneMaxLight);
          color: var(--ddd-theme-default-potential50);
        }
        .caption a {
        color: var(--ddd-theme-default-limestoneLight);
        text-decoration: none; /* optional: remove underline */
      }
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
  <div class="wrapper">
    <div class="nav-bar">
      <button class="prev" @click=${() => this.showPrevFox()}>&larr;</button>
      <h3 class = "cat-name"></h3>
      <button class="next" @click=${() => this.showNextFox()}>&rarr;</button>
    </div>
    <div class="img-cont">
      <img src="" alt = "fox pic">
    </div>
    <div class="bar">
      <button class="like" @click=${this.handleClick}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
      <button class="dislike" @click=${this.handleClick}>
        <svg width="24" height="24" viewBox="0 0 24 24">
        <!-- Left half of heart -->
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09" fill="currentColor"/>
        <!-- Right half of heart -->
        <path d="M12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3c-1.74 0-3.41 0.81-4.5 2.09" fill="currentColor"/>
        <!-- Jagged crack -->
        <path d="M12 3 L11 6 L13 9 L11 12 L13 15 L12 21" fill="none" stroke="white" stroke-width="2"/>
        </svg>
      </button>
      <button class="share" @click=${() => this.handleShare()}>Share</button>
    </div>
    <div class="caption">
      <p></p>
    </div>
  </div>`;
  }

  handleClick(e) {
    const btn = e.target;
    const likeBtn = this.renderRoot.querySelector(".like");
    const dislikeBtn = this.renderRoot.querySelector(".dislike");

    if (!this.foxList[this.currentIndex]) return;

    const fox = this.foxList[this.currentIndex];

    if (btn.classList.contains("like")) {
      const isActive = btn.classList.toggle("active");
      dislikeBtn.classList.remove("active");
      fox.state = { like: isActive, dislike: false };
    }
    else if (btn.classList.contains("dislike")) {
      const isActive = btn.classList.toggle("active");
      likeBtn.classList.remove("active");
      fox.state = { like: false, dislike: isActive };
    }
    // Also save to localStorage per fox
    const savedState = JSON.parse(localStorage.getItem("foxStates") || "{}");
    savedState[fox.image] = fox.state;
    localStorage.setItem("foxStates", JSON.stringify(savedState));
  }

  async firstUpdated() {
    //const resp = await fetch("/api/foxes");
    //const resp = await fetch("./mock-data/foxes.json");
    const resp = await fetch("/api/cats");
    //const resp = await fetch("/mock-data/cats.json");
    this.foxList = await resp.json();  // store full list 
    this.currentIndex = 0;
    this.showFoxAt(this.currentIndex);
}
  getFoxState(image) {
    // retrieve saved states from localStorage
    const savedState = JSON.parse(localStorage.getItem("foxStates") || "{}");
    
    // return the state for this specific fox (or default false/false)
    return savedState[image] || { like: false, dislike: false };
  }

  showFoxAt(index) {
    const fox = this.foxList[index];
    if (!fox) return;

    this.currentFoxId = fox.id;
    this.updateFoxDisplay({
      image: fox.image,
      link: fox.image,
      state: this.getFoxState(fox.image),
      name: fox.name,
    });
  }

  handleShare() {
    const fox = this.foxList?.[this.currentIndex];
    if (!fox) return;

    const foxState = this.getFoxState(fox.image);
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set("foxImage", fox.image);
    shareUrl.searchParams.set("foxLike", foxState.like);
    shareUrl.searchParams.set("foxDislike", foxState.dislike);

    navigator.clipboard.writeText(shareUrl.toString())
      .then(() => alert("link copied!"))
      .catch(err => console.error(err));
}
/*
  loadNewFox() {
    fetch("https://randomfox.ca/floof/")
    .then(resp => resp.ok && resp.json())
    .then(data => {
      const fox = { 
        image: data.image, 
        link: data.link,
        state: { like: false, dislike: false },
      };

      this.foxList.push(fox);
      this.currentIndex = this.foxList.length - 1;
      this.currentFoxId = fox.image;

      this.updateFoxDisplay(fox); 
    })
    .catch(err => console.error("Error fetching fox:", err));
  }*/
  updateFoxDisplay(fox) {
      const img = this.renderRoot.querySelector("img");
      const caption = this.renderRoot.querySelector(".caption");
      const likeBtn = this.renderRoot.querySelector(".like");
      const dislikeBtn = this.renderRoot.querySelector(".dislike");
      const name = this.renderRoot.querySelector(".cat-name");

      if (img) img.src = fox.image;
      if (caption) {
        caption.innerHTML = `
          <p>
            <a href="${fox.link}" target="_blank" rel="noopener noreferrer">
              View this Cat 🐈
            </a>
          </p>`;
      }

      if (name) {
        name.textContent = fox.name || "Unnamed Cat"; // ✅ just set the text
      }

      // Restore like/dislike state
      likeBtn?.classList.toggle("active", fox.state.like);
      dislikeBtn?.classList.toggle("active", fox.state.dislike);;
  }

showPrevFox() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.showFoxAt(this.currentIndex);
  } else {
      console.log("No previous fox!");
  }
}

showNextFox() {
  if (this.currentIndex < this.foxList.length - 1) {
    this.currentIndex++;
    this.showFoxAt(this.currentIndex);
  } else {
    console.log("No next fox!");
  }
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