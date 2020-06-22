import React, { useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header/Header';
import backgroundImage from './assets/background.jpeg';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `New project ${Date.now()}`,
      owner: 'Paulo Lima'
    });

    setProjects([...projects, response.data]);
  };

  useEffect(() => {
    api.get('/projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  return (
    <>
      <Header title="Projects">
        <ul>
          {projects.map((project) => <li key={project.id}>{project.title}</li>)}
        </ul>
        <button type="button" onClick={() => handleAddProject()}>Add project</button>
      </Header>
    </>
  )
};

export default App;
