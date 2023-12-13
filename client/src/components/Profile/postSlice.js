import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const initialState = [
    { id:'0', date: sub(new Date(), { minutes: 10 }).toISOString(), displayName: "Austin Stauffer", content: "I've done it!" },
    { id:'1', date: sub(new Date(), { minutes: 5 }).toISOString(), displayName: "Austin Stauffer", content: "The more I say slice, the more I want pizza."},
    { id:'2', date: sub(new Date(), { minutes: 1 }).toISOString(), displayName: "Austin Stauffer", content: "These are all hard coded for now"}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(content, displayName) {
                return {
                    payload: {
                        id: nanoid(),
                        content,
                        displayName,
                        date: new Date().toISOString()
                    }
                }
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer