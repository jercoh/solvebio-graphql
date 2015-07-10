import SolveBio from 'solvebio';
import {authToken} from './config';

SolveBio.init({
    accessToken: authToken
});

export default SolveBio;