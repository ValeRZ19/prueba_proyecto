
let countries = [];


//Function that fetchs countries data from the API 
async function getCountries() {
    try {
        // checks if country data already exists in localStorage
        const storeCountries = localStorage.getItem('countries');
        
        if(storeCountries){
            countries = JSON.parse(storeCountries);
            console.log('localstorage',countries)
            return countries;
        }
        else{
             //if no data is found in localStorage, fetch it from the API and load it in the localStorage
            const llamadaApi = await fetch('https://restcountries.com/v3.1/all')
            const response = await llamadaApi.json();
            console.log('countries', response)
            localStorage.setItem('countries', JSON.stringify(response)); 
            return response;
            
        }
    } catch (error) {
        console.log('Error when performing the query', error)
    }
}


