$(document).ready(function() {
    // Load questions from JSON file
    $.getJSON('../data/questions.json', function(questions) {
        // Display questions
        displayQuestions(questions);
    });

    // Function to display questions
    function displayQuestions(questions) {
        var questionsDiv = $('#questions');
        questions.forEach(function(question, index) {
            var questionHtml = `
                <div class="form-group">
                    <h5>${index + 1}. ${question.question}</h5>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer${index}" value="1">
                        <label class="form-check-label">${question.answer1}</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer${index}" value="2">
                        <label class="form-check-label">${question.answer2}</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer${index}" value="3">
                        <label class="form-check-label">${question.answer3}</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer${index}" value="4">
                        <label class="form-check-label">${question.answer4}</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer${index}" value="5">
                        <label class="form-check-label">${question.answer5}</label>
                    </div>
                </div>
            `;
            questionsDiv.append(questionHtml);
        });
    }

    // Submit answers button click handler
    $('#submitAnswers').click(function() {
        var answers = {};
        // Collect answers
        $('input[type=radio]:checked').each(function() {
            var name = $(this).attr('name');
            var value = $(this).val();
            answers[name] = value;
        });
        // Save answers to JSON file (you can replace 'answers.json' with your desired filename)
        $.ajax({
            type: 'POST',
            url: '/save_answers',
            contentType: 'application/json',
            data: JSON.stringify(answers),
            success: function(response) {
                alert('Answers submitted successfully!');
                // Redirect to another page or perform any other action
            },
            error: function(xhr, status, error) {
                console.error('Error submitting answers:', error);
            }
        });
    });
});
