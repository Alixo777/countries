const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,population,borders,flags';

// Define the specific countries to filter
const allowedCountries = ["Israel", "United States", "France", "United Kingdom", "Thailand"];

// Function to fetch country data
async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();
        return countries; // Return all countries for searching
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to filter countries to only allowed ones
function filterAllowedCountries(countries) {
    return countries.filter(country => allowedCountries.includes(country.name.common));
}

// Function to display countries
function displayCountries(countriesToDisplay) {
    const row = document.getElementById('id_row');
    row.innerHTML = ''; // Clear previous results

    if (countriesToDisplay.length === 0) {
        row.innerHTML = '<p class="text-center">No results found</p>';
        return;
    }

    countriesToDisplay.forEach(country => {
        const col = document.createElement('div');
        col.className = 'col-md-4 p-2';
        col.innerHTML = `
            <article class=" bg-white p-2 shadow overflow-hidden">
                <h2>${country.name.common}</h2>
                <a href="vodSingle.html?name=${country.name.common}">
                    <h2><img id="id_img" src="${country.flags.png}" height="180px" width="240px" alt="Country flag"/></h2>
                </a>
            </article>
        `;
        row.appendChild(col);
    });
}

// Search functionality
async function setupSearch(countries) {
    document.getElementById('search_btn').addEventListener('click', () => {
        const searchInput = document.getElementById('id_input').value.trim().toLowerCase();
        
        const filteredCountries = countries.filter(country => 
            country.name.common.toLowerCase() === searchInput
        );
        
        displayCountries(filteredCountries);
    });
}

// Initial function to fetch data and set up the app
async function init() {
    const countries = await fetchCountries();
    const allowedCountriesList = filterAllowedCountries(countries);
    displayCountries(allowedCountriesList);
    setupSearch(countries); // Set up search with all countries
}

// Start the application
init();
