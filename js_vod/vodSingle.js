document.addEventListener('DOMContentLoaded', () => {
  const loadingDiv = document.getElementById('id_loading');
  const infoDiv = document.getElementById('id_info_div');

  const fetchCountryData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,borders,flags');
      const countries = await response.json();

      // Extracting the country name from the URL parameters
      const params = new URLSearchParams(window.location.search);
      const countryName = params.get('name'); // Get the country name from URL

      // Find the country matching the name from the URL
      const country = countries.find(c => c.name.common === countryName);

      if (!country) {
        throw new Error('Country not found');
      }

      // Populate the country details
      document.getElementById('id_img').src = country.flags.png; // Using PNG format for the flag
      document.getElementById('id_h1').textContent = country.name.common; // Access the common name
      document.getElementById('id_capital').textContent = country.capital ? country.capital[0] : 'N/A'; // Handle missing capital
      document.getElementById('id_population').textContent = country.population.toLocaleString(); // Format population with commas
      document.getElementById('id_borders').textContent = country.borders ? country.borders.join(', ') : 'None'; // Display borders

      // Hide loading and show country info
      loadingDiv.style.display = 'none';
      infoDiv.style.display = 'block';
    } catch (error) {
      console.error('Error fetching country data:', error);
      loadingDiv.innerHTML = '<p class="text-danger">Error loading data</p>'; // Show error message
      infoDiv.style.display = 'none'; // Hide info if there's an error
    }
  };

  // Call the function to fetch data
  fetchCountryData();

  // Back button functionality
  document.getElementById('back_btn').addEventListener('click', () => {
    window.location.href = 'vod.html'; // Redirect to your main movie list
  });
});
