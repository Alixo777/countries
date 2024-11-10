export default class VODClass {
  constructor(parentSelector, country) {
    this.parent = parentSelector;
    this.flag = country.flags.png; // Use PNG format for the flag
    this.name = country.name.common; // Common name of the country
    this.capital = country.capital ? country.capital[0] : "N/A"; // Capital (handle missing)
    this.population = country.population.toLocaleString(); // Format population with commas
    this.borders = country.borders ? country.borders.join(", ") : "None"; // Handle borders
  }

  render() {
    const div = document.createElement("div");
    div.className = "col-md-4 p-2";
    document.querySelector(this.parent).append(div);

    div.innerHTML = `
      <article class="p-2 shadow overflow-hidden h-100">
        <img src="${this.flag}" alt="${this.name}" class="w-25 float-end ms-2">
        <h2>${this.name}</h2>
        <div><strong>Capital:</strong> ${this.capital}</div>
        <div><strong>Population:</strong> ${this.population}</div>
        <div><strong>Borders:</strong> ${this.borders}</div>
        <a href="vod.html?name=${this.name}" class="btn btn-warning">More info</a>
      </article>
    `;
  }
}

