import React from 'react';

const MessageContainer = ({ messageList, user }) => {
    return (
        <div>
            {messageList.map((msg, index) => (
                <div key={index}>
                    <strong>{msg.user === user.id ? 'You' : msg.user}</strong>: {msg.text}
                </div>
            ))}
        </div>
    );
}

export default MessageContainer;
