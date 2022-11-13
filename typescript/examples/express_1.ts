import express from "express";

const app=express();

app.get("/:id",(req,res) => {
	res.send(`id: ${req.params.id}`);
});
