## Project description
This project was created with create react app.

### To get started
After cloning, 
run npm install to install all the packages 
Then to open the app in the local browser, run npm start

On the site, you'll be prompted to login with github and after successful authorizatoin, 
you'll be directed to a landing page.

On the landing page, there is a search field that enables users to search for a list of repositories and users matching the search parameters
After a successful search, results (10 per page) will be displayed in categories (users and repositories).
There is a load more button at the end of the page to load more results

### To test
run yard add -D cypress @testing-library/cypress to make sure cypress is installed.

Then run node_modules/.bin/cypress open to open up the cypress testing environment, then click run 1 integration test.
