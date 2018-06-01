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

//add project:
server.post('/api/projects', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        sendUserError(400, "Please provide name and description of the project.", res);
        return;
    }
    projectModel
        .insert({ name, description })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The project could not be created.", res);
            return;
        });
});

//edit project:
server.put('/api/projects/:id', (req, res) => {
    const { name, description } = req.body;
    const id = req.params.id;
    projectModel
        .update(id, { name, description })
        .then(result => {
            if (result.length === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The user could not be updated.", res);
            console.log(error);
            return;
        });
});

//delete project
server.delete('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    projectModel
        .remove(id)
        .then(result => {
            if (result.length === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The user could not be updated.", res);
            return;
        });
});

//get all actions or action by id using query
server.get('/api/actions', (req, res) => {
    const { id } = req.query;
    actionModel
        .get(id)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The requested tags could not be retrieved.", res);
            return;
        });
});

//add action
server.post('/api/actions/:id', (req, res) => {
    const project_id = req.params.id
    const { description } = req.body;
    if (!req.body) {
        sendUserError(400, "Please provide action.", res);
        return;
    }
    actionModel
        .insert( project_id, { description })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The action could not be created.", res);
            console.log(error);
            return;
        });
});

server.listen(5000, () => console.log('server running on 5000'));
