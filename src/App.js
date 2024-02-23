import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import React, { useState } from "react";
import axios from 'axios';

function AddUpdateForm() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`Sending data...`); // Log before the request

    try {
      const response = await axios.post('/api/add', { text: inputValue });

      if (!response.ok) {
        console.error('Error:', response.status, response.data);
        return;
      }

      console.log('Data added successfully');
      setInputValue(''); // Clear input on success
      // Display success message to the user
    } catch (error) {
      console.error('Error adding data:', error);
      // Handle errors gracefully
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

// ... rest of your App component code

function App() {
  const [verticalSizes, setVerticalSizes] = useState([100, '30%', 'auto']);
  const [horizontalSizes, setHorizontalSizes] = useState([100, '50%']);
  //const [data, setData] = useState(['', '', '']); // Placeholder data (optional)

  const handleSubmit = (inputValue) => {
    // This function might not be relevant if you're only submitting data to the API
  };

  const layoutCSS = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column', // Vertically align children
  };

  const paneCSS = {
    flex: 1, // Distribute available space evenly among panes
    display: 'flex',
    alignItems: 'center', // Vertically center the content
    justifyContent: 'center', // Horizontally center the content
    background: '#ddd',
  };

  const centeredContentStyle = {
    ...paneCSS,
    background: '#d5d7d9',
  };

  return (
    <div style={{ height: '100vh', ...layoutCSS }}>
      <SplitPane split="horizontal" sizes={verticalSizes} onChange={setVerticalSizes}>
        <SplitPane split="vertical" sizes={horizontalSizes} onChange={setHorizontalSizes}>
          <Pane>
            <AddUpdateForm handleSubmit={handleSubmit} />
          </Pane>
          <Pane style={centeredContentStyle}>
            <AddUpdateForm handleSubmit={handleSubmit} />
          </Pane>
        </SplitPane>
        <Pane style={centeredContentStyle}>
          <AddUpdateForm handleSubmit={handleSubmit} />
        </Pane>
      </SplitPane>
    </div>
  );
}

export default App;