const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html", (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Successfully sent index.html");
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

app.get("/api/scrape", (req, res) => {
	const { keyword } = req.query;

	if (!keyword.trim()) {
		return res.send("Search keyword should not be null or empty");
	}
});
