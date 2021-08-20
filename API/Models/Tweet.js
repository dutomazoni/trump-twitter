import { model, Schema } from 'mongoose';

const tweet = new Schema(
    {
        date: {
            type: String,
            required: true
        },
        target: {
            type: String,
            required: true
        },
        insult: {
            type: String,
            required: true
        },
        tweet: {
            type: String,
            required: true
        },
    }
);
const Tweet = model('Tweet', tweet, 'Tweets');

export { Tweet };
