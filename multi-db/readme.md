## POSTGRES

    docker run \
        --name postgres \
        -e POSTGRES_USER=admin \
        -e POSTGRES_PASSWORD=admin \
        -e POSTGRES_DB_NAME=herois \
        -p 5432:5432 \
        -d \
        postgres

    docker run \
        --name adminer \
        -p 8080:8080 \
        --link postgres:postgres \
        -d \
        adminer

## MONGODB

    docker run \
        --name mongodb \
        -p 27017:27017 \
        -e MONGO_INITDB_ROOT_USERNAME=admin \
        -e MONGO_INITDB_ROOT_PASSWORD=admin \
        -d \
        mongo:4

    docker run \
        --name mongoclient \
        -p 3000:3000 \
        --link mongodb:mongodb \
        -d \
        mongoclient/mongoclient
    
    docker exec -it mongodb \
        mongo --host localhost -u admin -p admin --authenticationDatabase admin \
        --eval "db.getSiblingDB('herois').createUser({user: 'raziel', pwd: 'secret', roles: [{role:'readWrite', db: 'herois'}]})"

#### COMMANDS

        // show dbs
        // use db
        // show collections
        // STRING CONEXÃO: docker exec -it e92d458c818a -u raziel -p secret --authenticateDatabase herois

        // CREATE
        db.herois.insert({
            nome: 'Flash',
            poder: 'Velocidade',
            dataNascimento: '1998-01-01'
        })

        // READ
        db.herois.find()
        db.herois.findOne()
        db.herois.findOne({ _id: ObjectId('xxx') })

        db.herois.find().pretty()
        db.herois.find().limit(10).sort({ nome: -1 })
        db.herois.find({}, { poder: 1, _id: 0 })
        // it

        // UPDATE
        // DÁ TAMBEM PARA PASSAR UMA FLAG PARA INSERIR CASO NAO EXISTA
        // SENÃO TOMAR CUIDADO COM O UPDATE ELE PODE APAGAR OS CAMPOS EXISTENTES
        // TEM QUE TAMBER DEFINIR O QUE VAI ATUALIZAR CORRETAMENTE SENÃO ELE ADICIONA O NOVO CAMPO

        // APENAS ATUALIZA O PRIMEIRO QUE ACHAR E NAO ATUALIZA VARIOS, MAS PODE PASSAR UMA FLAG PARA ATUALZIAR VARIOS
        db.herois.update({ _id: ObjectId('xxx') }, { nome: 'Mulher maravilha' })
        db.herois.update({ _id: ObjectId('xxx') }, { $set: { nome: 'Lanterna Vermelha' } })

        // DELETE
        // DELTA TUDO
        db.herois.remove({})
        db.herois.remove({nome: 'Mulher Maravilha'})

        db.herois.count()

        for (let index = 0; index < 10000; index++) {
            db.herois.insert({
                nome: 'Clone' + index,
                poder: 'Velocidade',
                dataNascimento: '1998-01-01'
            })
        }

#### HOW TO:

    ...