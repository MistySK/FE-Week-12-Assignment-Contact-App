$(document).ready(function() {
    getContacts();

       $('#contactForm').on('submit', function (e) {
        console.log("Form submission started");
        e.preventDefault();
        
        // The contactData object contains the data for a new contact.
        const contactData = {
            name: $('#name').val(),
            phone:  $('#phone').val(),
            email: $('#email').val(),
        };

        console.log("Contact data", contactData);

        // Call createContact function to create a new contact
        createContact(contactData);
    });

    function createContact(contactData) {
        console.log('createContact');
        $.ajax({
            url: 'http://localhost:3000/contacts',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(contactData),
            success: function() {
                // After submission, refresh the contacts
                getContacts();
            },
            // The error callback function is called when the AJAX call fails.
            // It logs the error to the console.
                error: function(xhr, status, error) {
                console.error("Error:", error);
            }
        });
    }
       

    // The getContacts function retrieves a list of contacts from the server
    // and displays them in the contact table.    
    function getContacts() {
        console.log('getContacts');
        // The AJAX call retrieves a list of contacts from the server.
        $.ajax({
            url:  'http://localhost:3000/contacts',
            type: 'GET',
            // The success callback function is called when the AJAX call is successful.
            // It updates the contact table with the new list of contacts.
            success:function(data){
                $('#contactTable').empty();

                $.each(data,function(index, contact){
                    $('#contactTable').append(`
                    <tr>
                        <th scope="row">${contact.id}</th>
                        <td>${contact.name}</td>
                        <td>${contact.phone}</td>
                        <td>${contact.email}</td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${contact.id}">Delete</button>
                        </td>    
                    </tr>
                    `);
                });
            }
        });
    }
});

    
    


