import axios from 'axios';

export const fetchQuestions = async () => {
  try {
    const response = await axios.get('http://localhost:5000/questions');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return []; // Return empty array in case of error
  }
};
