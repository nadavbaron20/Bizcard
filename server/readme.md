# beckend Api By Nadav

## Description

beckend api by nadav is a Node.js application skeleton for handling card-related API operations. It provides a basic setup with Express and Mongoose for managing and interacting with card data.

## Features 
- **Express**: Web framework for Node.js 
- **Mongoose**: MongoDB object modeling 
- **JWT**: JSON Web Token authentication 
- **Joi**: Data validation 
- **bcryptjs**: Password hashing 
- **cors**: Cross-Origin Resource Sharing 
- **cookie-parser**: Middleware to parse cookies 
- **dotenv**: Environment variable management 
- **morgan**: HTTP request logger
- **chalk**: Colorful terminal output
- **figlet**: ASCII art text,

## API Documentation 

- **[Authentication API](https://documenter.getpostman.com/view/36490845/2sA3kXF1Ui)**: Comprehensive documentation for authentication endpoints. 
**baseurl** http://127.0.0.1.3000/api/auth
POST-register - baseurl/
POST-login - baseurl/
GET-get only login profile - baseurl/

- **[Card API](https://documenter.getpostman.com/view/36490845/2sA3kXF1Km)**: Comprehensive documentation for authentication endpoints. 
**baseurl** http://127.0.0.1.3000/api/cards
GET-get all cards- baseurl/
GET-get card by id- baseurl/:id
POST-search card by letter -baseurl/
POST-create new card- baseurl/
DELETE-delete card by id- baseurl/:id
PATCH-update card by id- baseurl/:id

- **[User API](https://documenter.getpostman.com/view/36490845/2sA3kXF1Z6)**: Detailed information about user-related endpoints.
**baseurl** http://127.0.0.1.3000/api/users
GET-get all cards only admin user login- baseurl/
GET-get card by id only login user- baseurl/:id
DELETE-delete card by id only admin user login- baseurl/:id
PATCH-update card by id only login user- baseurl/:id


## Installation

**Install backend dependencies:** ```bash npm install ```

**To run unitial data base:** ```node seed.js```

**Start the backend server in development mode:** ```bash npm run dev ```

## License This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details. 

## Contact For questions or support, please contact [nadavb@iscar.co.il](mailto:nadavb@iscar.co.il).