class MainSearch extends SearchForm {
  constructor() {
    super();
    // Select all search input fields in the document
    this.allSearchInputs = document.querySelectorAll('input[type="search"]');
    this.setupEventListeners();
  }

  setupEventListeners() {
    const allSearchForms = [];
    
    // Collect all forms containing search inputs
    this.allSearchInputs.forEach((input) => allSearchForms.push(input.form));

    // Add focus event listener to the main search input
    this.input.addEventListener('focus', this.onInputFocus.bind(this));

    // Only add reset listeners if there are multiple forms
    if (allSearchForms.length >= 2) {
      allSearchForms.forEach((form) => 
        form.addEventListener('reset', this.onFormReset.bind(this))
      );
    }

    // Add input event listeners to all search inputs
    this.allSearchInputs.forEach((input) => 
      input.addEventListener('input', this.onInput.bind(this))
    );

    // Prevent form submission to open search results in a new page
    allSearchForms.forEach((form) => 
      form.addEventListener('submit', this.onSubmit.bind(this))
    );
  }

  onFormReset(event) {
    super.onFormReset(event);
    // Sync inputs if the form should be reset
    if (super.shouldResetForm()) {
      this.keepInSync('', this.input);
    }
  }

  onInput(event) {
    const target = event.target;
    // Keep all search inputs in sync
    this.keepInSync(target.value, target);
  }

  onInputFocus() {
    const isSmallScreen = window.innerWidth < 750;
    // Smooth scroll to the input if on a small screen
    if (isSmallScreen) {
      this.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Your logic to handle the search results without leaving the page
    const searchTerm = this.input.value.trim();
    if (searchTerm) {
      // Implement your search logic here, e.g., filter results or make an API call
      console.log(`Searching for: ${searchTerm}`);
      // For example, display results dynamically below the input
    }
  }

  keepInSync(value, target) {
    // Update all other search inputs with the current value
    this.allSearchInputs.forEach((input) => {
      if (input !== target) {
        input.value = value;
      }
    });
  }
}

customElements.define('main-search', MainSearch);
