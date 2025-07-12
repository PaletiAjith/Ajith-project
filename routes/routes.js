



const express = require('express');
const Model = require('../Models/models');  // Your custom Mongoose model
const router = express.Router();

// GET ALL API
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET BY ID API
router.get('/getone/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST API
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age,
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT API
router.put('/put/:id', async (req, res) => {
    try {
        const updatedData = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//UPDATE BY ID METHOD
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}) 


// DELETE API
router.delete('/delete/:id', async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
