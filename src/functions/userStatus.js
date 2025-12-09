const isUserLoggedIn = () => {
  return checkTokenValidity();
};

const logOutUser = () => {
  localStorage.removeItem('userToken');
};

const loginUser = (data) => {
  const users = getUsers();
  const accounts = Array.isArray(users) ? users : [];
  const user = accounts.find(acc => acc.username === data.username && acc.password === data.password);
  if (!user) {
    return {loggedIn: false, id: null};
  }
  const token = {
    id: user.id,
    expiry: new Date().getTime() + 3600000 // 1 hour
  };
  localStorage.setItem('userToken', JSON.stringify(token));
  return {loggedIn: true, id: user.id};
};

const checkTokenValidity = () => {
  const tokenStr = localStorage.getItem('userToken');
  if (!tokenStr) {
    return { valid: false, id: null };
  }

  try {
    const token = JSON.parse(tokenStr);
    const dateNow = new Date().getTime();

    if (dateNow > token.expiry) {
      localStorage.removeItem('userToken');
      return { valid: false, id: null };
    }

    return { valid: true, id: token.id };
  } catch (err) {
    console.error("Error parsing token:", err);
    localStorage.removeItem('userToken');
    return { valid: false, id: null };
  }
};

const getUsers = () => {
  let users = localStorage.getItem('users');
  if (!users) {
    users = [
      { id: 1, username: 'mallmallson', password: 'password123' },
      { id: 2, username: 'demoUser', password: 'demoPass' },
      { id: 3, username: 'testUser', password: 'test1234' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
    return users;
  } else {
    users = JSON.parse(users);
    return users;
  }
};

export { isUserLoggedIn, logOutUser, loginUser, getUsers };