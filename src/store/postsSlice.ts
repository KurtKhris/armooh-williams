"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "@/types";

interface PostsState {
  items: Post[];
  selected: Post | null;
  loading: boolean;
  error: string | null;
  filter: string;
  searchQuery: string;
}

const initialState: PostsState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
  filter: "all",
  searchQuery: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchAll", async (published?: boolean) => {
  const url = published !== undefined ? `/api/posts?published=${published}` : "/api/posts";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json() as Promise<Post[]>;
});

export const fetchPostBySlug = createAsyncThunk("posts/fetchBySlug", async (slug: string) => {
  const res = await fetch(`/api/posts/${slug}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json() as Promise<Post>;
});

export const createPost = createAsyncThunk("posts/create", async (data: Partial<Post>) => {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json() as Promise<Post>;
});

export const updatePost = createAsyncThunk("posts/update", async ({ id, data }: { id: string; data: Partial<Post> }) => {
  const res = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json() as Promise<Post>;
});

export const deletePost = createAsyncThunk("posts/delete", async (id: string) => {
  const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete post");
  return id;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selected = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPosts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchPosts.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "Error"; })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => { state.selected = action.payload; })
      .addCase(createPost.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updatePost.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
        if (state.selected?.id === action.payload.id) state.selected = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setFilter, setSearchQuery, setSelectedPost, clearError } = postsSlice.actions;
export default postsSlice.reducer;
