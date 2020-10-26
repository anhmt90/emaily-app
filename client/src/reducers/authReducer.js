import { FETCH_USER } from '../actions/types'

/**
 * state defaults to null for the case when the app first boots up, 
 * so null = still waiting for the login state of the user from the server
 */
export default (state = null, action) => {
    
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;     /** logged in -> returns payload, else false */

        default:
            return state;
    }
}