const itemsPerPage = 6;

  // Get the projects container and pagination element
  const projectsContainer = document.getElementById('projects');
  const paginationElement = document.getElementById('pagination');

  // Function to show a specific page
  function showPage(pageNumber) {
    // Get all project cards
    const projectCards = projectsContainer.querySelectorAll('.projects__card');

    // Calculate the start and end indices of items to show on the current page
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Hide all project cards
    projectCards.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Update pagination buttons
    updatePaginationButtons(pageNumber);
  }

  // Function to create pagination buttons
  function createPaginationButtons(totalPages) {
    // Create initial pagination buttons
    let paginationHTML = `<button onclick="showPage(1)">&laquo;</button>`;
    paginationHTML += `<span id="paginationButtons"></span>`;
    paginationHTML += `<button onclick="showPage(${totalPages})">&raquo;</button>`;

    // Insert pagination buttons into the pagination element
    paginationElement.innerHTML = paginationHTML;
  }

  // Function to update pagination buttons based on the current page
  function updatePaginationButtons(currentPage) {
    // Get all project cards
    const projectCards = projectsContainer.querySelectorAll('.projects__card');
    
    // Calculate the total number of pages
    const totalPages = Math.ceil(projectCards.length / itemsPerPage);

    let buttonsHTML = '';

    // Display the ellipses logic
    if (totalPages <= 5) {
      // Show all pages if total pages are 5 or less
      for (let i = 1; i <= totalPages; i++) {
        buttonsHTML += `<button onclick="showPage(${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
      }
    } else {
      if (currentPage > 3) {
        buttonsHTML += `<button onclick="showPage(1)">1</button>`;
        if (currentPage > 4) {
          buttonsHTML += `<span>...</span>`;
        }
      }
      
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(currentPage + 2, totalPages);
      
      if (currentPage === totalPages) {
        startPage = totalPages - 4;
      }
      if (currentPage === 1) {
        endPage = 5;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        buttonsHTML += `<button onclick="showPage(${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
      }

      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          buttonsHTML += `<span>...</span>`;
        }
        buttonsHTML += `<button onclick="showPage(${totalPages})">${totalPages}</button>`;
      }
    }

    // Update pagination buttons
    document.getElementById('paginationButtons').innerHTML = buttonsHTML;
  }

  // Function to fetch and display portfolio data
  async function fetchAndDisplayPortfolio() {
    try {
      // Fetch the data from the API
      const response = await fetch('https://si21-portofolio.vercel.app/api/portofolio/luphie');
      
      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Convert the response to JSON
      const data = await response.json();

      // Sort the records by CreatedTime
      data.records.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));

      // Loop through each portfolio record and create the HTML structure
      data.records.forEach(item => {
        // Create the article element
        const article = document.createElement('article');
        article.className = 'projects__card';

        // Create the img element
        const img = document.createElement('img');
        img.src = item.fields.images;
        img.alt = item.fields.title;
        img.className = 'projects__img';

        // Create the modal div
        const modalDiv = document.createElement('div');
        modalDiv.className = 'projects__modal';

        // Create the inner div
        const innerDiv = document.createElement('div');

        // Create the subtitle span
        const subtitle = document.createElement('span');
        subtitle.className = 'projects__subtitle';
        subtitle.textContent = item.fields.category;

        // Create the title h3
        const title = document.createElement('h3');
        title.className = 'projects__title';
        title.textContent = item.fields.title;

        // Create the link
        const link = document.createElement('a');
        link.href = item.fields.link;
        link.target = '_blank';
        link.className = 'projects__button button button__small';
        link.innerHTML = '<i class="ri-link"></i>';

        // Append elements
        innerDiv.appendChild(subtitle);
        innerDiv.appendChild(title);
        innerDiv.appendChild(link);
        modalDiv.appendChild(innerDiv);
        article.appendChild(img);
        article.appendChild(modalDiv);
        projectsContainer.appendChild(article);
      });

      // After adding all project cards, create pagination buttons
      const totalPages = Math.ceil(data.records.length / itemsPerPage);
      createPaginationButtons(totalPages);

      // Show the first page by default
      showPage(1);

    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  // Call the function to fetch and display the portfolio items
  fetchAndDisplayPortfolio();
  
const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach(tc => {
      tc.classList.remove('filters__active');
    });
    target.classList.add('filters__active');
    tabs.forEach(t => {
      t.classList.remove('filter-tab-active');
    });
    tab.classList.add('filter-tab-active');

    // Check if "Projects" tab is active and update the pagination visibility
    const isProjectsTabActive = target.classList.contains('projects__content');
    const paginationElement = document.querySelector('.pagination');
    if (isProjectsTabActive) {
      paginationElement.style.display = 'block';
      // Show the first page of the filtered content
      showPage(1);
      // location.reload();
    } else {
      paginationElement.style.display = 'none';
      // location.reload();
    }
    // Refresh the page after the tab is clicked
  });
});

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);

};
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());

});
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,

});
sr.reveal(`.profile__border`);
sr.reveal(`.profile__name`, {
  delay: 500

});
sr.reveal(`.profile__profession`, {
  delay: 600

});
sr.reveal(`.profile__social`, {
  delay: 700

});
sr.reveal(`.profile__info-group`, {
  interval: 100,
  delay: 700

});
sr.reveal(`.profile__buttons`, {
  delay: 800

});
sr.reveal(`.filters__content`, {
  delay: 900

});
sr.reveal(`.filters`, {
  delay: 1000

});
