const actionModel = require('./data/helpers/actionModel.js')
const mappers = require('./data/helpers/mappers.js')
const projectModel = require('./data/helpers/projectModel.js')

var cors = require('cors');

const express = require('express');
const server = express();
server.use(express.json());
server.use(cors());

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

//get projects or post (using query):
server.get('/api/projects', (req, res) => {
    const { id } = req.query;
    projectModel
        .get(id)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The requested projects could not be retrieved.", res);
            return;
        });
});

//get project actions by id:
server.get('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    projectModel
        .getProjectActions(id)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The requested project could not be retrieved.", res);
            return;
        });
});



server.listen(5000, () => console.log('server running on 5000'));
