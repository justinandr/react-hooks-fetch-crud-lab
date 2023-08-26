import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [])

  function handleAddQuestion(newQuestion){

    const formattedQuestion = {
      prompt: newQuestion.prompt,
      answers: [newQuestion.answer1, newQuestion.answer2, newQuestion.answer3, newQuestion.answer4],
      correctIndex: newQuestion.correctIndex
    }

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedQuestion)
    })
    .then(res => res.json())
    .then(() => setQuestions([...questions, formattedQuestion]))
  }

  function handleDeleteQuestion(deletedQuestion){
    fetch(`http://localhost:4000/questions/${deletedQuestion.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id)
      setQuestions(updatedQuestions)
    })

  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} />}
    </main>
  );
}

export default App; 