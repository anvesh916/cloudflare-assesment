<!DOCTYPE html>
  <body>
    <h1>Anvesh Kumar Voona's Systems Assignment </h1>
    <h2>Email: anvesh.voona@gmail.com</h2>
    <p>I have created three APIs /auth/{username}, /verify and /stats, /README.txt</p>
    <p>"/auth": This endpoint to generate the JWT token based on the <username> passed in the URL as a path parameter. 
    This method also calculates the stats of how much time the token generation took and stores in a local storage</p>
    <p>"/verify": This api get the cookies from the header and verifies the token. Once the token is validated it returns the 
    username as a response. Also for this API the stats are also collected during the api request.</p>
    <p>"/stats": This endpoint returns the complete stats of all the users who have performed the JWT token generation via auth endpoint
    </p>
  </body>