import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Post from "../types/postProps";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_SERVER_URL;

interface PostsState {
  posts: Post[];
  adminChoice: Post;
  popularPosts: Post[];
  latestPost: Post;
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  adminChoice: {} as Post,
  latestPost: {} as Post,
  popularPosts: [],
  loading: true,
};

// Fetch posts
export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const response = await axios.get(`${url}/api/posts`);
  return response.data.data;
});

// Increment post views
export const incrementViews = createAsyncThunk(
  "posts/incrementViews",
  async (id: string) => {
    await axios.put(`${url}/api/posts/${id}/inc`, {
      $inc: { views: 1 },
    });
    return id;
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (ID: string) => {
    const response = await axios.delete(`${url}/api/posts/${ID}`);
    if (response.status === 200) {
      return ID;
    }
  }
);

// Update admin choice
export const updateAdminChoice = createAsyncThunk(
  "posts/updateAdminChoice",
  async (ID: string, { getState }) => {
    const { posts } = (getState() as { posts: PostsState }).posts;
    const previousAdminChoice = posts.find((post) => post.adminChoice);

    await axios.put(`${url}/api/posts/${ID}`, { adminChoice: true });

    if (previousAdminChoice) {
      await axios.put(`${url}/api/posts/${previousAdminChoice._id}`, {
        adminChoice: false,
      });
    }

    return ID;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.adminChoice = action.payload.find((post: Post) => post.adminChoice);
      const sorted = [...state.posts].sort((a, b) => b.views - a.views);
      state.popularPosts = sorted.slice(0, 3);
      state.latestPost = state.posts[state.posts.length - 1];
      state.loading = false;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });
    builder.addCase(incrementViews.fulfilled, (state, action) => {
      const post = state.posts.find((post) => post._id === action.payload);
      if (post) {
        post.views += 1;
      }
    });
    builder.addCase(updateAdminChoice.fulfilled, (state, action) => {
      state.adminChoice =
        state.posts.find((post) => post._id === action.payload) || ({} as Post);
    });
  },
});

export default postsSlice.reducer;
