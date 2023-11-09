function fetchData() {

    // Fetch data from the API
    fetch("/zamestnanec/getId")
        .then(response => {

            return response.json();
        })
        .then(data => {
            // Set the JSON response on the "output" element
            document.getElementById('output').innerHTML = "aaa"//JSON.stringify(data, null, 2);
        })

}

// Add a click event listener to the button
document.getElementById('fetchData').addEventListener('click', fetchData);
