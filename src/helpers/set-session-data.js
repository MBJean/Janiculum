const setSessionData = (request, id, email) => {
  request.session.userID = id;
  request.session.userEmail = email;
}

module.exports = setSessionData
