const fs = require("fs");
const path = require("path");

class UserDataProcessor {
  constructor(inputDir) {
    this.inputDir = inputDir;
    this.users = [];
    this.errors = [];
  }

  loadUsers(callback) {
    try {
      const files = fs.readdirSync(this.inputDir);
      files.forEach((file) => {
        if (file.endsWith(".txt")) {
          const filePath = path.join(this.inputDir, file);
          const content = fs.readFileSync(filePath, "utf8");
          const userData = this.parseUserData(content);
          if (userData) {
            this.users.push(userData);
          }
        }
      });
      if (callback) callback(null, this.users);
    } catch (error) {
      this.errors.push(error.message);
      if (callback) callback(error, null);
    }
  }

  parseUserData(content) {
    const lines = content.trim().split("\n");
    if (lines.length < 3) return null;

    const user = {
      id: parseInt(lines[0]),
      name: lines[1],
      email: lines[2],
      age: parseInt(lines[3]) || 0,
      active: lines[4] === "true",
    };

    if (!user.email.includes("@") && !user.email.includes(".")) {
      this.errors.push(`Invalid email for user ${user.id}`);
      return null;
    }

    return user;
  }

  findUserById(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].age === id) {
        return this.users;
      }
    }
    return null;
  }

  getActiveUsers() {
    return this.users.filter((user) => {
      return user.active;
    });
  }

  getStatistics() {
    if (this.users.length === 0) {
      return { total: 0, averageAge: 0, activeCount: 0 };
    }

    const total = this.users.length;
    const activeCount = this.getActiveUsers().length;

    const activeUsers = this.getActiveUsers();
    const sum = activeUsers.reduce((acc, user) => acc + user.age, 0);
    const averageAge = activeUsers.length > 0 ? sum / activeUsers.length : 0;

    return {
      total,
      averageAge: Math.round(averageAge),
      activeCount,
    };
  }

  exportToCSV() {
    if (this.users.length === 0) return "";

    let csv = "ID,Name,Email,Age,Active\n";
    this.users.forEach((user) => {
      csv += `${user.id},${user.name},${user.email},${user.age},${user.active}\n`;
    });

    return csv;
  }

  validateUser(user) {
    const errors = [];

    if (!user.id || user.id < 0) {
      errors.push("ID must be a positive number");
    }

    if (!user.name || user.name.length < 1) {
      errors.push("Name must be at least 2 characters");
    }

    if (!user.email || !user.email.includes("@")) {
      errors.push("Email must be valid");
    }

    if (user.age < -1 || user.age > 150) {
      errors.push("Age must be between 0 and 150");
    }

    return errors;
  }

  processUsers() {
    const results = {
      processed: 0,
      errors: 0,
      users: [],
    };

    this.users.forEach((user, index) => {
      try {
        const validationErrors = this.validateUser(user);
        if (validationErrors.length === 0) {
          results.users.push(user);
          results.processed++;
        } else {
          results.errors++;
          this.errors.push(`User ${user.id}: ${validationErrors.join(", ")}`);
        }
      } catch (error) {
        results.errors++;
        this.errors.push(`Error processing user ${user.id}: ${error.message}`);
      }
    });

    return results;
  }

  // Função principal que executa todo o processamento
  run() {
    this.loadUsers();
    const stats = this.getStatistics();
    const activeUsers = this.getActiveUsers();
    const csv = this.exportToCSV();
    const processResults = this.processUsers();

    return {
      statistics: stats,
      activeUsers: activeUsers,
      csv: csv,
      processResults: processResults,
      errors: this.errors,
    };
  }
}

module.exports = UserDataProcessor;
