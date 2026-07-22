import City from "./models/city.js"

export async function GetCities() {
    let response = await fetch("https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba");
    let data = await response.json();
    if (data.success)
        CreateCitiesArray(data.result.records);
    else
        alert('error');
}
function CreateCitiesArray(array){
    let cities = [];
    array.forEach(item => {
        cities.push(new City(item.שם_ישוב))
    });
    RenderAutocompleteList(cities);
}

function RenderAutocompleteList(cities){
    let list = document.querySelector(`#cities`);

    cities.forEach((city) => {
        let option = document.createElement('option');
        option.textContent = `${city.name_in_hebrew}`;
        list.append(option);
    });

}
