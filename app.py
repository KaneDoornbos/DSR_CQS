from flask import Flask, render_template, request, jsonify
import json


app = Flask(__name__, static_url_path='/static')

# Mock data storage (replace with database or actual data storage)
questions = []

@app.route('/')
def index():
    return render_template('survey.html')

@app.route('/add_question', methods=['POST'])
def add_question():
    data = request.get_json()
    questions.append(data) # Add question to list
    
    # Save questions to JSON file (you can replace 'questions.json' with your desired filename)
    with open('./data/questions.json', 'w') as file:
        json.dump(questions, file)
    return jsonify({'message': 'Question added successfully'})

@app.route('/get_questions', methods=['GET'])
def get_questions():
    return jsonify(questions)

@app.route('/delete_question', methods=['POST'])
def delete_question():
    data = request.get_json()
    question_id = data.get('id')
    for question in questions:
        if question.get('id') == question_id:
            questions.remove(question)
            break
    # Save updated questions to JSON file
    with open('./data/questions.json', 'w') as file:
        json.dump(questions, file)
    return jsonify({'message': 'Question deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)

# Questionaire
# Load questions from JSON file
with open('./data/questions.json', 'r') as file:
    questions = json.load(file)

# Endpoint to serve the HTML page
@app.route('/')
def index():
    return render_template('survey.html', questions=questions)

# Endpoint to handle logging user answers
@app.route('/log_answers', methods=['POST'])
def log_answers():
    data = request.get_json()
    with open('./data/answers.json', 'a') as file:
        json.dump(data, file)
        file.write('\n')
    return jsonify({'message': 'Answers logged successfully'})

if __name__ == '__main__':
    app.run(debug=True)