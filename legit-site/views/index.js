export const index = (loggedInUser, posts, csrfToken) => {
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Landing Page</title>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
    }

    nav {
      background-color: #333;
      color: white;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav a {
      color: white;
      text-decoration: none;
      margin-right: 15px;
    }

    nav a:last-child {
      margin-right: 0;
    }

    .main {
      text-align: center;
      padding: 100px 20px;
    }

    .main h1 {
      font-size: 48px;
      color: #333;
    }

    .main p {
      font-size: 18px;
      color: #666;
      margin-top: 10px;
    }

    .main a {
      display: inline-block;
      margin-top: 30px;
      background-color: #333;
      color: white;
      padding: 10px 25px;
      text-decoration: none;
      border-radius: 5px;
    }
    .main .post {
      border: 1px solid;
      margin: 8px;
    }
  </style>
</head>

<body>
  <nav>
    <div class="logo">MySite</div>
    <div class="menu">
      ${loggedInUser ? `<a href="/logout">logout</a>` : `<a href="/login">login</a>`}
    </div>
  </nav>

  <div class="main">
    ${
      loggedInUser
        ? `
          <h2>Hello ${loggedInUser.name}</h2>
          <form action="/posts" method="post">
            <input name="title" placeholder="title" required />
            <input name="csrf_token" value="${csrfToken}" type="hidden" />
            <button type="submit">Create post</button>
          </form>
          ${
            posts.length
              ? `
            <div>Your posts are: </div> 
            ${posts.map((post) => `<div class="post"><p>${post.title}</p><p>Author: ${loggedInUser.name}</p></div>`)}
              
            `
              : `
              <p>You have no posts yet!</p>
            `
          }

        `
        : `
          <h1>Hello, welcome to Legit Site!</h1>
          <p>We’re glad to have you here.</p>
          <a href="/login">Go to Login</a>`
    }
  </div>
</body>

</html>
  `;
};

export const login = () => {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Landing Page</title>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
    }

    nav {
      background-color: #333;
      color: white;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav a {
      color: white;
      text-decoration: none;
      margin-right: 15px;
    }

    nav a:last-child {
      margin-right: 0;
    }

    .main {
      text-align: center;
      padding: 100px 20px;
    }

    .main h1 {
      font-size: 48px;
      color: #333;
    }

    .main p {
      font-size: 18px;
      color: #666;
      margin-top: 10px;
    }

    .main a {
      display: inline-block;
      margin-top: 30px;
      background-color: #333;
      color: white;
      padding: 10px 25px;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>

<body>
  <nav>
    <div class="logo">MySite</div>
    <div class="menu">
      <a href="/">Home</a>
      <a href="/login">Login</a>
    </div>
  </nav>

  <div class="main">
    <form action="/login" method="post">
      <div>this is a dummy representation of login</div>
      <input type="text" placeholder="username">
      <input type="text" placeholder="password">
      <button type="submit">Login</button>
      </form>
  </div>
</body>

</html>`;
};
