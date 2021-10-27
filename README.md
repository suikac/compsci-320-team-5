# COMPSCI 320 Fall 2021 - Job Referral Project - Team Aki

## Features/Functionalities

| Feature               | Core Functionality?   | Description                           |
|-----------------------|-----------------------|---------------------------------------|
| Login                 | **Yes**               | Finished in 1st Sprint                |
| User Storage/Roles    | **Yes**               | Finished with document/aki.sql        |
| Dashboard             | **Yes**               |                                       |
| Job Database          | **Yes**               |                                       |
| Referral System       | **Yes**               |                                       |
| API                   | **Yes**               |                                       |
| User Interface        | **Yes**               |                                       |
| Notification/Mailbox  | No                    | "employee"/"manager"/"referred" roles |
| File Upload/Download  | No                    |                                       |
| Search/Filter         | No                    |                                       |
| Skill Filter          | No                    |                                       |
| ELO score system      | No                    |                                       |
| Wireframe/Mockup      | No                    |                                       |

## Technology Stack

- **Frontend:** ReactJS with vanilla HTML + CSS
- **Backend:** NestJS (JavaScript framework for building scalable, server-side rendered Node.js application, offering built-in Express support as an HTTP server framework)
- **Database:** MySQL Database Hosted by AWS RDB(work on local database for now)
- **CI/CD:** PM2 + AWS EC2 + GitHub Actions (for better development and deployment experience)

## Team Members

### Project Manager

- Thanh Phan (GitHub: ) (Email: tcphan@umass.edu)

### Software Engineers

- Adira Cohen (GitHub: ) (Email: adiracohen@umass.edu)
- Aditya Vikram Singh (GitHub: @AVS1508) (Email: avsingh@umass.edu)
- Chinh Vu (GitHub: @ChinhVu320) (Email: chinhvu@umass.edu)
- James Topa (GitHub: @JTopa7) (Email: jtopa@umass.edu)
- Kai Ye (GitHub: @yk930608) (Email: kye@umass.edu)
- Lily Rosenbaum (GitHub: ) (Email: lrosenbaum@umass.edu)
- Matthew Cappucci (GitHub: @mcappucci1) (Email: mcappucci@umass.edu)
- Richard Paul (GitHub: @rdp2001) (Email: rdpaul@umass.edu)
- Yam Mangalili (GitHub: ) (Email: ymangalili@umass.edu)
- Yiming Huang (GitHub: @suikac) (Email: yiminghuang@umass.edu)

## Backend Setup

### Prerequisites

`git clone https://github.com/suikac/compsci-320-team-5.git` and switch to branch 'backend_setup'

install and run [MySQL](https://dev.mysql.com/downloads/) locally

- `mysql -u root` to login to MySQL
- if MySQL 8.0.0+ is installed: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password-you-want'`
- `create schema aki`;

### Run the app

`bash document/shell/start_backend.sh` to start backend service

`bash document/shell/start_backend.sh` to start login service

`bash document/shell/start_backend.sh` to start db service

place mysql username and mysql password in `db/src/api.module.ts`

send out post request to `localhost:3000/login?username=user&password=pwd` to get an employee
