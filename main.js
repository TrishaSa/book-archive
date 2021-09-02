 const searchBook = () => {
	const searchField = document.getElementById('search-field')
	const searchText = searchField.value
	searchField.value = ''
	// handle empty string
	if(searchText == ""){
		// error handle
		displayError()
	}

	else{
		// dsiplay spinner
	document.getElementById('spinner').style.display = 'block';
	// hide search result
	document.getElementById('search-result').textContent = '';
	// hide books found
	document.getElementById('book-list').innerText = '';
	// hide error msg
	document.getElementById('error-msg').style.display = "none"
	//console.log(searchText)
	const url = ` http://openlibrary.org/search.json?q=${searchText}`
	fetch(url)
	.then(res => res.json())
	.then(data => displayBook(data.docs))

	}
}
const displayError = () =>{
	document.getElementById('error-msg').style.display = "block"
  document.getElementById('spinner').style.display = 'none';
 	document.getElementById('book-list').innerText = '';

}
const displayBook = books => {
    // console.log(books)

    // access search result div
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';

    // show books found
    document.getElementById('book-list').innerText = `Total books ${books.length}`

   // display each books in card
    books.forEach(book => {
    	const div = document.createElement('div')
    	div.classList.add('col')
    	div.innerHTML = `
    	<div class="card h-100">
      <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid h-75">
      <div class="card-body">
        <h5 class="card-title"> title: ${book.title}</h5>
        <p class="card-text">Author Name: ${book.author_name}</p>
        <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
        <p class="card-text">Publisher: ${book.publisher}</p>
      </div>
       <div class="card-footer">
      </div>
    </div>`;
      searchResult.appendChild(div)
    })
    // hide spinner
    document.getElementById('spinner').style.display = 'none';
}

// error handle