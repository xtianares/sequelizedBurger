module.exports = function(sequelize, DataTypes) {
    // Sequelize model to create `burgers` table in db
    let Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Burger.associate = function(models) {
        // Burgers are associated with creator
        Burger.belongsTo(models.Creator, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });
        // Burger is associated with one customer
        Burger.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Burger;
};
