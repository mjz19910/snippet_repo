import express from "express";

const app = express();

app.get("/:id", (req, res)=> {
	res.send(`${req.params.id}`)
})
