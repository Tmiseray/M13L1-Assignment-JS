import dotenv from 'dotenv';
dotenv.config();

const environment = process.env.NODE_ENV || 'development';

const configs = {
    development: {
        DATABASE_URL: `mysql://${process.env.MYUSERNAME}:${process.env.MYPASSWORD}@localhost:3306/factory_db`,
        CACHE_TYPE: 'simple',
        DEBUG: true,
    },
    production: {
        DATABASE_URL: process.env.DATABASE_URL,
        CACHE_TYPE: 'redis',
        DEBUG: false,
    },
};

export const config = configs[environment];