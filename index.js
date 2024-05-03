const express = require("express");
const jsdom = require("jsdom");

const app = express();
const { JSDOM } = jsdom;

const port = 3000;

app.use(express.static(__dirname + "/public"));

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

	if (!keyword || !keyword.trim()) {
		return res.send("Search keyword should not be null or empty");
	}

	JSDOM.fromURL(`https://www.amazon.com/s?k=${keyword}`)
		.then((dom) => {
			const searchRes = [
				...dom.window.document.querySelectorAll(
					".s-result-item:not(.AdHolder)"
				),
			]
				.filter((item) => item.getAttribute("data-asin"))
				.map((item) => ({
					imageUrl: item.querySelector(".s-image").src,
					title: item.querySelector("h2").textContent,
					rating: item.querySelector("a.a-popover-trigger").textContent,
					numOfReviews: item.querySelector(
						"[data-csa-c-content-id='alf-customer-ratings-count-component']"
					).textContent,
				}));

			res.send(searchRes);
		})
		.catch((err) => {
			res.send(err);
		});
});
