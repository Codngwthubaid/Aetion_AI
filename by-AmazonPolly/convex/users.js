import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string()
    },
    handler: async (ctx, args) => {
        // if user exists 
        const checkUserExistance = await ctx.db.query("users").filter(q => q.eq(q.field("email"), args.email)).collect();
        console.log(checkUserExistance);

        // if user don't exist - create user 
        if (checkUserExistance.length === 0) {
            const userDetails = { name: args.name, email: args.email, credits: 10000 }
            const createUser = await ctx.db.insert("users", { ...userDetails })
            console.log(createUser);
            return userDetails
        } else {
            return checkUserExistance[0]
        }

    }
})

