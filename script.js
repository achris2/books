fetch('./books.json')
    .then(res => res.json())
    .then(data => {
        // books wrapper in DOM 
        const booksWrapper = document.getElementById('books-wrapper'); 
        // loop through
        data.forEach((book) => {

            // main card container 
            
            const bookCard = document.createElement('div');
            bookCard.className = "item space-y-2" 
            
            // inner div 

            const innerDiv = document.createElement('div');
            innerDiv.className = "relative bg-slate-100 flex justify-center overflow-hidden group cursor-pointer border rounded-xl"

            // book image container 

            const img = document.createElement('img');
            img.className = "w full h-full object-cover"
            img.src = book.imageLink;
            img.alt = book.title;

            // append to main container 

            bookCard.appendChild(innerDiv);
            bookCard.appendChild(img);

            // append container to HTML 

            booksWrapper.appendChild(bookCard);


            // <div class="item space-y-2">
            // <div class="relative bg-slate-100 flex justify-center overflow-hidden group cursor-pointer border rounded-xl">
            //     <img 
            //         src="images/a-Dolls-house.jpg" 
            //         alt="a a-Dolls-house" 
            //         class="w full h-full object-cover"
            //     />
            //     <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
            //         Add to reading list
            //     </button>
            // </div>
            // <p class="text-xl">A Doll's House</p>
            // <strong>Henrik Ibsen</strong>
        })
    }); 