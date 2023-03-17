<div align="center">
  <img src="logo.svg" width="250" />
</div>

<h1 align="center">
 Armazem, Social Network for Manga Readers [Prototype]
</h1>

Social network project for manga readers aims to create an online community for sharing information and recommendations about manga. Users can register through Google login and have the ability to follow other users, create and share lists of favorite manga, rate and leave comments on manga, and receive notifications.

The frontend of the project was developed using React, with TypeScript support for safer typing. Communication with the server is done through Axios, a library for HTTP requests. Vite was used to streamline the process of building and developing the project. For user authentication, the Firebase platform was used, with OAuth support. Application design was done with the help of TailwindCSS library and Framer Motion was used for animations.

The backend of the project was developed using Node.js, with TypeScript for safer typing. For the database, MongoDB was used through Mongoose, which provides an abstraction layer for communicating with the database. For user authentication, Json Web Tokens were used. System email confirmation was implemented using Nodemailer.

Overall, the project aimed to create an interactive platform for manga readers, supporting the online community.

## :hammer_and_wrench: Tools

### Frontend

* React
* TypeScript
* Axios
* Vite
* Firebase
* OAuth
* TailwindCSS
* Framer Motion

### Backend

* Node.js
* TypeScript
* Express
* Mongoose
* Json Web Tokens
* Nodemailer

## :mailbox_with_mail: Utilities
 
### <strong>Model-View-Controller (MVC)</strong>
 
Is a widely used software architecture pattern for separating an application's concerns into three main components: the model, the view, and the controller. The goal is to separate the business logic from the user interface, allowing each component to be developed and tested independently.

The model is responsible for business logic and data manipulation. It represents the state of the system and the business rules that govern how data is stored, manipulated, and validated.

The view is responsible for displaying data and user interaction. It is the user interface of the system and displays the information contained in the model. It is responsible for presenting and manipulating the data in a form that the user can understand.

The controller is the intermediary between the model and the view. It acts as an entry point for user requests and coordinates interactions between the view and the model. It also controls the flow of the application, making the appropriate calls to the necessary components.

By separating business logic, user interface, and flow control into discrete components, the MVC pattern allows you to build more scalable, flexible, and maintainable applications. Furthermore, it allows developers to work more collaboratively and independently, as each component can be developed and tested separately.

### API RESTful (Representational State Transfer) 

Is an architectural style for hypertext-based distributed systems. It is a design approach that establishes a series of constraints and guidelines for creating web services that are scalable, reliable, interoperable, and easy to maintain.

RESTful services are based on the HTTP protocol, using GET, POST, PUT, DELETE methods for reading, creating, updating and deleting resources, respectively. Additionally, resources are identified using URIs (Uniform Resource Identifiers) and return data in formats such as JSON, XML, or other customer-defined formats.

The term RESTful was coined by Roy Fielding in his doctoral thesis in 2000 and is based on the principle that representational state transfer is performed between the client and the server. In other words, the API is designed to be stateless, which means that each request made by the client must contain all the information needed to perform the requested action.

The concept of REST is often associated with the MVC (Model-View-Controller) architectural model, as the RESTful API separates the representation of data from the server, which is the model, from the client, which is the view. The controller in this case is the API itself, which handles client requests and sends appropriate responses.

Overall, using a RESTful API allows developers to build highly scalable, interoperable, and maintainable applications by following a clear set of guidelines and constraints that make web service development more consistent and efficient.

### JSON Web Token (JWT) 

Is an open standard for creating JSON-based authentication tokens that can be used to authenticate users in web applications and RESTful APIs. The JWT consists of three parts: a header, a payload and a signature. The header defines the token type and the encryption algorithm used to sign the token. The payload contains the user information such as name, email, permissions, etc. The signature is generated from a secret key that only the server knows.

Authentication is a process that verifies that a user is who he claims to be. In web applications and RESTful APIs, authentication is used to protect resources that should only be accessed by authenticated users. There are different types of authentication such as Basic Authentication, OAuth and JWT.

JWT is commonly used for authentication in RESTful APIs as it is an efficient and secure method of passing authentication information between the client and the server. When a user logs in, the server creates a JWT containing the user's information and sends the token back to the client. The client stores the token in a cookie or in the browser's local storage and sends the token along with each request to the RESTful API. The server verifies that the token is valid and, if so, grants access to protected resources.

### JSON (JavaScript Object Notation) 

JSON (JavaScript Object Notation) is a lightweight, easy-to-read and write data format for exchanging information between systems. It is based on a subset of the JavaScript programming language, but can be used by any programming language.

Data in a JSON file is represented in key-value pairs, separated by commas, and enclosed in braces.

### Nodemailer 

Nodemailer is a Node.js library that allows sending emails using various email service platforms, such as Gmail, Yahoo, Hotmail, among others, in addition to being possible to use custom SMTP servers.

The process of sending emails using Nodemailer is simple and can be done in a few lines of code. It is only necessary to define some parameters like the recipient, subject, body of the message, and optionally, attachments.

In addition, it is possible to add features such as sending mass emails, scheduling sending, sending emails with a template, among others. Nodemailer also has security features such as SMTP authentication, which ensures that only authenticated users can send emails.

In the context of a web application, Nodemailer can be used for various purposes, such as sending registration confirmation, password recovery, sending newsletters, among others. With it, it is possible to make communication with users more efficient and personalized, improving the user experience.

## :speech_balloon: Explanations

### useEffect & Axios: Handling Requests and Reacting to Data Changes with Side Effects 

useEffect is a React Hook that lets you synchronize a component with an external system. The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers.

useEffect accepts two arguments. The second argument is optional.

 - `useEffect(function, dependencies?)`
 
Let's use a timer as an example.

```jsx
// Use setTimeout() to count 1 second after initial render:

import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```

But wait!! It keeps counting even though it should only count once!

useEffect runs on every render. That means that when the count changes, a render happens, which then triggers another effect.

This is not what we want. There are several ways to control when side effects run.

We should always include the second parameter which accepts an array. We can optionally pass dependencies to useEffect in this array.

 - <strong>1. No dependency passed</strong>:

```jsx
useEffect(() => {
  //Runs on every render
});
```

 - <strong>2. An empty array</strong>:

```jsx
useEffect(() => {
  //Runs only on the first render
}, []);
```

 - <strong>3. Props or state values</strong>:

```jsx
useEffect(() => {
  //Runs on the first render
  //And any time any dependency value changes
}, [prop, state]);
```

So, to fix this issue, let's only run this effect on the initial render.

```jsx
// Only run the effect on the initial render:

import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []); // <- add empty brackets here

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```

```jsx
// Here is an example of a useEffect Hook that is dependent on a variable. 
// If the count variable updates, the effect will run again:

import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);
```

#### Axios - make HTTP requests

The most common way for frontend programs to communicate with servers is through the HTTP protocol. You are probably familiar with the Fetch API and the XMLHttpRequest interface, which allows you to fetch resources and make HTTP requests.

As with Fetch, Axios is promise-based. However, it provides a more powerful and flexible feature set.

By coupling requests with the useEffect hook it is possible to control and manage these requests through their dependency array:

```tsx
// web/src/components/feed/integrate/TrendingPost.tsx

// ...

interface Props {
  postId: string
}

export const TrendingPost = ({ postId }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [post, setPost] = useState<Post | null>(null)
  const [authorUser, setAuthorUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)
  const [requestAgain, setRequestAgain] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    postId &&
      (async () => {
        await axios
          .get(`${postMetadataById}/${postId}`)
          .then(({ data }) => {
            setPost(data.post)
            setAuthorUser(data.authorUser)
            setLoading(false)
          })
          .catch((error) => console.log(error.toJSON()))
      })()
  }, [postId, requestAgain])

  
  // ...
  return (
    <motion.article className={style.wrapper}>
      {rendersContent()}
      <div className={style.divider} />
      {rendersPostState()}
    </motion.article>
  )
}
```

![screen](/screens/screen-feed.png)

<p align="center">Project made with :blue_heart: by <a href="https://github.com/stardusteight-d4c">Gabriel Sena</a></p>
