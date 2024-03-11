import Model from './models/sign-in.js';
import View from './view/sign-in.js';
import Controller from './controllers/sign-in.js';

const app = new Controller(new Model(), new View());
