# Cron Expression Parser API

A simple API to parse cron expressions and display their components.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone this repository:

   ```bash
   git clone https://github.com/kachwalUttamsharma/cron-expression-parser
   ```

2. Navigate to the project directory:

   ```bash
   cd cron-expression-parser
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Run the application with the following command:

```bash
npm run start
```

2. Run the test cases with the following command:

```bash
npm run test
```

# API Endpoints

- Import the Post man Collection, start the local server and make a post request call to the local server using below json data as request body.

```bash
    `{"cronString": "*/16 0 1,15 * 1-5 /usr/bin/find"}`
```

- Response Would be returned in HTML format

```
| Field         | Values                       |
|---------------|------------------------------|
| minute        | 0 16 32 48                   |
| hour          | 0                            |
| day of month  | 1 15                         |
| month         | 1 2 3 4 5 6 7 8 9 10 11 12  |
| day of week   | 1 2 3 4 5                    |
| command       | /usr/bin/find                |

```

- **Curl Command:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"expression": "*/15 0 1,15 * 1-5"}' http://localhost:3000/parse-cron
```
