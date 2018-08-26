function nextId(messages) {
    // if the 'messages' array is empty, the nextId is 0
    // if the 'messages' array is not empty, the nextId is the last item's id plus 1.
    return messages.length ? messages[messages.length - 1].id + 1 : 0
  }
  
function createMessage(text, messageId) {
    return {
        id: messageId,
        userName: 'Myself',
        text: text,
        timestamp: new Date()
    };
}
  

export {nextId, createMessage}