from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__, static_url_path='/static')

# Load questions from JSON file
with open('./data/questions.json', 'r') as file:
    questions = json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/questions')
def questions_index():
    return render_template('questions.html')

@app.route('/survey')
def survey_index():
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

    # Load questions from JSON file (you may need to modify this based on your file structure)
    with open('./data/questions.json', 'r') as file:
        questions = json.load(file)
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

@app.route('/submit_survey', methods=['POST'])
def submit_survey():
    data = request.get_json()
    
    # Process survey answers and save them to a separate JSON file
    with open('./data/survey_answers.json', 'a') as file:
        json.dump(data, file)
    return jsonify({'message': 'Survey submitted successfully'})

if __name__ == '__main__':
    app.run(debug=True)

