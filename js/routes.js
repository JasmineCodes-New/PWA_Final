const page = require('page');

// Define route handlers
function loginPage() {
    // Display the login page
    console.log('Login Page');
}

function dashboardPage() {
    // Display the dashboard page
    console.log('Dashboard Page');
}

function profilePage() {
    // Display the profile page
    console.log('Profile Page');
}

function aboutPage() {
    // Load and display the "about.html" content dynamically
    fetch('pages/about.html') // Note the updated path
        .then((response) => response.text())
        .then((htmlContent) => {
            // Load the content into the "content" container
            document.getElementById('content').innerHTML = htmlContent;
        })
        .catch((error) => {
            console.error('Error loading "about.html":', error);
        });
}

// Configure routes
page('/', loginPage);
page('/dashboard', dashboardPage);
page('/profile', profilePage);
page('/about', aboutPage);

// Add a route for the about page
page('/about', () => {
    // Display the about page (you can navigate to about.html here)
    console.log('About Page');
});

// Set the default route
page('*', '/');

// Export the page instance if needed
module.exports = page;

