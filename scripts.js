$(document).ready(function() {
    console.log('script.js loaded');

       $('#contactForm').on('submit', function (e) {
        console.log("Form submission started");
        e.preventDefault();
        
        const contactData = {
            name: $('#name').val(),
            phone:  $('#phone').val(),
            email: $('#email').val(),
        };

        $.ajax({
            url: 'http://localhost:3000/contacts',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(contactData),
            success: function() {
                // After successful submission, refresh the contacts
                getContacts();
            }
            });
        });

        

    function getContacts(){
        console.log('getContacts');
        $.ajax({
            url:  'http://localhost:3000/contacts',
            type: 'GET',
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

    
    


