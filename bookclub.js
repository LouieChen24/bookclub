
/* Called when the user pushes the "submit" button */
/* Sends a request to the API using the JSONp protocol */
function newRequest() {
	on();

	var title = document.getElementById("title").value;
	title = title.trim();
	title = title.replace(" ","+");

	var author = document.getElementById("author").value;
	author = author.trim();
	author = author.replace(" ","+");

	var isbn = document.getElementById("isbn").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");

	// Connects possible query parts with pluses
	var query = ["",title,author,isbn].reduce(fancyJoin);

	// The JSONp part.  Query is executed by appending a request for a new
	// Javascript library to the DOM.  It's URL is the URL for the query. 
	// The library returned just calls the callback function we specify, with
	// the JSON data we want as an argument. 
	if (query != "") {

		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback	
		script.id = "jsonpCall";

		// put new script into DOM at bottom of body
		document.body.appendChild(script);	
		}

}

function on() {
	document.getElementById("overlay").style.display = "block";
}

function off() {
	document.getElementById("overlay").style.display = "none";
}

/* Used above, for joining possibly empty strings with pluses */
function fancyJoin(a,b) {
    if (a == "") { return b; }	
    else if (b == "") { return a; }
    else { return a+"+"+b; }
}


/* The callback function, which gets run when the API returns the result of our query */
/* Replace with your code! */
function handleResponse(bookListObj) {
	var bookList = bookListObj.items;

	/* where to put the data on the Web page */ 
	var bookDisplay = document.getElementById("bookDisplay");
	var titles = [];
	var authors = [];
	var descriptions = []; 
	var coverImage = [];

	/* write each title as a new paragraph */
	for (i=0; i<bookList.length; i++) {
		var book = bookList[i];
		titles.push(book.volumeInfo.title);
		authors.push(book.volumeInfo.authors[0]);
		descriptions.push(book.volumeInfo.description.split(" ").slice(0,30).join(" "));
		coverImage.push(book.volumeInfo.imageLinks["smallThumbnail"]);
	}

	var current = 0;

	var currentImage = document.getElementById('getImage');
	var getCurrentImage = currentImage.getElementsByTagName('img')[0];
	getCurrentImage.src = coverImage[current];

	var currentTitle = document.getElementById('book-title');
	currentTitle.textContent = titles[current];

	var currentAuthor = document.getElementById('book-author');
	currentAuthor.textContent = authors[current];

	var currentDescription = document.getElementById('book-description');
	currentDescription.textContent = descriptions[current];



	
}


