const express = require("express")
const jsdom = require("jsdom")

const app = express()
const { JSDOM } = jsdom

const port = 3000

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html", (err) => {
    if (err) {
      console.log(err)
      res.render("Please reload the page")
    } else {
      console.log("Successfully sent index.html")
    }
  })
})

app.listen(port, () => {
  console.log(`Scrapper app listening on port ${port}!`)
})

app.get("/api/scrape", (req, res) => {
  const { keyword } = req.query

  if (!keyword || !keyword.trim()) {
    return res.send("Search keyword should not be null or empty")
  }

  // use jsdom to get the html from search results page and clean the data to send search results as a list of objects containing data needed for rendering
  JSDOM.fromURL(`https://www.amazon.com/s?k=${keyword}`)
    .then((dom) => {
      const searchRes = [
        ...dom.window.document.querySelectorAll(
          "[data-component-type='s-search-result']:not(.AdHolder)"
        ),
      ]
        .filter((item) => item.getAttribute("data-asin"))
        .map((item) => {
          const textArr = item.textContent.split("  ")
          const title = textArr[0]
          const [rating, numOfReviews] = textArr[1].split(" out of 5 stars ")
          return {
            imageUrl: item.querySelector(".s-image").src,
            imageAlt: item.querySelector(".s-image").alt,
            imageUrlSet: item.querySelector(".s-image").srcset,
            title,
            rating,
            numOfReviews,
          }
        })

      // console.log(searchRes);

      res.send(searchRes)
    })
    .catch((err) => {
      res.send(err)
      console.log(err)
    })
})
