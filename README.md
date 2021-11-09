# **Zwallet Mobile - BACKEND**

Kennedy's Vehicle is a web and mobile application that is useful as an online vehicle rent to help users find the vehicle that the user wants.

<br>
<p align="center">
  <img src="public/images/icon.png" />
</p>

<br>

### **BUILT WITH**

---

- [Node.js (JavaScript Runtime)](https://nodejs.org/en/)
- [Express.js (Back-end Web Application Framework)](https://expressjs.com/)
- [MySQL (Database)](https://www.mysql.com/)
- [Multer (Upload Middleware)](https://www.npmjs.com/package/multer)
- [Socket.io (Realtime)](https://socket.io/docs/v4/server-installation/)

### **TOOLS**

---

- [Visual Studio Code](https://code.visualstudio.com/)
- [Laragon](https://laragon.org/)
- [Postman](https://www.postman.com/)

### **INSTALLATION**

---

STEP 1 : Add this folder in local computer

```
git clone <this repository>
```

STEP 2 : Install module & Package

```
npm install
```

STEP 3 : Create ENV

```
DB_HOST = "HOST"
DB_USER = "USER"
DB_PASSWORD = ""
DB_DATABASE = "DATABASE"
SECRET_KEY = KEY
SECRET_PORT = PORT
```

### **HOW TO RUN**

---

You'll need to run

```
node index
```

The application will run on the designated port. Since we used the 8000 port to run the backend, it should run on [http://localhost:8000/](http://localhost:8000/).
<br>

### **AVAILABLE ROUTES**

---

link documentation postman
There are four main routes, with each route stemming from the base route in this application.

- [("/")](http://localhost:8000/) is the base route.
- [("/auth")](https://documenter.getpostman.com/view/16864555/UVBzoVk7) is the route which handles anything related to authentication (Login, Register, Logout, Forgot Password).
- [("/vehicles")](https://documenter.getpostman.com/view/16864555/UVBzoVk7) handles requests involving user data, such as profile.
- [("/transactions")](https://documenter.getpostman.com/view/16864555/UVBzoVk7) manages requests related to the all transaction users.
  <br>

### **RELATED PROJECT(S)**

- [Kennedy's vehicle web](https://github.com/Berliangymnastiar/kennedy-client)
- [Kennedy's vehicle mobile](https://github.com/Berliangymnastiar/kennedy-mobile)
