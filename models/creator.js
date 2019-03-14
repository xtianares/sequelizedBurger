module.exports = function(sequelize, DataTypes) {
    // Sequelize model to create `Customers` table in db
    let Creator = sequelize.define("Creator", {
        creator_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Creator.associate = function(models) {
        // Associating Customer with Burger
        Creator.hasMany(models.Burger, {});
    };

    return Creator;
};
