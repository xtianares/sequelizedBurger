module.exports = function(sequelize, DataTypes) {
    // Sequelize model to create `Customers` table in db
    let Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Customer.associate = function(models) {
        // Associating Customer with Burger
        Customer.hasMany(models.Burger, {});
    };

    return Customer;
};
