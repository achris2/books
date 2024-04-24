// DOM Elements
const booksWrapper = document.getElementById('books-wrapper'); 
const checkbox = document.querySelectorAll('.check');
const filterContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const listCounter = document.getElementById('list-counter');


fetch('./books.json')
    .then(res => res.json())
    .then(data => {
        // loop through
        data.forEach((book) => {

            // main card container 
            const bookCard = document.createElement('div');
            bookCard.className = "item space-y-2 bg-slate-900 rounded px-4 py-4" 
            
            // inner div 

            const innerDiv = document.createElement('div');
            innerDiv.className = "relative bg-slate-500 flex justify-center overflow-hidden group cursor-pointer border rounded-xl"

            // book image container 

            const img = document.createElement('img');
            img.className = "w full h-full object-cover sm:min-h-40 sm:min-w-10 md:min-h-40 md:min-w-10  lg:min-h-40 lg:min-w-10"
            img.src = book.imageLink;
            img.alt = book.title;

            // add to reading list button 

            const button = document.createElement('button');
            button.className = "status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
            button.textContent = "Add to reading list";

            // book title

            const bookTitle = document.createElement('h2');
            bookTitle.className = "text-xl font-bold text-center";
            bookTitle.textContent = book.title;

            // book author 
            const bookAuthor = document.createElement('h3');
            bookAuthor.className = "text-md font-bold text-center";
            bookAuthor.textContent = book.author;

            // other book details
            const bookDetails = document.createElement('p');
            bookDetails.className = "text-sm text-center";
            bookDetails.textContent = book.year + " in " + book.language; 

            // append to inner div 
            innerDiv.appendChild(img);
            innerDiv.appendChild(button);

            // append to children to card container 

            bookCard.appendChild(innerDiv);
            bookCard.appendChild(bookTitle);
            bookCard.appendChild(bookAuthor);
            bookCard.appendChild(bookDetails);

            // append card container to HTML 

            booksWrapper.appendChild(bookCard);
        })
    }); 