import postModel from "./models/postModel.js";
import mongoose from "mongoose";
import "dotenv/config";

// database connection
mongoose.connect(process.env.DATABASE_URL).then(() => {
  const env = process.env.NODE_ENV || "Development";
  console.log(`Database Connected to ${env} environment`);
});

async function migrateImageFieldToImagesArray() {
  try {
    // Find all posts that have an 'image' field
    const postsWithImage = await postModel.find({
      images: { $exists: true, $ne: null },
    });

    for (const post of postsWithImage) {
      const imageUrl = post.images[0];

      // Push the image string into the 'images' array and delete 'image' field
      post.image = imageUrl;
      post.images = undefined;

      await post.save();
    }

    console.log(`Migrated ${postsWithImage.length} posts.`);
  } catch (err) {
    console.error("Migration error:", err);
  }
}

// migrateImageFieldToImagesArray();

mongoose.disconnect();
