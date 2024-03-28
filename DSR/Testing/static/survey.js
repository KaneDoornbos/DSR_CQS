$(document).ready(function() {
    // Load questions for survey on page load
    loadSurveyQuestions();

    // Form submission handler
    $('#surveyForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        var formData = $(this).serializeArray(); // Serialize form data

        // Submit survey answers via AJAX
        $.ajax({
            type: 'POST',
            url: '/submit_survey',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                alert('Survey submitted successfully!');
            }
        });
    });

    // Function to load survey questions dynamically
    function loadSurveyQuestions() {
        $.ajax({
            type: 'GET',
            url: '/get_questions', // URL for getting questions (handled by Python backend)
            success: function(questions) {
                questions.forEach(function(question) {
                    
                    // Create radio buttons for each answer option
                    var questionHtml = '<div class="form-group">';
                    questionHtml += '<label>' + question.question + '</label><br>';
                    for (var i = 1; i <= 5; i++) {
                        questionHtml += '<div class="form-check form-check-inline">';
                        questionHtml += '<input class="form-check-input" type="radio" name="' + question.id + '" value="' + i + '">';
                        questionHtml += '<label class="form-check-label">' + question['answer' + i] + '</label>';
                        questionHtml += '</div>';
                    }
                    questionHtml += '</div>';
                    $('#surveyForm').append(questionHtml);
                });
            }
        });
    }
});
