
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
	else {
		document.getElementById("noo_book").style.display = "flex";
	}

}

function not_found() {
	
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
		if (!book.volumeInfo.title) {
		} else {
			titles.push(book.volumeInfo.title);
		}
		if (!book.volumeInfo.authors) {
		} else {
			authors.push(book.volumeInfo.authors[0]);
		}
		if (!book.volumeInfo.description) {
		} else {
			descriptions.push(book.volumeInfo.description.split(" ").slice(0,30).join(" "));
		}
		if (!book.volumeInfo.imageLinks) {
		} else {
			coverImage.push(book.volumeInfo.imageLinks["smallThumbnail"]);
		}
		
	}
	console.log(bookList);
	createImages(titles, authors, descriptions, coverImage, 0);
	if (typeof bookList == undefined) {
		alert("jghf");
	}
	else {
		document.getElementById("book").style.display = "initial";
	}

	
}

function changeNav() {
	var l = document.getElementById('search-text');
	l.style.display = "none";

	document.getElementById('h').style.display = "none";
	var home = document.getElementById('home-head');
	home.style.display = "block";


	var k = document.getElementById('landing');
	k.style.flexDirection = "row";

	document.getElementById('return').style.marginTop = "45px";
	

	
}
function keep() {
	var cur_img = document.getElementById('getImage');
	var get_cur_img = cur_img.getElementsByTagName('img')[0];
	var imageC = get_cur_img.src;
	
	var titleC = document.getElementById('book-title').textContent;
	var authorC = document.getElementById('book-author').textContent;
	var descriptionC = document.getElementById('book-description').textContent;
	console.log(descriptionC);
	off();
	changeNav();

	var tileDisplay = document.getElementById('bookDisplay');
	tileDisplay.style.backgroundColor = "#d3d3d3";

	var first_row = tileDisplay.firstElementChild; 
	var second_row = first_row.nextElementSibling;
	var third_row = second_row.nextElementSibling;
	if (first_row.childElementCount < 3) {
		//Create Each Tile

		var new_tile = document.createElement('div');
		new_tile.className = "new-tile";
		first_row.appendChild(new_tile);

		//Create Container To Split Left and Right
		var center_image = document.createElement('div');
		center_image.className = "center-image";
		new_tile.appendChild(center_image);
		//Create Image For Left Side
		var left = document.createElement('div');
		left.className = "left";
		center_image.appendChild(left);
		var image = document.createElement('img');
		left.appendChild(image);
		image.src = imageC;
		
		//Create Right Side 
		var right = document.createElement('div');
		right.className = "right";
		center_image.appendChild(right);

		
		var b = document.createElement('button');
		b.textContent = "x";
		b.onclick = function() {
			new_tile.remove();
		}
		var but = document.createElement('div');
		but.className = "exit-button";
		but.appendChild(b)
		right.appendChild(but)


		var title = document.createElement('div');
		title.className = 'title';
		title.textContent = titleC;
		right.appendChild(title);

		var author = document.createElement('div');
		author.className = 'author';
		author.textContent = authorC;
		right.appendChild(author);

		var description = document.createElement('div');
		description.className = 'description';
		description.textContent = descriptionC;
		right.appendChild(description);
	}


	else if (second_row.childElementCount < 3) {
		var new_tile = document.createElement('div');
		new_tile.className = "new-tile";
		second_row.appendChild(new_tile);

		//Create Container To Split Left and Right
		var center_image = document.createElement('div');
		center_image.className = "center-image";
		new_tile.appendChild(center_image);
		//Create Image For Left Side
		var left = document.createElement('div');
		left.className = "left";
		center_image.appendChild(left);
		var image = document.createElement('img');
		left.appendChild(image);
		image.src = imageC;
		
		//Create Right Side 
		var right = document.createElement('div');
		right.className = "right";
		center_image.appendChild(right);

		var b = document.createElement('button');
		b.textContent = "x";
		b.onclick = function() {
			new_tile.remove();
		}
		var but = document.createElement('div');
		but.className = "exit-button";
		but.appendChild(b)
		right.appendChild(but)

		var title = document.createElement('div');
		title.className = 'title';
		title.textContent = titleC;
		right.appendChild(title);

		var author = document.createElement('div');
		author.className = 'author';
		author.textContent = authorC;
		right.appendChild(author);

		var description = document.createElement('div');
		description.className = 'description';
		description.textContent = descriptionC;
		right.appendChild(description);
	}
	else if (third_row.childElementCount < 3) {
		var new_tile = document.createElement('div');
		new_tile.className = "new-tile";
		third_row.appendChild(new_tile);
		//Create Container To Split Left and Right
		var center_image = document.createElement('div');
		center_image.className = "center-image";
		new_tile.appendChild(center_image);
		//Create Image For Left Side
		var left = document.createElement('div');
		left.className = "left";
		center_image.appendChild(left);
		var image = document.createElement('img');
		left.appendChild(image);
		image.src = imageC;
		
		//Create Right Side 
		var right = document.createElement('div');
		right.className = "right";
		center_image.appendChild(right);


		var b = document.createElement('button');
		b.textContent = "x";
		b.onclick = function() {
			new_tile.remove();
		}
		var but = document.createElement('div');
		but.className = "exit-button";
		but.appendChild(b)
		right.appendChild(but)

		var title = document.createElement('div');
		title.className = 'title';
		title.textContent = titleC;
		right.appendChild(title);

		var author = document.createElement('div');
		author.className = 'author';
		author.textContent = authorC;
		right.appendChild(author);

		var description = document.createElement('div');
		description.className = 'description';
		description.textContent = descriptionC;
		right.appendChild(description);
	} 
	else {
		alert("over");
	}

	
}
function createImages(titles, authors, descriptions, coverImage, current) {
	var currentImage = document.getElementById('getImage');
	var getCurrentImage = currentImage.getElementsByTagName('img')[0];
	getCurrentImage.src = coverImage[current];
	

	var currentTitle = document.getElementById('book-title');
	currentTitle.textContent = titles[current];

	var currentAuthor = document.getElementById('book-author');
	currentAuthor.textContent = authors[current];

	var currentDescription = document.getElementById('book-description');
	currentDescription.textContent = descriptions[current];

	document.getElementById('rightbtn').addEventListener("click", function() {
		if (current < titles.length-1) {
			forwards(titles, authors, descriptions, coverImage, ++current);
			document.getElementById('leftbtn').style.display = "block";
			
		} else if (current == titles.length -1){
			document.getElementById('rightbtn').style.display = "none";
		}
		
	});

	document.getElementById('leftbtn').addEventListener("click", function() {
		if (current > 0) {
			backwards(titles, authors, descriptions, coverImage, --current);
			document.getElementById('rightbtn').style.display = "block";

		} else if (current <= 0){
			document.getElementById('leftbtn').style.display = "none";
		}
		
	});


	/* document.getElementById('keep').addEventListener("click", function() {
		off();
		console.log("hi");
		*/
		/*
		var tileDisplay = document.getElementById('bookDisplay');
		tileDisplay.style.backgroundColor = "#d3d3d3";

		var first_row = tileDisplay.firstElementChild; 
		var second_row = first_row.nextElementSibling;
		var third_row = second_row.nextElementSibling;
		console.log(second_row);
		*/

		/* if (first_row.childElementCount < 3) {
			//Create Each Tile
	
			var new_tile = document.createElement('div');
			new_tile.className = "new-tile";
			first_row.appendChild(new_tile);

			//Create Container To Split Left and Right
			var center_image = document.createElement('div');
			center_image.className = "center-image";
			new_tile.appendChild(center_image);
			//Create Image For Left Side
			var left = document.createElement('div');
		    left.className = "left";
		    center_image.appendChild(left);
		    var image = document.createElement('img');
		    left.appendChild(image);
			image.src = coverImage[current];
			
			//Create Right Side 
			var right = document.createElement('div');
			right.className = "right";
			center_image.appendChild(right);

			var title = document.createElement('div');
			title.className = 'title';
			title.textContent = currentTitle.textContent;
			right.appendChild(title);

			var author = document.createElement('div');
			author.className = 'author';
			author.textContent = currentAuthor.textContent;
			right.appendChild(author);

			var description = document.createElement('div');
			description.className = 'description';
			description.textContent = currentDescription.textContent;
			right.appendChild(description);

		}
		else if (second_row.childElementCount <= 3) {
			var new_tile = document.createElement('div');
			new_tile.className = "new-tile";
			second_row.appendChild(new_tile);

			//Create Container To Split Left and Right
			var center_image = document.createElement('div');
			center_image.className = "center-image";
			new_tile.appendChild(center_image);
			//Create Image For Left Side
			var left = document.createElement('div');
		    left.className = "left";
		    center_image.appendChild(left);
		    var image = document.createElement('img');
		    left.appendChild(image);
			image.src = coverImage[current];
			
			//Create Right Side 
			var right = document.createElement('div');
			right.className = "right";
			center_image.appendChild(right);

			var title = document.createElement('div');
			title.className = 'title';
			title.textContent = currentTitle.textContent;
			right.appendChild(title);

			var author = document.createElement('div');
			author.className = 'author';
			author.textContent = currentAuthor.textContent;
			right.appendChild(author);

			var description = document.createElement('div');
			description.className = 'description';
			description.textContent = currentDescription.textContent;
			right.appendChild(description);
		}
		else if (third_row.childElementCount <= 3) {
			var new_tile = document.createElement('div');
			new_tile.className = "new-tile";
			third_row.appendChild(new_tile);
			//Create Container To Split Left and Right
			var center_image = document.createElement('div');
			center_image.className = "center-image";
			new_tile.appendChild(center_image);
			//Create Image For Left Side
			var left = document.createElement('div');
		    left.className = "left";
		    center_image.appendChild(left);
		    var image = document.createElement('img');
		    left.appendChild(image);
			image.src = coverImage[current];
			
			//Create Right Side 
			var right = document.createElement('div');
			right.className = "right";
			center_image.appendChild(right);

			var title = document.createElement('div');
			title.className = 'title';
			title.textContent = currentTitle.textContent;
			right.appendChild(title);

			var author = document.createElement('div');
			author.className = 'author';
			author.textContent = currentAuthor.textContent;
			right.appendChild(author);

			var description = document.createElement('div');
			description.className = 'description';
			description.textContent = currentDescription.textContent;
			right.appendChild(description);
		} 
		else {
			alert("over");
		}
		
	});
*/

}

function forwards(titles, authors, descriptions, coverImage, current){
	if (current != titles.length-1) {
		document.getElementById('rightbtn').style.display = "block";
	}
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

function backwards(titles, authors, descriptions, coverImage, current) {
	if (current != 0) {
		document.getElementById('leftbtn').style.display = "block";
	}
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

