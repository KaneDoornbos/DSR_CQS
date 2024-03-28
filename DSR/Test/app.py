from flask import Flask, render_template, request, jsonify
import json


app = Flask(__name__, static_url_path='/static')

# Load questions from JSON file
with open('./data/questions.json', 'r') as file:
    questions = json.load(file)


@app.route('/')
def index():
    return render_template('answers.html')

@app.route('/get_questions', methods=['GET'])
def get_questions():
    return jsonify(questions)

@app.route('/save_answers', methods=['POST'])
def save_answers():
    data = request.get_json()
    
    # Handle saving answers to a separate JSON file or database
    print(data)
    return jsonify({'message': 'Answers saved successfully'})

@app.route('/edit_question/<int:id>', methods=['PUT'])
def edit_question(id):
    data = request.get_json()
    for question in questions:
        if question['id'] == id:
            question.update(data)  # Update the question data
            break
    return jsonify({'message': 'Question updated successfully'})

@app.route('/delete_question/<int:id>', methods=['DELETE'])
def delete_question(id):
    for question in questions:
        if question['id'] == id:
            questions.remove(question)  # Remove the question
            break
    return jsonify({'message': 'Question deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)