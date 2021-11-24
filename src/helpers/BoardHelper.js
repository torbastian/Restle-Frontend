//BOARD
export function createBoard(ws, boardDetails) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'NEW_BOARD',
      details: boardDetails
    }));
  }
}

export function deleteBoard(ws, boardId) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'DELETE_BOARD',
      boardId: boardId
    }));
  }
}

export function updateBoard(ws, boardId, boardDetails) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'UPDATE_BOARD',
      boardId: boardId,
      details: boardDetails
    }));
  }
}

export function inviteToBoard(ws, boardId, userId) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'INVITE_BOARD_MEMBER',
      boardId: boardId,
      userId: userId
    }));
  }
}

export function RemoveFromBoard(ws, boardId, users) {
  console.log('Remove members', users);
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'REMOVE_BOARD_MEMBER',
      boardId: boardId,
      users: users
    }));
  }
}

export function TransferOwnership(ws, boardId, userId) {
  console.log(userId);
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'TRANSFER_BOARD_OWNERSHIP',
      boardId: boardId,
      userId: userId
    }));
  }
}

export function LeaveBoard(ws, boardId) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'LEAVE_BOARD',
      boardId: boardId
    }));
  }
}

// LISTS
export function moveList(ws, boardId, listToMove, destination) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'MOVE_LIST',
      boardId: boardId,
      listId: listToMove,
      newIndex: destination
    }));
  }
}

export function createNewList(ws, boardId, newListDetails) {
  if (ws.current.readyState === WebSocket.OPEN) {
    console.log('New List');
    ws.current.send(JSON.stringify({
      request: 'NEW_LIST',
      boardId: boardId,
      details: newListDetails
    }));
  }
}

export function deleteList(ws, boardId, listId) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'DELETE_LIST',
      boardId: boardId,
      listId: listId
    }));
  }
}

export function updateList(ws, boardId, listId, listDetails) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'UPDATE_LIST',
      boardId: boardId,
      listId: listId,
      details: listDetails
    }));
  }
}

// CARDS
export function createNewCard(ws, newCardDetails, boardId, listId) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'NEW_CARD',
      listId: listId,
      boardId: boardId,
      details: newCardDetails
    }));
  }
}

export function moveCard(ws, boardId, cardToMove, oldList, newList, destinationIndex) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'MOVE_CARD',
      boardId: boardId,
      cardId: cardToMove,
      oldList: oldList,
      newList: newList,
      destinationIndex: destinationIndex
    }));
  }
}

export function deleteCard(ws, boardId, cardId) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'DELETE_CARD',
      boardId: boardId,
      cardId: cardId
    }));
  }
}

export function updateCard(ws, boardId, cardId, cardDetails) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'UPDATE_CARD',
      boardId: boardId,
      cardId: cardId,
      details: cardDetails
    }));
  }
}

export function inviteToCard(ws, boardId, cardId, members) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'INVITE_CARD_MEMBER',
      boardId: boardId,
      cardId: cardId,
      members: members
    }));
  }
}

export function removeFromCard(ws, boardId, cardId, members) {
  if (ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(JSON.stringify({
      request: 'REMOVE_CARD_MEMBER',
      boardId: boardId,
      cardId: cardId,
      members: members
    }));
  }
}