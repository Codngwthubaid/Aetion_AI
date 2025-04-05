import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const DiscussionRoom = mutation({
    args: { topic: v.string(), topicName: v.string(), masterName: v.string() },

    handler: async (ctx, args) => {
        const discussionRoomDetails = { topic: args.topic, topicName: args.topicName, masterName: args.masterName }
        console.log(discussionRoomDetails);
        const createDiscussionRoom = await ctx.db.insert("DiscussionRoom", { ...discussionRoomDetails })
        return createDiscussionRoom
    }
})