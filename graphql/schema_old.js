const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Error {
        path: String
        message: String
    }

    type Calendar {
        _id: ID
        eventId: String
        userId: String
        eventType: String
        title: String
        description: String
        selectedDate: String
        status: String
        createdAt: String
        errors: [Error]
    }

    type Company {
        _id: ID
        name: String
        address: String
        NIP: String
        website: String
        phone: String
        fax: String
        mail: String
        bankName: String
        bankAcount: String
        description: String
        errors: [Error]
    }

    type Contractor {
        _id: ID
        name: String
        address: String
        NIP: String
        KRS: String
        website: String
        phone: String
        fax: String
        mail: String
        description: String
    }

    type Payment {
        _id: ID
        paymentNumber: String
        paymentMonth: String
        paymentYear: String
        paymentType: String
        paymentCycle: String
        companyName: String
        contractorName: String
        companyAddress: String
        contractorAddress: String
        companyNIP: String
        contractorNIP: String
        companyWebsite: String
        companyPhone: String
        contractorPhone: String
        companyMail: String
        contractorMail: String
        companyBankName: String
        companyBankAcount: String
        description: String
        netValue: String
        grossValue: String
        status: String
        paymentMethod: String
        termAt: String
        createdAt: String
    }  

    type Pattern {
        _id: ID
        userId: String
        taskId: String
        createdBy: String
        responsiblePerson: String
        title: String
        description: String
        elements: String
        type: String
        status: String
        finishedAt: String
        termAt: String
        createdAt: String
    }

    type User {
        _id: ID
        name: String
        email: String
        password: String
        status: String
        company: String
        projects: String
        users: String
        lastActive: String
        createdAt: String
        errors: [Error]
    }

    type UserHistory {
        _id: ID
        userId: String
        userName: String
        taskCreatedBy: String
        taskProjectName: String
        taskTitle: String
        event: String
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
        company: String
        description: String
        cms: String
        ftp: String
        panel: String
        errors: [Error]
    }

    input CalendarInputData {
        _id: ID
        eventId: String
        userId: String
        eventType: String
        title: String
        description: String
        selectedDate: String
        status: String
        createdAt: String     
    }

    input CompanyInputData {
        _id: ID
        name: String!
        address: String
        NIP: String
        website: String
        phone: String
        fax: String
        mail: String
        bankName: String
        bankAcount: String
        description: String
    }

    input ContractorInputData {
        _id: ID
        name: String!
        address: String!
        NIP: String
        KRS: String
        website: String
        phone: String
        fax: String
        mail: String
        description: String
    }

    input PaymentInputData {
        _id: ID
        paymentNumber: String
        paymentMonth: String
        paymentYear: String
        paymentType: String
        paymentCycle: String
        companyName: String
        contractorName: String
        companyAddress: String
        contractorAddress: String
        companyNIP: String
        contractorNIP: String
        companyWebsite: String
        companyPhone: String
        contractorPhone: String
        companyMail: String
        contractorMail: String
        companyBankName: String
        companyBankAcount: String
        description: String
        netValue: String
        grossValue: String
        status: String
        paymentMethod: String
        termAt: String
        createdAt: String
    }

    input PatternInputData{
        _id: ID
        userId: String
        taskId: String
        createdBy: String
        responsiblePerson: String
        title: String
        description: String
        elements: String
        type: String
        status: String
        finishedAt: String
        termAt: String
        createdAt: String
    }

    input UserInputData {
        _id: String
        name: String
        email: String
        password: String
        status: String
        company: String
        projects: String
        users: String
        lastActive: String
        createdAt: String
    }

    input UserHistoryInputData {
        _id: String,
        userId: String
        userName: String
        taskCreatedBy: String
        taskProjectName: String
        taskTitle: String
        event: String
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
        company: String
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
        company: String
        projects: String
        users: String
        lastActive: String
        token: String!
    }

    type RootMutation {
        addCalendar(calendarInput: CalendarInputData): Calendar!
        updateCalendar(calendarInput: CalendarInputData): Calendar!
        removeCalendar(eventId: String!): Calendar!
        addCompany(companyInput: CompanyInputData): Company!
        updateCompany(companyInput: CompanyInputData): Company! 
        removeCompany(companyId: String!): Company!
        addContractor(contractorInput: ContractorInputData): Contractor!
        updateContractor(contractorInput: ContractorInputData): Contractor! 
        addPayment(paymentInput: PaymentInputData): Payment!
        updatePayment(paymentInput: PaymentInputData): Payment! 
        removePayment(paymentId: String!): Payment!
        addPattern(patternInput: PatternInputData): Pattern!
        updatePattern(patternInput: PatternInputData): Pattern! 
        removePattern(patternId: String!): Pattern!
        createUser(userInput: UserInputData): User!
        addUserHistory(dataInput: UserHistoryInputData): UserHistory!
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
        fetchCalendars(loggedUserId: String): [Calendar]!
        fetchCompanies: [Company]!
        fetchContractors: [Contractor]!
        fetchPayments(paymentInput: PaymentInputData): [Payment]!
        fetchNotUsedPatterns(month: String, year: String): [Payment]!
        fetchLastInsertInvoice: Payment
        fetchLastInsertPattern: Payment
        fetchPatterns: [Pattern]!
        fetchUsers(userInput: UserInputData): [User]!
        fetchUsersByLoggedUserProjects(projects: String): [User]!
        fetchUsersHistory(userId: String): [UserHistory]!
        fetchSettings: Settings!
        fetchTasks(taskInput: TaskInputData): [Task]!
        fetchTasksByLoggedUserProjects(taskInput: TaskInputData, projects: String): [Task]!
        fetchComments(commentInput: CommentInputData): [Comment]!
        fetchMessengersByName(name: String): [Messenger]!
        fetchProjects(projectInput: ProjectInputData): [Project]!
        fetchMails: [Mail]!
        fetchProjectsByLoggedUserProjects(projects: String): [Project]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
