class AeroDataAPI {


    async get(exibir){
        

        setTimeout(() => {
            return exibir
        }, 2000);

    }

}

module.exports = new AeroDataAPI();