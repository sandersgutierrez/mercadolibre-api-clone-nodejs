'use strict'

import chalk from 'chalk'
import mongoose from 'mongoose'
import config from './config.js'

const { connect, connection } = mongoose
mongoose.set('strictQuery', false)

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

connect(config.DB_URI, mongooseOptions)
    .then(() => console.log(`${chalk.black.bold.bgWhite(' DB ')} ${chalk.green(' Connection has been successfuly! ')}`))
    .catch(err =>
        console.log(`${chalk.white.bold.bgRed(' ERROR ')} in initial connection -> ${chalk.red(err.message)}`)
    )

if (process.env.NODE_ENV !== 'production') {
    connection.on('error', err => console.error(err))
}
