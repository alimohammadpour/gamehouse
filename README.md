# Gamehouse Frontend Challenge - TypeScript & React

A simplified version of the user subscription workflow for offered plans.

## Dependencies

Ensure the following are installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Getting Started

To set up the project locally, follow these steps:

### 1. Clone the Repository

```
git clone https://github.com/alimohammadpour/gamehouse.git
cd gamehouse
```

### 2. Start the application
After running the following command, navigate to [http://localhost:5173/](http://localhost:5173/) to interact with the implemented subscription workflow.
```
docker-compose up -d
```
As a step, while you are trying to subscribe, the generated verification code is accessible via the node container log:
```
docker-compose logs -f --tail=10 node
```

### 3. Testing
```
docker-compose exec react npm run test
```

## Clarification
To keep the implementation simple, the provided server file is included in this repository, and some changes have been made to enable CORS. The setup, Dockerfile and docker-compose.yml are written to be used in the development env. For further considerations and the production environment, some changes need to be applied. 