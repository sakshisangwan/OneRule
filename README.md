# One Rule
A web app for managing marketing campaigns. 

### Frontend

- Login screen with email and password

- On successful login, user should be redirected to a page having an "Add Rule" button which allows user to create a new rule through a modal (like a contact form). The Create Rule modal must have following things:-

    - Rule name

    - Campaigns - to which campaign, should the rule be attached (multiselect field)

    - Schedule - at what time should this rule be triggered

    - Conditions - text box in which rules can be specfied

    - Action - actions that needs to be taken

    - Status - Activated/Deactivated

- The same page should have a table of all the rules that has been created by the user. Each rule line in the table should specify Rule name, Campaigns, Rule Schedule, Rule Status (Activated/Deactivated) and an edit button. 

- The edit button opens the same Create Rule modal but with data filled according to the specific rule.

### Backend 

- Rule executor service

    - The service should run every 15 minutes

    - It should check for rules that must be executed according to schedule

    - If the rule should be executed, make a lookup for data and execute the condition in the rule and trigger congiured action.

- Action executor service

    - Implement Notify action only
 
 
## Devlopment Guide:

### Project Setup:

#### For FrontEnd:

```Bash
cd engine
```

#### 1. Install the dependencies 

```BASH
npm install
```

#### 2. Run server: 

```BASH
ng serve --open
```

*Once the server runs ( at localhost:4200) sucessfully you would be redircted to the landing page, use the username: Sakshi and password: sakshi@123*

#### For BackendEnd:

```Bash
cd engine_backend
```

#### 1. Install the dependencies 

```BASH
npm install
```

#### 2. Start mongodb
```BASH
sudo service mongod start
```

#### 3. Run server: 

```BASH
nodemon app.js
```

*Once the server runs go to localhost:9000, the message 'One Rule' would be displayed*
