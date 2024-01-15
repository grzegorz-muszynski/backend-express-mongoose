import express from 'express';
import './db';
import Note, { NoteDocument } from './models/note';

// create a server
const app = express();

// this will parse post request coming from fetch.post() method
app.use(express.json());

// this will parse post request coming from html form
app.use(express.urlencoded({extended: false}));
    // My custom middleware below is unnecessary due to app.uses above
// app.use((req, res, next) => {
//     req.on("data", (chunk) => {
//         req.body = JSON.parse(chunk);
//         next();
//     });    
// });

app.post("/", (req, res) => {
        console.log(req.body);
        res.json({message: "I'm listening"})
    }
)

interface IncomingBody {
    title: string;
    description?: string;
}

app.post('/create', async (req, res) => {
    // const newNote = new Note<NoteDocument>({
    //     title: (req.body as IncomingBody).title, 
    //     description: (req.body as IncomingBody).description,
    // });
    // await newNote.save();
        // The code below makes the same as code above, but is a little bit shorter
    await Note.create({
        title: (req.body as IncomingBody).title, 
        description: (req.body as IncomingBody).description,
    })
    
    res.json({ message: "I am listening to create!" });
})

// Below we can use app.post or app.put as well but by convention we use app.patch
app.patch("/:noteId", async (req, res) => {
    // const noteId = req.params.id;
        // we can alternatively use destructuring like this
    // const {noteId} = req.params; 
    // const note = await Note.findById(noteId)

    // if (!note) return res.json({error: "Note not found!"});

    const {title, description} = req.body as IncomingBody;
    // if(title) note.title = title;
    // if (description) note.description = description;

    const note = await Note.findByIdAndUpdate(
        noteId, 
        {title, description},
        {new: true}
    );

    if (!note) return res.json({error: "Note not found!"});

    await note.save(); 
    res.json({note});
})

// app.delete("/:noteId", async (req, res) => {
//     const { noteId } = req.params;
//     const removedNote = await Note.findByIdAndDelete(noteId);

//     if (!removedNote) return res.json({error: 'Could not remove note!'})

//     res.json({message: "Note removed successfully."})
// })

app.get('/', async (req, res) => {
    const notes = await Note.find({});
    res.json({notes});
})

app.get('/:id', async (req, res) => {
    const {id} = req.params;
    const note = await Note.findById({id});

    if (!note) return res.json({error: "note not found!"});

    res.json({note});
})

// listen to some port
app.listen(8000, () => {
    console.log("listening")
})