const { getDataFromDb, createDocument } = require('../service/database/db-service');

const getCarsData = async (req, res) =>{
    console.log('yes')
    try{
        const response = await carsData();
        res.status(201).send(response);
    }
    catch(err){
        res.status(500).send(err)
    }
};

const createpurchaseData = async(req,res) =>{
    try{
        purchaseData(req.body)
        res.status(200).json({ mssg: 'success'});
    }
    catch(err){
        res.status(500).send(err)
    }
};
module.exports = {getCarsData,createpurchaseData,}