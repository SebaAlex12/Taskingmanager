const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Error {
        path: String
        message: String
    }

    type User {
        _id: ID
        name: String
        email: String
        password: String
        status: String
        projects: String
        users: String
        createdAt: String
        errors: [Error]
    }

    type Settings {
        _id: ID
        mailingDate: String
    }

    type Task {
        _id: ID
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
        mailRemainderData: String
        errors: [Error]
        files: [String]
    }

    type Comment {
        _id: String
        taskId: String
        userId: String
        createdBy: String
        description: String
        createdAt: String
        errors: [Error]
    }

    type Mail {
        _id: String
        from: String
        to: String
        projectName: String
        title: String
        description: String
        absolutePathFile: String
        attachments: String
        createdBy: String
        createdAt: String
        errors: [Error]
    }

    type Messenger {
        _id: String
        from: String
        to: String
        msg: String
        createdAt: String
    }

    type Project {
        _id: ID
        name: String
        description: String
        cms: String
        ftp: String
        panel: String
        errors: [Error]
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

    input SettingsInputData {
        _id: String
        mailingDate: String
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
        mailRemainderData: String
    }

    input CommentInputData {
        _id: String
        taskId: String
        userId: String
        createdBy: String
        description: String
        createdAt: String
    }

    input MailInputData {
        _id: String
        from: String
        to: String
        projectName: String
        title: String
        description: String
        absolutePathFile: String
        attachments: String
        createdBy: String
        createdAt: String
    }

    input MessengerInputData {
        _id: String
        from: String
        to: String
        msg: String
        createdAt: String
    }

    input ProjectInputData {
        _id: String
        name: String
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
        updateSettings(settingsInput: SettingsInputData): Settings!
        sendMailingTask: Task
        addComment(commentInput: CommentInputData): Comment!
        addMail(mailInput: MailInputData): Mail!
        addMessenger(messengerInput: MessengerInputData): Messenger!
        removeTask(taskId: String!): Task!
        removeCommentsByTaskId(taskId: String!): Task!
        addProject(projectInput: ProjectInputData): Project!
        updateProject(projectInput: ProjectInputData): Project!
        removeProject(projectId: String!): Project!
        updateUser(userInput: UserInputData): User!
    }

    type RootQuery {
        loginUser(email: String!, password: String!): UserLoginData!
        fetchUsers: [User]!
        fetchUsersByLoggedUserProjects(projects: String): [User]!
        fetchSettings: Settings!
        fetchTasks(taskInput: TaskInputData): [Task]!
        fetchTasksByLoggedUserProjects(taskInput: TaskInputData, projects: String): [Task]!
        fetchComments(commentInput: CommentInputData): [Comment]!
        fetchMessengersByName(name: String): [Messenger]!
        fetchProjects: [Project]!
        fetchMails: [Mail]!
        fetchProjectsByLoggedUserProjects(projects: String): [Project]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
