const express = require('express');
const router = express.Router();
let fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

// ROUTE : 1  Fetch all notes GET /api/auth/fetchnotes. LOGIN REQUIRE.

router.get('/fetchnotes', fetchuser, async  (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const notes = await Notes.find({ user: req.user._id});
        res.json(notes);
    }catch (e) {
        console.error(errors.message);
        res.status(500).send("Internal serve error");
    }
})

// ROUTE : 2  Add new note using POST /api/auth/addnote. LOGIN REQUIRE.

router.get('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Enter a valid description').isLength({ min: 1 }),
    body('tag', "Password must be at least 5 characters").isLength({ min: 1 }),
],async  (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag} = req.body;
    try {
        // const notes = await Notes.find({ user: req.user.id});
        const user = req.user._id;
        const note = await new Notes({
            user, title, description, tag
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }catch (e) {
        console.error(errors.message);
        res.status(500).send("Internal serve error");
    }
})

// ROUTE : 3  Update selected note using PUT /api/auth/updatenote. LOGIN REQUIRE.

router.put('/updatenote/:id', fetchuser, async  (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const { title, description, tag} = req.body;
        // Create a newNote object

        const newNote = {};
        if(title){ newNote.title = title };
        if(description){ newNote.description = description };
        if(tag){ newNote.tag = tag };
        // console.log( newNote.title == title);

        // console.log(req.params);
        //Find the note that need to be updated.
        let note = await Notes.findById(req.params.id);
        if(!note){ res.status(404).send("Not found")}

        if(note.user.toString() !== req.user._id){
            return res.status(401).send("Note allowed");
        };

        note = await Notes.findByIdAndUpdate( req.params.id, { $set: newNote}, {new: true} )

        res.send({note})

    }catch (e) {
        console.error(errors.message);
        res.status(500).send("Internal serve error");
    }
})

// ROUTE : 4  Delete selected note using DELETE /api/auth/deletenote. LOGIN REQUIRE.

router.delete('/deletenote/:id', fetchuser, async  (req, res)=>{
    const errors = validationResult(req);
    try{
        //Find the note that need to be deleted.
        let note = await Notes.findById(req.params.id);
        if(!note){ res.status(404).send("Not found")}

        if(note.user.toString() !== req.user._id){
            return res.status(401).send("Note allowed");
        };

        note = await Notes.findByIdAndDelete(note);

        res.send({note}).send( "Note deleted successfully")

    }catch (e) {
        console.error(errors.message);
        res.status(500).send("Internal serve error");
    }
})

module.exports = router;