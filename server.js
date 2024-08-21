const express = require('express');
const mongoose = require('mongoose');
const BrandName = require('./model');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://Swetha:Swethamongo@cluster0.hld6dqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello, world');
});

app.post('/addbrands', async (req, res) => {
    const { brandname } = req.body;
    try {
        const newData = new BrandName({ brandname });
        await newData.save();

        const brands = await BrandName.find();
        return res.json(brands);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

app.get('/getallbrands', async (req, res) => {
    try {
        const allData = await BrandName.find();
        return res.json(allData);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
app.get('/getbrand/:id', async (req, res) => {
    try {
        const brand = await BrandName.findById(req.params.id);
        if (!brand) {
            return res.status(404).send('Brand not found');
        }
        return res.json(brand);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
app.delete('/deletebrand/:id', async (req, res) => {
    try {
        const brand = await BrandName.findByIdAndDelete(req.params.id);
        if (!brand) {
            return res.status(404).send('Brand not found');
        }
        return res.send('Brand deleted successfully');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


app.listen(3000, () => console.log('Server running on port 3000'));
