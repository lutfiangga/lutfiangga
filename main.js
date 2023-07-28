 const itemsPerPage = 6;

  // Get the projects container and pagination element
  const projectsContainer = document.getElementById('projects');
  const paginationElement = document.getElementById('pagination');

  // Get all project cards
  const projectCards = projectsContainer.querySelectorAll('.projects__card');

  function showPage(pageNumber) {
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
  }

  function createPaginationButtons() {
    // Calculate the total number of pages
    const totalPages = Math.ceil(projectCards.length / itemsPerPage);

    // Create pagination buttons
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<button onclick="showPage(${i})">${i}</button>`;
    }

    // Insert pagination buttons into the pagination element
    paginationElement.innerHTML = paginationHTML;
  }

  // Show the first page by default
  showPage(1);

  // Create pagination buttons when the page loads
  createPaginationButtons();
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
      location.reload();
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
