import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostProps, { PostsState } from "../types/postProps";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_SERVER_URL;

const initialState: PostsState = {
  post: {
    post: {} as PostProps,
    relatedPosts: [],
  },
  posts: {
    postList: [],
    totalPages: 1,
  },
  selectedPosts: {
    adminChoice: {} as PostProps,
    latestPost: {} as PostProps,
    popularPosts: [],
  },
  loading: true,
  error: null,
};

// fetch admin posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number) => {
    try {
      const response = await fetch(`${url}/api/posts/page/${page}`);
      const { data, totalPages }: { data: PostProps[]; totalPages: number } =
        await response.json();

      return { postList: data, totalPages };
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  }
);

// Fetch filtered posts
export const fetchSelectedPosts = createAsyncThunk("posts/fetch", async () => {
  const response = await axios.get(url + "/api/posts/filter");
  return response.data.data;
});

// Fetch post and related posts
export const fetchPost = createAsyncThunk(
  "posts/post",
  async (postId: string) => {
    const response = await axios.get(url + "/api/posts/" + postId);
    return response.data.data;
  }
);

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
    const previousAdminChoice = posts.postList.find((post) => post.adminChoice);

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
      state.posts = action.payload ?? { postList: [], totalPages: 0 };
    });
    builder.addCase(fetchSelectedPosts.fulfilled, (state, action) => {
      state.selectedPosts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(fetchPost.rejected, (state) => {
      state.error = "Error";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts.postList = state.posts.postList.filter(
        (post) => post._id !== action.payload
      );
    });
    // builder.addCase(incrementViews.fulfilled, (state, action) => {
    //   const post = state.posts.postList.find(
    //     (post) => post._id === action.payload
    //   );
    //   if (post) {
    //     post.views += 1;
    //   }
    // });
    // builder.addCase(updateAdminChoice.fulfilled, (state, action) => {
    //   state.adminChoice =
    //     state.posts.find((post) => post._id === action.payload) || ({} as PostProps);
    // });
  },
});

export default postsSlice.reducer;
