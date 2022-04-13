import type {
    RESTGetAPIUsersResult,
    RESTGetAPIUsersUserBansResult,
    RESTGetAPIUsersUserBaseObject,
    RESTGetAPIUsersUserPronounsResult,
    RESTGetAPIUsersUserResult,
    RESTPostAPIUsersUserBansResult
} from './rest';

export interface Endpoints {
    /**
     * The `GET /users` endpoint.
     * Returns a list of Partial User objects omitting the bans field.
     * @endpoint /users
     * @method GET
     */
    'GET /users': RESTGetAPIUsersResult;
    /**
     * The `GET /users/:id` endpoint.
     * Returns a User object of the user with the specified id.
     * Will return error 10001 "User not found" if the user does not exist.
     * @endpoint /users/:id
     * @method GET
     */
    'GET /users/:id': RESTGetAPIUsersUserResult;
    /**
     * The `POST /users/:id` endpoint.
     * Creates a new user fields for the user sent in the POST request JSON body.
     * Will return error 20001 "User already exists" if the user already exists.
     * Will return error 30001 "Invalid pronouns" if pronouns are specified in the POST request body that are invalid.
     * @endpoint /users/:id
     * @method POST
     */
    'POST /users/:id': RESTGetAPIUsersUserBaseObject;
    /**
     * The `GET /users/:id/bans` endpoint.
     * Returns an array of a user's ban objects. Will be an empty array if the user has not bans.
     * Will return error 10001 "User not found" if the user does not exist.
     * @endpoint /users/:id/bans
     * @method GET
     */
    'GET /users/:id/bans': RESTGetAPIUsersUserBansResult;
    /**
     * The `POST /users/:id/bans` endpoint.
     * Returns a full user object of the user the ban belongs to.
     * Will return error 30002 "Invalid Ban" if ban fields are not valid or missing.
     * @endpoint /users/:id/bans
     * @method POST
     */
    'POST /users/:id/bans': RESTPostAPIUsersUserBansResult;
    /**
     * The `GET /users/:id/pronouns` endpoint.
     * Returns an object with the user's pronouns.
     * Will return error 10001 "User not found" if the user does not exist.
     * @endpoint /users/:id/Pronouns
     * @method GET
     */
    'GET /users/:id/pronouns': RESTGetAPIUsersUserPronounsResult;
}

export enum EndpointsEnum {
    GetUsers = 'GET /users',
    GetUsersUser = 'GET /users/:id',
    PostUsersUser = 'POST /users/:id',
    GetUsersUserBans = 'GET /users/:id/bans',
    PostUsersUserBans = 'POST /users/:id/bans',
    GetUsersUserPronouns = 'GET /users/:id/pronouns'
}
