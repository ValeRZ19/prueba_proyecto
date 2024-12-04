
const cardsContainer= document.getElementById('cards_container');

//When the page loads, check for countries data in localStorage
document.addEventListener('DOMContentLoaded', async () => {
    const storeCountries = localStorage.getItem('countries');

    if (storeCountries) {
        countries = JSON.parse(storeCountries);
        showCountries(countries); 
    } else {
        console.log('No se encontraron datos');
        window.location.href = '/index.html';
    }
});

//Function that renders countries into the DOM
function showCountries(countries){
    cardsContainer.innerHTML = ''; 

    if(countries.length > 0){

        //Sort countries alphabetically by common name
        countries.sort((a,b) =>{
            return a.name.common.localeCompare(b.name.common);
        });

        //Loop through each country and create cards for de DOM
        countries.forEach(country => {
            const card = document.createElement('div');
            card.classList.add('col-12');
            cardsContainer.appendChild(card);
            card.innerHTML = ` <div class="card">
                      <div class="card-body">
                            <img loading="lazy" class="responsive-img" src=${country.flags.png} alt="${country.flags.alt}">
                                <p>${country.name.common} - ${country.cca2}</p>
                                <button class="btn btn_detalles" data-bs-toggle="modal" data-bs-target="#modal${country.cca2}">More Details</button>
                        </div>
                    </div>`;


            const modal = document.createElement('div');
            modal.id = `modal${country.cca2}`;
            modal.classList.add('modal', 'fade');
            modal.setAttribute('tabindex', '-1');

            let currencies = country.currencies ? `${Object.values(country.currencies)[0].name} 
                (${Object.values(country.currencies)[0].symbol})`
                : 'No currencies found'

            modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalLabel${country.cca2}">${country.name.common}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${country.flags.svg}" alt="${country.flags.alt}" class="img-fluid mb-3">
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Subregion:</strong> ${country.subregion ? country.subregion : 'Subregion not found'}</p>
                        <p><strong>Capital:</strong> ${country.capital}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString('es-ES')}</p>
                        <p><strong>Currencie:</strong> ${currencies}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
            document.body.appendChild(modal);
        });
        
    }
    else{
        console.log('No countries to show');
    }
}

//Search functionality
const btnSearch = document.getElementById('btnSearch');
const input = document.getElementById('input__text')

if(btnSearch && input){
    btnSearch.addEventListener('click', () => {
        const input__text = input.value.trim().toLowerCase();
    
        const filterCountry = countries.filter(country =>
            country.name.common.toLowerCase().includes(input__text) || country.cca2.toLowerCase().includes(input__text)
        );
    
        showCountries(filterCountry); 
    });
};


//filtering countries by region using a dropdown
const regionSelect = document.getElementById('select_region');
if(regionSelect){
    regionSelect = document.addEventListener('change', (event)=>{
        const region = event.target.value;
        
        let filter;
    
        if (region.selectedIndex === 0) {
            filter = countries;
        } else {
            filter = countries.filter(country => country.region === region); 
        }
    
        showCountries(filter); 
    });
};


//filtering countries by region using a map
const radios = document.querySelectorAll('.pin input[type="radio"]');
if(radios){
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const selectedRegion = e.target.value;
            console.log('region:', selectedRegion);

            const countries = JSON.parse(localStorage.getItem('countries'));
            const filteredCountries = countries.filter(country => country.region === selectedRegion);

            showCountries(filteredCountries); 
        });
    });

};