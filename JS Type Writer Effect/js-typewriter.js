class TypeWriter {
  // the span, data-words. data-wait
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = ""; // whatever crrently in span area
    this.wordIndex = 0; // to know which word we on
    this.wait = parseInt(wait, 10); // make sure it's in integer
    this.isDeleting = false;

    this.type(); // MAIN METHOD that does effect
  }

  type() {
    //console.log("こんいちは, 여러분！");

    // Outputing the word loop
    // get current index of the word
    const current = this.wordIndex % this.words.length;
    //Get full text of current word
    const fullTxt = this.words[current];

    // check if in deleting state
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    /* output everthing in this.txt
      , insert into element */
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed, wire to setTimeout
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed = typeSpeed / 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make a pause at end
      typeSpeed = this.wait;
      //Set Delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++; // go to the next index item
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }

  // Type Method
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  // get the data from html
  const txtElement = document.querySelector(".txt-type");
  // parse the data to use in JS
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  /* example of raw data from HTML:
    console.log(document.querySelector(".txt-type")
              .getAttribute("data-words")) */
  const wait = txtElement.getAttribute("data-wait");

  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
