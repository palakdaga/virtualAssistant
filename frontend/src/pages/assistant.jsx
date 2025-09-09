// import React, { useState } from 'react';
// import axios from 'axios';
// function Assistant() {
//   const [input, setInput] = useState('');
//   const [message, setMessage] = useState('Ask me to navigate to a website!');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setIsLoading(true);
//     setMessage(`Processing your request...`);

//     try {
//       const response = await axios.post(`${serverUrl}/api/process-command`, {
//         text: input,
//       });

//       const { intent, data, message: responseMessage } = response.data;

//       // Act based on the clean, structured command from the server
//       if (intent === 'navigate' && data?.url) {
//         setMessage(`Okay! Navigating you to ${data.url}`);
        
//         // **SECURITY: Open the link safely to prevent "tabnabbing"**
//         // 'noopener noreferrer' is a critical security measure for opening new tabs.
//         window.open(data.url, '_blank', 'noopener,noreferrer');
        
//       } else {
//         setMessage(responseMessage || "I'm not sure how to handle that.");
//       }
//     } catch (error) {
//       console.error('Error communicating with the assistant:', error);
//       setMessage('Sorry, there was a problem connecting to the assistant.');
//     } finally {
//       setIsLoading(false);
//       setInput('');
//     }
//   };

//   return (
//     <div>
//       <h2>AI Assistant 🤖</h2>
//       <p><i>{message}</i></p>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="e.g., 'Open google.com'"
//           disabled={isLoading}
//           style={{ width: '300px', padding: '10px', marginRight: '10px' }}
//         />
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? '...' : 'Send'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Assistant;