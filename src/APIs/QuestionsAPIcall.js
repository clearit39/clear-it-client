import { API } from '../backend';

export const createQuestion = async (course) => {
	console.log('course', course);
	return await fetch(`${API}/createQuestion`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(course),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

export const getQuestions = async () => {
	try {
		const response = await fetch(`${API}/questions`, {
			method: 'GET',
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const deleteQuestion = async (courseId) => {
	return await fetch(`${API}/deleteQuestion/${courseId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};
