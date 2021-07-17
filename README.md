## About The Project

This is a web app for Sentir Creativo


### Built With

* [React](https://reactjs.org)
* [Strapi](https://strapi.io/)
* [Nodejs](https://nodejs.org/es/)


## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* [Nodejs](https://nodejs.org/es/)
* [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/andresfelipe9619/sentir-creativo-web-app.git
   ```

2. Open a terminal and go to the server folder 
   ```sh
    cd server
   ```
    and create a ***.env*** file with your **DATABASE_URI**
   ```sh
    DATABASE_URI=your_uri
   ```
3. Install dependencies
   ```sh
   yarn install
   ```
4. Start the server
    ```sh
    yarn develop
    ```
5. Open a new terminal and go to the client folder 
   ```sh
    cd client
   ```
6. Install dependencies
   ```sh
   yarn install
   ```
4. Start the client
    ```sh
    yarn start
    ```

## Deploying

server 
```sh
git subtree push --prefix server heroku master
```
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Clone the Project
2. Make sure you have git configured 

   ```sh
   git config --global user.name "John Doe"
   git config --global user.email johndoe@example.com
   ````
3. Create your Branch (`git checkout -b amazing-branch`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin amazing-branch`)
6. Open a Pull Request


## License

Distributed under the MIT License. See `LICENSE` for more information.
