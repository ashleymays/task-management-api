# Task Management API

A REST API for managing projects and tasks. Basically Jira without all of the extra stuff.
It's meant to be for learning purposes rather than production software. I've added some notes about the shortcuts that are used in this implementation and what might be done in production-ready code.

## A Few Implementation Notes

### User authentication

This API uses a simplifed user authentication system consisting of a JWT Bearer token. An access token is issued once and expires after an hour.

It's a good-enough solution for this project, but production-level code should definitely use a more robust solution. It's becoming common for companies to use auth systems like [Keycloak](https://www.keycloak.org/) and [Auth0](https://auth0.com/). Even if it was built in-house, we would need to at least use refresh tokens so that users don't have to log in every hour.

See [Auth0's article](https://auth0.com/intro-to-iam/what-is-authentication) to read more about it.

### TypeScript

For server-side development, it's better to use TypeScript than JavaScript because of the type-safety it offers, amongst other things. I chose not to use it, though, because I didn't feel like setting up the TypeScript compiler.

Even though it's not a complete substitute for TypeScript, I added JSDoc comments which are great for documentation.

### Tests

There are some integration tests, but in production-code we would definitely want to test more routes. I included some tests to demonstrate how they would look and work.

### Import Paths

The internal import paths are a bit wonky. I named the package "api" and exported the source folder so I could write paths like

```import { catchErrors } from 'api/shared/catch-errors'```

rather than this

```import { catchErrors } from '../shared/catch-errors.js```

or this

```import { catchErrors } from '#src/shared/catch-errors```.

There's no real reason to do it the way I did; I'm just picky.

## Documentation

I'm looking into using [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) to generate proper documentation.
