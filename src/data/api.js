import axios from 'axios';

export const fetchQuestions = async () => {
  try {
    const response = await axios.get('https://sentence-builder-game-2.onrender.com/questions');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};
