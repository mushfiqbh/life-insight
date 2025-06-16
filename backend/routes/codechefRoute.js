import { JSDOM } from "jsdom";
import express from "express";
import fetch from "node-fetch";

const codechefRouter = express.Router();

const fecher = async (handle) => {
  try {
    const resdata = await fetch(`https://www.codechef.com/users/${handle}`);
    if (resdata.status == 200) {
      let d = await resdata.text();
      let data = { data: d };
      let heatMapDataCursour1 =
        data.data.search("var userDailySubmissionsStats =") +
        "var userDailySubmissionsStats =".length;
      let heatMapDataCursour2 = data.data.search("'#js-heatmap") - 34;
      let heatDataString = data.data.substring(
        heatMapDataCursour1,
        heatMapDataCursour2
      );
      // console.log(heatDataString)
      let headMapData = JSON.parse(heatDataString);
      let allRating =
        data.data.search("var all_rating = ") + "var all_rating = ".length;
      let allRating2 = data.data.search("var current_user_rating =") - 6;
      let ratingData = JSON.parse(data.data.substring(allRating, allRating2));
      let dom = new JSDOM(data.data);
      let document = dom.window.document;
      return {
        success: true,
        status: resdata.status,
        profile: document.querySelector(".user-details-container").children[0]
          .children[0].src,
        name: document.querySelector(".user-details-container").children[0]
          .children[1].textContent,
        currentRating: parseInt(
          document.querySelector(".rating-number")?.textContent
        ),
        highestRating: parseInt(
          document
            .querySelector(".rating-number")
            ?.parentNode?.children[4]?.textContent?.split("Rating")[1]
        ),
        countryFlag: document.querySelector(".user-country-flag").src,
        countryName: document.querySelector(".user-country-name").textContent,
        globalRank: parseInt(
          document.querySelector(".rating-ranks")?.children[0]?.children[0]
            ?.children[0]?.children[0]?.innerHTML
        ),
        countryRank: parseInt(
          document.querySelector(".rating-ranks")?.children[0]?.children[1]
            ?.children[0]?.children[0]?.innerHTML
        ),
        stars: document.querySelector(".rating")?.textContent || "unrated",
        heatMap: headMapData,
        ratingData,
      };
    } else {
      return { success: false, status: resdata.status };
    }
  } catch (e) {
    console.log(e);
    return { success: false, status: 404 };
  }
};

codechefRouter.get("/:handle", (req, res) => {
  const handle = req.params.handle;

  if (!handle) {
    return res
      .status(400)
      .json({ success: false, message: "Handle is required" });
  }

  fecher(handle)
    .then((data) => {
      if (data.success) {
        res.status(200).json(data);
      } else {
        res
          .status(data.status)
          .json({ success: false, message: "User not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
});

export default codechefRouter;
