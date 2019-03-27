class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    AddBookToList(book) {
        const List = document.getElementById('book-list');
        //Create Tr
        const row = document.createElement('tr');
        //Insert cols
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class = "delete">X</a></td>
    `;
        List.appendChild(row);
    }
    showAlert(message, className) {
        //Create Div
        const div = document.createElement('div');
        //Add Classes
        div.className = `alert ${className}`;
        //Add text
        div.appendChild(document.createTextNode(message));
        //Get Parent
        const container = document.querySelector('.Container');
        //Get Form
        const form = document.querySelector('#book-form');
        // Insert Alert
        container.insertBefore(div, form);
        //Timeout
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    deletebook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//Event Listner for Add Book

document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // Get From Value
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value

        //Instantiate Book
        const book = new Book(title, author, isbn);

        //Instantiate UI
        const ui = new UI();
        //Validate
        if (title === '' || author === '' || isbn === '') {
            //Error Alert
            ui.showAlert('Please Enter all the Fields', 'Error');

        } else {
            //Add Book to List
            ui.AddBookToList(book);

            //Show succes
            ui.showAlert('Book Added!', 'Success');

            // ClearField
            ui.clearFields();
        }

        e.preventDefault();
    });
// Event Listner for Delete
document.getElementById('book-list').addEventListener('click', function (e) {


    //Instantiate UI
    const ui = new UI();

    ui.deletebook(e.target);
    // Show Alert
    ui.showAlert('Book Removed!', 'Success');

    e.preventDefault();
});