import React from 'react';

const InputField = ({ message, setMessage, sendMessage }) => {
    return (
        <form onSubmit={sendMessage}>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message..." 
            />
            <button type="submit">Send</button>
        </form>
    );
}

export default InputField;
