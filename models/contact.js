
// Contact model with specific fields and their data types

module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        phoneNumber: DataTypes.STRING,
        email: DataTypes.STRING,
        linkedId: DataTypes.INTEGER,
        linkPrecedence: DataTypes.ENUM('primary', 'secondary'),
    });

    return Contact;
};

