const db = require ('../data/dbConfig');
const express = require('express');
const router = express.Router();
router.use(express.json());

// GET

router.get('/', async (req,res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
        console.log(accounts)
    }
    catch (err){
        res.status(500).json({message:'Failed to retrieve accounts'})
    }
});

router.get('/:id', async (req,res) => {
    const {id} = req.params
    console.log(id)
    try {
        const account = await db('accounts').where({id: id});

        if (account.length) {
            res.status(200).json(account);
            console.log(account)
        } else {
            res.status(404).json({ message: 'Could not find account with given id.' })
          }
    }
    catch (err){
        res.status(500).json({message:'Failed to retrieve account'})
    }
});



// POST

router.post('/', async (req,res)=>{
    const newAccount = req.body;
    console.log(newAccount)
    if(!('name' && 'budget' in newAccount)){
        res.status(400).json({message:'please provide a name and budget for your account'})
    } else {

        try{
            const accountCheck = await db('accounts').where({name:`${newAccount.name}`});
            console.log(accountCheck)
            if(accountCheck.name !== newAccount.name){
                await db('accounts').insert(newAccount);
                res.status(201).json(newAccount)
            }
        }
        catch (err){
            res.status(500).json({message:'Failed to add account check console logs'})
            console.log(err)
        }
    }
})

// UPDATE

router.get('/:id', async (req,res) => {
    const {id} = req.params
    console.log(id)
    const update = req.body;

    if(!('name' && 'budget' in update)){
        res.status(400).json({message:'please provide a name and budget for your account'})
    } else {
        try {
            await db('accounts').where({id: id}).update(update);
            res.json(update)
        }
        catch (err){
            res.status(500).json({message:'Failed to update account'})
        }
    }
});


// DELETE




module.exports = router;