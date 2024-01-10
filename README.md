# Zamazon Web Service

Welcome to Web Service! This service is designed to consolidate contact information across multiple purchases for a unique user experience.

## Table of Contents

- [Requirements](#requirements)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)


## Requirements

Key requirements include:

- Handling primary and secondary contacts.
- Creating new entries for discreet individuals.
- A covert mechanism for creating "secondary" contact entries.
- Seamless updates with each incoming request.


## Technologies-Used

- Node.js
- Express.js
- Sequelize (PostgreSQL)
- Jest (for testing)

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/zamazon-contact-consolidation.git



2. **Install Dependencies:**

  ```bash
  cd zamazon-contact-consolidation
  npm install
  ```
  This installs the required dependencies for the project.




3. **Database Setup:**

Ensure you have PostgreSQL installed and running.
Create a database named Zamazondb or update the config/development.json file with your database details.


4. **Environment Variables:**

Create a .env file in the root directory with the following content:

  ```plaintext
    DATABASE_URL=your_database_url
  ```
    Run Migrations:
    
  ```bash
    npx sequelize-cli db:migrate
  ```



## Usage

Start the Zamazon Web Service:

  ```bash
    npm start
    The service will run on http://localhost:3000.
  ```


5. **Identify Endpoint**

- Send a POST request to http://localhost:3000/identify with a JSON payload containing "email" and "phoneNumber" fields.

- Example Payload:

```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
```


## Testing

Run unit tests to ensure the functionality of the service:

```bash
npm test
```

For more covert testing, consider additional test scenarios and edge cases.

