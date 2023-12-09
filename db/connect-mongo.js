// Conexion a la base de datos
const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = 'mongodb://seguridad1-jwt:JGonzalez01@ac-8vtlif6-shard-00-00.ecf65rj.mongodb.net:27017,ac-8vtlif6-shard-00-01.ecf65rj.mongodb.net:27017,ac-8vtlif6-shard-00-02.ecf65rj.mongodb.net:27017/inventarios?ssl=true&replicaSet=atlas-135kos-shard-0&authSource=admin&retryWrites=true&w=majority'
        await mongoose.connect(url);
        console.log('Conexion exitosa');
    } catch (error) {
        console.log(error);

    }
}

    module.exports = {
        getConnection,
    }
