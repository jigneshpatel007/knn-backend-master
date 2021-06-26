export const TYPES = {
  LoggerService: Symbol('ILoggerService'),
  DatabaseService: Symbol('IDatabaseService'),

  // Services
  CustomerService: Symbol('ICustomerService'),
  JwtService: Symbol('IJwtService'),
  AuthenticationService: Symbol('IAuthenticationService'),
  UserService: Symbol('IUserService'),
  RoleService: Symbol('IRoleService'),
  SubscriptionService: Symbol('ISubscriptionService'),
  // RoleService: Symbol('IRoleService'),
  // PaymentService: Symbol('IPaymentService'),
  // OrganisationService: Symbol('IOrganisationService'),

  // Repositories
  CustomerRepository: Symbol('ICustomerRepository'),
  UserRepository: Symbol('IUserRepository'),
  RoleRepository: Symbol('IRoleRepository'),
  // RoleRepository: Symbol('IRoleRepository'),
  // OrganisationRepository: Symbol('IOrganisationRepository'),
  // PaymentRepository: Symbol('IPaymentRepository'),
  SubscriptionRepository: Symbol('ISubscriptionRepository'),

};
