from flask import Flask, jsonify, request
from openai import OpenAI
import os

app = Flask(__name__)

api_key = 'your key here'
client = OpenAI(api_key = api_key)

@app.route('/generate_custom_story', methods=['POST'])
def generate_custom_story():
    try:
        # Extract story attributes from the POST request
        data = request.json
        genre = data.get('genre')
        characters = data.get('characters')
        setting = data.get('setting')

        # Construct the story prompt from user selections
        prompt = f"Write a {genre} story about {characters} in {setting}."

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a creative writer."},
                {"role": "user", "content": prompt}
            ]
        )

        story = response.choices[0].message.content
        return jsonify({"story": story})
    except Exception as e:
        app.logger.error(f'Error generating custom story: {str(e)}')
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
