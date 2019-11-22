const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        projects: String
        users: String
        createdAt: String
    }

    type Task {
        _id: ID!
        userId: String!
        createdBy: String!
        projectId: String!
        projectName: String!
        responsiblePerson: String!
        title: String!
        description: String
        priority: String!
        status: String!
        responsiblePersonLastComment: String
        createdAt: String
        finishedAt: String
        termAt: String
    }

    type Comment {
        _id: String
        taskId: String
        userId: String
        createdBy: String
        description: String
        createdAt: String
    }

    type Photo {
        _id: ID!
        title: String!
        description: String!
        imageUrl: String!
        status: String!
        createdAt: String!
    }

    type Album {
        _id: ID!
        userId: String!
        name: String!
        title: String!
        access: String
        description: String
        status: String!
        photos: [String]
        createdAt: String!
    }

    type Project {
        _id: ID!
        name: String!
        description: String
        cms: String
        ftp: String
        panel: String
    }

    input UserInputData {
        _id: String
        name: String!
        email: String!
        password: String
        status: String!
        projects: String
        users: String
        createdAt: String
    }

    input TaskInputData {
        _id: String
        userId: String
        createdBy: String
        projectId: String
        projectName: String
        responsiblePerson: String
        title: String
        description: String
        priority: String
        status: String
        responsiblePersonLastComment: String
        createdAt: String
        finishedAt: String
        termAt: String
    }

    input CommentInputData {
        _id: String
        taskId: String
        userId: String
        createdBy: String
        description: String
        createdAt: String
    }

    input PhotoInputData {
        title: String!
        description: String!
        imageUrl: String!
        status: String!
        createdAt: String
    }

    input AlbumInputData {
        userId: String!
        name: String!
        title: String!
        access: String
        description: String
        status: String!
        createdAt: String!
    }

    input ProjectInputData {
        _id: String
        name: String!
        description: String
        cms: String
        ftp: String
        panel: String
    }

    type UserLoginData {
        _id: ID!
        name: String!
        email: String!
        createdAt: String!
        password: String!
        status: String!
        projects: String
        users: String
        token: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        addTask(taskInput: TaskInputData): Task!
        updateTask(taskInput: TaskInputData): Task!
        addComment(commentInput: CommentInputData): Comment!
        removeTask(taskId: String!): Task!
        addProject(projectInput: ProjectInputData): Project!
        updateProject(projectInput: ProjectInputData): Project!
        removeProject(projectId: String!): Project!
        updateUser(userInput: UserInputData): User!
        addPhoto(photoInput: PhotoInputData): Photo!
        addAlbum(albumInput: AlbumInputData): Album!
        removeAlbum(albumId: String!): Album!
    }

    type RootQuery {
        loginUser(email: String!, password: String!): UserLoginData!
        fetchUsers: [User]!
        fetchTasks(taskInput: TaskInputData): [Task]!
        fetchComments(commentInput: CommentInputData): [Comment]!
        fetchProjects: [Project]!
        fetchPhotos(album: String, category: String, status: String!): [Photo]!
        fetchAlbums(userId: String!, status: String!, access: String!): [Album]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
