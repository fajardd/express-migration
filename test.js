const bcrypt = require("bcryptjs");

const testPassword = async () => {
  const password = "zxcvbnm"; // Password yang ingin diuji
  const storedHash =
    "$2a$10$JEkMXgqQFSKxjCNGGZHCkeDJ9SS1NiWMZ.7SqkQ0sECUvZjfC2yCq"; // Hash password dari database

  console.log("Stored Hash:", storedHash);

  try {
    const isMatch = await bcrypt.compare(password, storedHash);
    console.log("Password match status:", isMatch);
  } catch (error) {
    console.error("Error during password comparison:", error);
  }
};

testPassword();
