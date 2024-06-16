import { DataTypes, Model, ModelCtor } from "sequelize";
import { sequelize } from "@db/Database";
import debugModule from 'debug';

const debug = debugModule('app:dao');

export let Book: ModelCtor<Model<any, any>>;

export async function setSequelize() {
    try {
        // Define the 'books' model
        Book = sequelize.define('book', {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        // Synchronize the model with the database (create the 'books' table if not exists)
        await Book.sync();

    } catch (err) {
        debug('Unable to connect to the database:', err);
    }
}
