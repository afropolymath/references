# MySQL Guides
## Contents

- [Resetting MySQL Password](#resetting-mysql-password)

## Resetting MySQL Password

Navigate to the mysql bin folder

```sh
# You may also add this folder to your path to avoid having to cd everytime
cd /usr/local/mysql/bin
```

Stop the MySQL server (You may use either the interface from the setting panel on mac or use this shell command)

```sh
sudo /usr/local/mysql/support-files/mysql.server stop
```

Start MySQL server in safe mode

```sh
sudo mysqld_safe --skip-grant-tables
```

In a new window, connect to the database as root user

```sh
mysql -u root
```

Switch the mysql database

```mysql
USE mysql;
```

On MySQL 5.7+, run the command to change the root password

```mysql
UPDATE mysql.user SET authentication_string=PASSWORD("your-password") WHERE User='root';
```

Refresh

```mysql
FLUSH PRIVILEGES;
```

Quit

```mysql
\q
```

Stop the safe mode server

Restart the MySQL server

```sh
sudo /usr/local/mysql/support-files/mysql.server restart
```

Login using your new password

```sh
mysql -u root -p
```

Change the password again just to be double sure

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```