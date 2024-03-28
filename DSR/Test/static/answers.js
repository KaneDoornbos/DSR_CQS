$(document).ready(function() {
    
    // Load questions from JSON file
    $.getJSON('/get_questions', function(questions) {
        questions.forEach(function(question, index) {
            var questionHtml = `
                <div class="form-group">
                    <p>${question.question}</p>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer_${index}" value="1">
                        <label class="form-check-label" for="answer_${index}_1">${question.answer1}</label>
                    </div>
                    <!-- Repeat for answer 2-5 -->
                    <button class="btn btn-primary edit-btn" data-id="${question.id}">Edit</button>
                    <button class="btn btn-danger delete-btn" data-id="${question.id}">Delete</button>
                </div>
            `;
            $('#answerForm').append(questionHtml);
        });
    });

    // Form submission handler
    $('#answerForm').submit(function(event) {
        event.preventDefault();
        var answers = {};
        // Collect answers from the form
        $('input[type="radio"]:checked').each(function() {
            var questionIndex = $(this).attr('name').split('_')[1];
            var answer = $(this).val();
            answers[questionIndex] = answer;
        });

        // Send answers to the server
        $.ajax({
            type: 'POST',
            url: '/save_answers',
            contentType: 'application/json',
            data: JSON.stringify(answers),
            success: function(response) {
                console.log(response);
                // Handle success, e.g., show a success message
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                // Handle error, e.g., show an error message
            }
        });
    });

    // Edit button click handler
    $('#answerForm').on('click', '.edit-btn', function() {
        var questionId = $(this).data('id');

        // You can implement your edit functionality here
        console.log('Edit question with ID:', questionId);
    });

    // Delete button click handler
    $('#answerForm').on('click', '.delete-btn', function() {
        var questionId = $(this).data('id');

        // Send request to delete question
        $.ajax({
            type: 'DELETE',
            url: '/delete_question/' + questionId,
            success: function(response) {
                console.log(response);

                // Remove question from UI if deletion is successful
                $(this).closest('.form-group').remove();
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                // Handle error, e.g., show an error message
            }
        });
    });
});
