const monthlyFee = require("../database/models/fee");
const User = require("../database/models/user");
// importando node-cron.
const cron = require("node-cron");


// Função para criar as contas
async function generateFee(){

    const today = new Date(); // gerando uma nova data.
    const day = today.getDate();
    const month = today.getMonth()+ 1; // coletando o mês.
    const year = today.getFullYear(); // coletando o ano.


    try{
        
        const users = await User.findAll();
        try{

            for (user of users){
                
                await monthlyFee.create({
                    day:day,
                    month:month,
                    year:year,
                    userId: user.id

                });
                
            };
        }catch(error){
            console.log("Erro ao criar as taxas mensais");
        };
        
    }catch(error){
        console.log(error);
    };

};

cron.schedule('0 0 1 * *',generateFee,{
    scheduled: true,
    timezone: "America/Bahia"
});

