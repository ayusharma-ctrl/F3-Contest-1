//url of Web API
var apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"


//we are fetching data from API using ".then" 
function fetchApiData() {
    //send fetch request to server, this is asynchronous, we don't know how long it will take to retrive data from server
    var promise = fetch(apiURL)

    //once we receive the data, we are storing the received data & converting it to JSON
    promise.then(data => data.json())
        .then(data => {
            var array = data
            insert(array)
        })
        .catch(error => console.error("Unable to fetch data" + error))
}

fetchApiData()


// we are fetching data from API using "async & await" 
async function fetchApiDataAgain() {
    try {
        // We are using fetch to get the response
        const response = await fetch(apiURL);
        const data = await response.json();
        //inserting/displaying the JSON data
        insert(data);
    } 
    catch (error) {
        console.log("Unable to fetch data" + error);
    }
}

fetchApiDataAgain()


//this is table
var dataTable = document.getElementById("dataTable");


//function to display the data of an object to the table
function insert(arrayName) {
    arrayName.map((e) => {
        //selecting row using js deafault method. -1 to insert row at the end
        var row = dataTable.insertRow(-1);
        //selecting cells of this row... 0,1,2,3,4,5 these are cell indexing
        var Name = row.insertCell(0)
        var Symbol = row.insertCell(1)
        var Curr_Price = row.insertCell(2)
        var Total_vol = row.insertCell(3)
        var Percentage = row.insertCell(4)
        var Market_cap = row.insertCell(5)

        //creating a new img element and giving it source and style properties
        var image = document.createElement("img")
        image.src = e.image
        image.style.width = "35px"
        Name.append(image)
        //creating span element to append name 
        var span = document.createElement("span")
        span.style.paddingLeft = "10px"
        span.textContent = e.name
        Name.append(span)
        //giving this class just to make img and name horizontally align using flex
        //Note: we are treating this cell as a container
        Name.className = "nameBlock"
        Name.style.border = 'none'

        //inserting data to the other cells

        Symbol.textContent = e.symbol.toUpperCase()

        Curr_Price.textContent = '$' + e.current_price
        Curr_Price.style.textAlign = "right"

        Total_vol.textContent = '$' + e.total_volume
        Total_vol.style.textAlign = "right"

        Percentage.textContent = e.price_change_percentage_24h
        Percentage.style.textAlign = "right"
        if (e.price_change_percentage_24h >= 0) {
            Percentage.style.color = 'green'
        }
        else {
            Percentage.style.color = 'red'
        }

        Market_cap.textContent = 'Mkt Cap: $' + e.market_cap
        Market_cap.style.textAlign = "right"
    })
}
