 const searchBook = () => {
	const searchField = document.getElementById('search-field')
	const searchText = searchField.value
	searchField.value = ''
	// handle empty string
	if(searchText === ""){
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
	const url = ` https://openlibrary.org/search.json?q=${searchText}`
	fetch(url)
	.then(res => res.json())
	.then(data => displayBook(data.docs))

	}
}

const displayError = () =>{
	document.getElementById('error-msg').style.display = "block"
  document.getElementById('spinner').style.display = 'none';
 	document.getElementById('book-list').innerText = '';
 	document.getElementById('search-result').textContent = '';
}

const displayBook = books => {
    // console.log(books)
    // access search result div
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';
    // hide spinner
    document.getElementById('spinner').style.display = 'none';
    // hide teams found
    document.getElementById('book-list').innerText = ''
   
   if (books?.length === 0) {
        alert("No search Result !!");
    }

    else{
    	// show books found
    document.getElementById('book-list').innerText = `Total books ${books.length}`
    document.getElementById('error-msg').style.display = "none"
   // display each books in card
    books.forEach(book => {
    	const div = document.createElement('div')
    	div.classList.add('col')
    	div.innerHTML = `
    	<div class="card h-100">
      <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid h-75">
      <div class="card-body">
        <h5 class="card-title"> <b> Title: </b>${book.title ? book.title : "N/A"}</h5>
        <p class="card-text"><b>Author Name: </b>${book.author_name ? book.author_name[0]: "N/A"}</p>
        <p class="card-text"><b>First Publish Year:</b> ${book.first_publish_year}</p>
        <p class="card-text"><b> Publisher: </b>${book.publisher ? book.publisher[0]: "N/A"}</p>
      </div>
       <div class="card-footer">
      </div>
    </div>`;
      searchResult.appendChild(div)
    })
    // hide spinner
    document.getElementById('spinner').style.display = 'none';
}
    }