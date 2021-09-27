# Backend starter
## set up
### prerequisite
`git clone https://github.com/suikac/compsci-320-team-5.git` and switch to branch 'backend_setup'

install and run [MySQL](https://dev.mysql.com/downloads/) locally
* `mysql -u root` to login to MySQL
* if MySQL 8.0.0+ is installed: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password-you-want'`
* `create schema aki`;

### run the app
`bash document/shell/start_backend.sh` to start backend service

`bash document/shell/start_backend.sh` to start login service

`bash document/shell/start_backend.sh` to start db service

place mysql username and mysql password in `db/src/db.module.ts`

send out post request to `localhost:3000/login?username=user&password=pwd` to get an employee



