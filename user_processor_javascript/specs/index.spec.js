const expect = require("chai").expect;
const UserDataProcessor = require("../lib/index.js");

describe("UserDataProcessor", () => {
  let processor;

  beforeEach(() => {
    processor = new UserDataProcessor("./input");
  });

  // Teste 1: Carregamento e parsing de dados
  it("1. should load users from files and parse data correctly", () => {
    processor.loadUsers();
    expect(processor.users).to.be.an("array");
    expect(processor.users.length).to.be.greaterThan(0);

    // Verifica se pelo menos um usuário foi carregado corretamente
    const user = processor.users[0];
    expect(user).to.have.property("id");
    expect(user).to.have.property("name");
    expect(user).to.have.property("email");
    expect(user).to.have.property("age");
    expect(user).to.have.property("active");
  });

  // Teste 2: Validação de usuários
  it("2. should validate users correctly", () => {
    processor.users = [
      {
        id: 1,
        name: "João Silva",
        email: "joao@email.com",
        age: 25,
        active: true,
      },
      { id: 2, name: "M", email: "maria@email.com", age: 30, active: false },
      { id: 3, name: "Pedro", email: "invalid-email", age: 35, active: true },
      { id: -1, name: "Ana", email: "ana@email.com", age: 28, active: true },
    ];

    const results = processor.processUsers();
    expect(results.processed).to.equal(1);
    expect(results.errors).to.equal(3);
    expect(results.users).to.have.length(1);
    expect(results.users[0].id).to.equal(1);
  });

  // Teste 3: Cálculo de estatísticas
  it("3. should calculate statistics correctly", () => {
    processor.users = [
      { id: 1, name: "João", email: "joao@email.com", age: 20, active: true },
      {
        id: 2,
        name: "Maria",
        email: "maria@email.com",
        age: 30,
        active: false,
      },
      { id: 3, name: "Pedro", email: "pedro@email.com", age: 40, active: true },
    ];

    const stats = processor.getStatistics();
    expect(stats.total).to.equal(3);
    expect(stats.averageAge).to.equal(30);
    expect(stats.activeCount).to.equal(2);
  });

  // Teste 4: Filtros e buscas
  it("4. should filter active users and find by ID", () => {
    processor.users = [
      { id: 1, name: "João", email: "joao@email.com", age: 25, active: true },
      {
        id: 2,
        name: "Maria",
        email: "maria@email.com",
        age: 35, // Mudado para 35 para ativar o bug
        active: false,
      },
      { id: 3, name: "Pedro", email: "pedro@email.com", age: 35, active: true },
    ];

    const activeUsers = processor.getActiveUsers();
    expect(activeUsers).to.have.length(2);
    expect(activeUsers.every((user) => user.active)).to.be.true;

    const user = processor.findUserById(1);
    expect(user).to.deep.equal(processor.users[0]);
  });

  // Teste 5: Integração completa
  it("5. should process all files and return complete results", () => {
    const result = processor.run();

    expect(result).to.have.property("statistics");
    expect(result).to.have.property("activeUsers");
    expect(result).to.have.property("csv");
    expect(result).to.have.property("processResults");
    expect(result).to.have.property("errors");

    expect(result.statistics).to.have.property("total");
    expect(result.statistics).to.have.property("averageAge");
    expect(result.statistics).to.have.property("activeCount");

    expect(result.processResults).to.have.property("processed");
    expect(result.processResults).to.have.property("errors");
    expect(result.processResults).to.have.property("users");

    expect(result.activeUsers).to.be.a("number");
    expect(result.activeUsers).to.be.greaterThan(0);

    expect(result.processResults.processed).to.be.greaterThan(0);
  });
});
