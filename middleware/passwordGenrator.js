const passGen = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    const length = 10;
    let password = "";
  
    for (let i = 0; i < length; i++) {
      let randIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randIndex);
    }
  
    return password;
  };
  
  module.exports = { passgen: passGen };
  