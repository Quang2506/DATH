'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('markdowns', {


            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            contenMarkDown: {
                allowNull: false,
                type: Sequelize.TEXT
            },

            description: {
                allowNull: true,
                type: Sequelize.TEXT
            },

            doctorId: {
                allowNull: true,
                type: Sequelize.INTEGER

            },
            specialtyId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            clinicId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('markdowns');
    }
};