const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Task {
        _id: ID!
        userId: String!
        createdBy: String!
        projectId: String!
        projectName: String!
        responsiblePerson: String!
        title: String!
        description: String!
        priority: String!
        status: String!
        createdAt: String
        finishedAt: String
        termAt: String
    }

    input TaskInputData {
        _id: String
        userId: String!
        createdBy: String!
        projectId: String!
        projectName: String!
        responsiblePerson: String!
        title: String!
        description: String!
        priority: String!
        status: String!
        createdAt: String
        finishedAt: String
        termAt: String
    }

    type RootMutation {
        addTask(taskInput: TaskInputData): Task!
        updateTask(taskInput: TaskInputData): Task!
        updateTaskField(taskId: String!, taskFieldData: TaskInputData): Task!
        removeTask(taskId: String!): Task!
    }

    type RootQuery {
        fetchTasks(userId: String!): [Task]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
