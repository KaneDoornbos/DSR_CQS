$(document).ready(function() {
    // Load existing questions on page load
    loadQuestions();

    // Form submission handler
    $('#questionForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var formData = {
            category: $('#category').val(),
            question: $('#question').val(),
            answer1: $('#answer1').val(),
            answer2: $('#answer2').val(),
            answer3: $('#answer3').val(),
            answer4: $('#answer4').val(),
            answer5: $('#answer5').val(),
        };

        // AJAX post request to save data
        $.ajax({
            type: 'POST',
            url: '/add_question', // URL for adding a new question (handled by Python backend)
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                loadQuestions(); // Reload questions after adding new one
            }
        });
    });

    // Function to load existing questions from server
    function loadQuestions() {
        $.ajax({
            type: 'GET',
            url: '/get_questions', // URL for getting questions (handled by Python backend)
            success: function(questions) {
                displayQuestions(questions); // Display questions in table
            }
        });
    }

    // Function to display questions in table
    function displayQuestions(questions) {
        var tableBody = $('#questionTable tbody');
        tableBody.empty(); // Clear table body
        
        questions.forEach(function(question) {
            var row = $('<tr>');
            row.append('<td>' + question.category + '</td>');
            row.append('<td>' + question.question + '</td>');
            row.append('<td>' + question.answer1 + '</td>');
            row.append('<td>' + question.answer2 + '</td>');
            row.append('<td>' + question.answer3 + '</td>');
            row.append('<td>' + question.answer4 + '</td>');
            row.append('<td>' + question.answer5 + '</td>');

            row.append('<td><button class="btn btn-danger delete-btn" data-id="' + question.id + '">Delete</button></td>');
            tableBody.append(row);
        });
    }

    // Delete button click handler
    $('#questionTable').on('click', '.delete-btn', function() {
        var questionId = $(this).data('id');
        // AJAX post request to delete question
        $.ajax({
            type: 'POST',
            url: '/delete_question', // URL for deleting a question (handled by Python backend)
            contentType: 'application/json',
            data: JSON.stringify({ id: questionId }),
            success: function(response) {
                loadQuestions(); // Reload questions after deletion
            }
        });
    });
});
