var UserProfile = (function () {
  var userId = "";

  var getUser = function () {
    return userId; // Or pull this from cookie/localStorage
  };

  var setUser = function (id) {
    userId = id;
    // Also set this in cookie/localStorage
  };

  return {
    getUser: getUser,
    setUser: setUser,
  };
})();

export default UserProfile;
