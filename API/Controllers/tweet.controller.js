import {Tweet} from '../Models';
let tweet_routes = {};

tweet_routes.get_tweets = async (req, res) => {
    try{
        let tweets = await Tweet.find({},{}, { limit: 50, skip: parseInt(req.query.from)})
        return res.status(200).json({tweets})
    } catch (error) {
        return res.status(400).json({error});
    }
}
tweet_routes.get_all_tweets = async (req, res) => {
    try{
        let tweets = await Tweet.find({})
        return res.status(200).json({tweets})
    } catch (error) {
        return res.status(400).json({error});
    }
}

tweet_routes.get_tweet_by_target = async (req, res) => {
    try{
        let target = req.query.target.toLowerCase()
        let insulted = await Tweet.find({target: {$regex: target.toString()}},{}, { limit: 50, skip: parseInt(req.query.from)})

        if(insulted){
            return res.status(200).json({tweets: insulted})
        }else{
            return res.status(400).json({message: "Target not found =/"});
        }
    } catch (error) {
        return res.status(400).json({error});
    }
}

tweet_routes.get_targets = async (req, res) => {
    try{
        let tweets = await Tweet.aggregate([{$group: {_id: "$target", count: {$sum : 1}}}, {$sort: {count: -1}}])
        if(tweets) return res.status(200).json({tweets: tweets})
    } catch (error) {
        return res.status(400).json({error});
    }
}

export { tweet_routes };
