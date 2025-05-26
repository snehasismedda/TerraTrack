// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

//flash message timer
const timerBar = document.getElementById('flash-timer');
      // Start animation (shrink bar over 5s)
      setTimeout(() => {
        timerBar.style.width = '0%';
      }, 100); // Slight delay to trigger transition
  
      // Close the alert after 5 seconds
      setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(document.getElementById('flash-alert'));
        alert.close();
      }, 5000);

// Filtering logic
const filterButtons = document.querySelectorAll(".filter-btn");
let selectedCategories = new URLSearchParams(window.location.search).getAll("category");

// Apply selected state on load
filterButtons.forEach(button => {
    const category = button.dataset.category;
    if (selectedCategories.includes(category)) {
        button.classList.add("selected");
    }

    button.addEventListener("click", () => {
        const index = selectedCategories.indexOf(category);
        if (index === -1) {
            selectedCategories.push(category);
        } else {
            selectedCategories.splice(index, 1);
        }

        // Build new URL
        const url = new URL(window.location.href.split('?')[0]);
        selectedCategories.forEach(cat => url.searchParams.append("category", cat));
        window.location.href = url.toString();
    });
});


//arrow for scorrling

  const filterContainer = document.getElementById("filterButtons");
  const scrollLeftBtn = document.getElementById("scrollLeft");
  const scrollRightBtn = document.getElementById("scrollRight");

  function updateScrollButtons() {
    const scrollLeft = filterContainer.scrollLeft;
    const scrollWidth = filterContainer.scrollWidth;
    const clientWidth = filterContainer.clientWidth;

    // Show right arrow if content overflows
    if (scrollWidth > clientWidth) {
      scrollRightBtn.classList.remove("d-none");
    } else {
      scrollRightBtn.classList.add("d-none");
    }

    // Show/hide left arrow based on scroll position
    if (scrollLeft > 10) {
      scrollLeftBtn.classList.remove("d-none");
    } else {
      scrollLeftBtn.classList.add("d-none");
    }

    // Hide right arrow when at the end
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      scrollRightBtn.classList.add("d-none");
    }
  }

  scrollLeftBtn.addEventListener("click", () => {
    filterContainer.scrollBy({ left: -200, behavior: 'smooth' });
  });

  scrollRightBtn.addEventListener("click", () => {
    filterContainer.scrollBy({ left: 200, behavior: 'smooth' });
  });

  // Update arrows on scroll
  filterContainer.addEventListener("scroll", updateScrollButtons);

  // Run on load
  window.addEventListener("load", updateScrollButtons);
  window.addEventListener("resize", updateScrollButtons);
