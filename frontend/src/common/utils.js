function formatDateTime(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because January is 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function playersAmount(game) {
  return `${game.players.length}/${game.playersAmount}`;
}

function playerAlreadyQualified(ratings, playerId) {
  return ratings.some((rating) => rating.playerQualified === playerId);
}

export { formatDateTime, playersAmount, playerAlreadyQualified };
