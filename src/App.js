import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import React, { useState } from "react";
import axios from 'axios';

// Function component for adding or updating data
function AddUpdateForm() {
  // State variables for input value, heading, and count
  const [inputValue, setInputValue] = useState('');
  const [heading, setHeading] = useState('');
  const [count, setCount] = useState(0);

  // Function to handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to handle adding data
  const handleAdd = async (e) => {
    e.preventDefault();
    setHeading(inputValue);
    setCount(count+1);

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

  // Function to handle updating data
  const handleUpdate = async (e) => {
    e.preventDefault();
    setHeading(inputValue);
    setCount(count+1);

    console.log(`Sending data...`); // Log before the request

    try {
      const response = await axios.patch('/api/update', { text: inputValue });

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

  // JSX for the form component
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h1>{heading}</h1>
      <p>Count: {count}</p>
      <input type="text" value={inputValue} onChange={handleChange} />
      <form onSubmit={handleAdd}>
        <button type="submit" >Add</button>
      </form>
      <form onSubmit={handleUpdate}>
        <button type="submit" >Update</button>
      </form>
    </div>
  );
}

// Main App component
function App() {
  // State variables for sizes of split panes
  const [verticalSizes, setVerticalSizes] = useState([100, '30%', 'auto']);
  const [horizontalSizes, setHorizontalSizes] = useState([100, '50%']);

  // Function to handle form submission (currently unused)
  const handleSubmit = (inputValue) => {
    // This function might not be relevant if you're only submitting data to the API
  };

  // Inline styles for layout and panes
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

  // Styles for different pane contents
  const centeredContentStyle = {
    ...paneCSS,
    background: '#79c2d0',
  };

  const bottomContentStyle = {
    ...paneCSS,
    background: '#407088 ',
  };

  // JSX for the App component
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
        <Pane style={bottomContentStyle}>
          <AddUpdateForm handleSubmit={handleSubmit} />
        </Pane>
      </SplitPane>
    </div>
  );
}

export default App;
