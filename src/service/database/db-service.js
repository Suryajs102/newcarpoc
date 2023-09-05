const { MongoClient } = require('mongodb')
const url = "mongodb://127.0.0.1:27017/mongosh?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"
const client = new MongoClient(url)

const setupDatabase = async () =>{
    try{
        await client.connect();
        const db = client.db('');
         
        const carsCollection = db.collection('car');
        const purchaseCollection = db.collection('purchase');

        const carsData = [
            {
                brand:'BMW',
                model:'x5',
                carId:23445,
                price:10000000,
                status:'AVAILABLE'
            },
            {
                brand:'Hyundai',
                model:'Grand i10',
                carId:234452,
                price:1200000,
                status:'AVAILABLE' 
            }
        ];
        const purchaseData = [
            {
                orederId:'1000',
                brand:'BMW',
                model:'x5',
                carId:23445,
                price:10000000,
                orderDate:'15/04/2023'
            }
        ];

        await carsCollection.insertMany(carsData);
        await purchaseCollection.insertMany(purchaseData);

        console.log('Data inserted');
    } catch (error) {
        console.error('error inserting Data', error);
    } finally{
        await client.close();
    }
}


setupDatabase();


//new code
app.get('api/cars/get', async (req, res) =>{
    try{
        await client.connect();
        const db = client.db('carsData');
        const collection = db.collection('cars');
        const cars = await collection.find({status: 'AVAILABLE'}).toArray();
        res.json(cars);
    }catch(error){
        res.status(500).json({error:'Internal server error'});
    }finally{
        await client.close();
    }
});


app.post('api/cars/purchase', async(req, res) =>{
    try{
        await client.connect();
        const db = client.db('purchaseData');
        const carsCollection = db.collection('cars');
        const purchaseCollection = db.collection('purchase');

        const { brand,model, carId } = req.body;
        const orderDate = new Date().toLocaleDateString();

        const purchaseDocument = {
            orederId: '1001',
            brand,
            model,
            carId,
            price:0,
            orderDate
        };
        await purchaseCollection.insertOne(purchaseDocument);
        await carsCollection.updateOne({ carId }, {$set:{status: 'SOLD'}});

         res.json({ mssg: 'Thank you for purchasing(${brand} ${model})'});
    }catch (error) {
        res.status(500).json({ error: 'internal server error'});
    }finally{
        await client.close();
    }
});


app.get('api/cars/query', async (req, res) =>{
    try{
        await client.connect();
        const db = client.db('carsData');
        const collection = db.collection('cars');
        const soldCars = await collection.find({status: 'SOLD'}).toArray();
        res.json(soldCars);

}catch (error) {
    res.status(500).json({ error: 'internal server error'});
}finally{
    await client.close();
}

});

/*const getDataFromDb = async () => {
    const collection = await getCarsCollection();
    const output = await collection.find({}).toArray();
    console.log(output)
    return output;
}

async function createDocument (reqBody)  {
    const collection = await getCarsCollection();
    const output = await collection.insertOne(reqBody)
    console.log(output);
    return output;
}

const getCarsCollection = async () => {
    const conn = await client.connect();
    const db = conn.db('mongodbVSCodeplaygroundDB');
    return db.collection('cars');
}


module.exports = { getDataFromDb, createDocument }*/