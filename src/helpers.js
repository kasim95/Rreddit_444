export const parseJson = responseJson => {
    if (responseJson) {
        if (responseJson.data.data.children) {
            console.log("Post API detected for parseJson");
            let children = responseJson.data.data.children;
            return extractPostFromChildren(children);
        }
        else {
            console.log("Comment API detected for parseJson");
            let children = responseJson.data[1].data.children;
            console.log(children);
            return extractCommentsFromJson(children);
        }
    }
    else {
        console.log("No Json object argument in parseJson");
    }
}

export const extractPostFromChildren = responseChildren => {
    if (responseChildren.length >= 0) {
        let counter = 0;
        console.log("extractPostsFromChildren SUCCESS");
        let result = responseChildren.map(child => {
            return ({
                "author": child.data.author,
                "created": child.data.created_utc,
                "id": counter++,
                "name": child.data.name,
                "num_comments": child.data.num_comments,
                "over_18": child.data.over_18,
                "permalink": child.data.permalink,
                "reddit_id":  child.data.reddit_id,
                "selftext": child.data.selftext,
                "selftext_html": child.data.selftext_html,
                "stickied": child.data.stickied,
                "subreddit": child.data.subreddit,
                "title": child.data.title,
                "upvotes": child.data.ups,
                "url": child.data.url,
                "downvotes": child.data.downs
            });
        });
        return result;
    }
    else {
        console.log("extractPostsFromChildren FAILED")
        throw new Error("Children prop in Response Object is not an array");
    }
}


export const extractCommentsFromJson = responseChildren => {
    console.log("i am inside extractComments")
    console.log(responseChildren);
    let result = [];
    responseChildren.forEach(element => {
        let comment = {
            "body": element.data.body,
            "body_html": element.data.body_html,
            "upvotes": element.data.ups,
            "downvotes": element.data.downs,
            "author": element.data.author,
            "reddit_id": element.data.id,
            "replies": []
        };
        if (element.data.replies !== "" && element.data.replies.data.children.length >= 0) {
            comment.replies = extractCommentsFromJson(element.data.replies.data.children)
        }
        else {
            console.log("No replies found", result);
        }
        result.push(comment);
        console.log(result);
    });
    return result;
};
