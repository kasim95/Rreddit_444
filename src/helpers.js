export const parseJson = responseJson => {
    if (responseJson) {
        if (responseJson.data.data.children) {
            //console.log("Post API detected for parseJson");
            let children = responseJson.data.data.children;
            return extractPostFromChildren(children);
        }
        else {
            // bad logic (delete this later)
            console.log("Comment API detected for parseJson");
            // let children = responseJson.data[1].data.children;
            // console.log(children);
            // return extractCommentsFromJson(children);
        }
    }
    else {
        console.log("No Json object argument in parseJson");
    }
}

export const extractPostFromChildren = responseChildren => {
    if (responseChildren.length >= 0) {
        let counter = 0;
        //console.log("extractPostsFromChildren SUCCESS");
        let result = responseChildren.map(child => {
            return ({
                "author": child.data.author,
                "created_utc": child.data.created_utc,
                "id": counter++,
                "name": child.data.name,
                "num_comments": child.data.num_comments,
                "over_18": child.data.over_18,
                "permalink": child.data.permalink,
                "reddit_id":  child.data.id,
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
        //console.log("extractPostsFromChildren FAILED")
        throw new Error("Children prop in Response Object is not an array");
    }
}

// // todo: integrate parseJsonComments into parseJson after logic is corrected for parseJson
// export const parseJsonComments = responseJson => {
//     console.log("parseJsonComments called");
//     let children = responseJson.data[1].data.children;
//     console.log("parseJsonComments - children: ", children);
//     let res = extractCommentsFromJson(children);
//     console.log("parseJsonComments result: ", res);
//     return res;
// }

// export const extractCommentsFromJson = responseChildren => {
//     // console.log("i am inside extractComments, responseChildren: ", responseChildren)
//     let result = [];
//     responseChildren.forEach(element => {
//         let comment = {
//             "body": element.data.body,
//             "body_html": element.data.body_html,
//             "upvotes": element.data.ups,
//             "downvotes": element.data.downs,
//             "author": element.data.author,
//             "reddit_id": element.data.id,
//             "replies": []
//         };
//         if (element.data.replies !== "" && element.data.replies.data.children.length > 0) {
//             console.log(element.data.replies.data.children.length +" comments found")
//             comment.replies = extractCommentsFromJson(element.data.replies.data.children)
//         }
//         result.push(comment);
//     });
//     console.log("Comment result in extractCommentsFromJson is ",result);
//     console.log("Result returned");
//     return result;
// };

export const parseJsonComments = responseJson => {
    let children = responseJson.data[1].data.children;
    return getComments(children);
}

const getComments = comments => {
    let allComments = [];
    comments.forEach(({data: element}) => {
        // check if the passed element is not a post or subcomment
        if (!element.children) {
            let comment = {...element, replies:[]} // initialize replies to none
            comment.replies = getCommentReplies(element);
            allComments.push(comment)
        }
    })
    return allComments;
}

export const getCommentReplies = subcomments => {
    if (!subcomments.replies) {
        return [];
    }
    let result = [];
    const children = subcomments.replies.data.children;
    children.forEach(element => {
        if (element.kind !== "more") {
            let reply = {...element.data, replies:[]};
            reply.replies = getCommentReplies(element.data);
            result.push(reply);
        }
    })
    return result;
}

// return time difference between created_time and current time in hours
export const getTimeDiff = created_time => {
    const currentTimeUTC = Math.floor(((new Date()).getTime()) / 1000)
    return ((currentTimeUTC - created_time) / (60 * 60))
}

// return time difference between created_time and cureent time in years, months, days, hours and minutes
export const convertHoursToText = timeDiffHours => {
    if (timeDiffHours < 1) return `${Math.floor(timeDiffHours * 60)} minutes ago`;
    else if (timeDiffHours < 24) return `${Math.floor(timeDiffHours)} hours ago`;
    else if (timeDiffHours < (24 * 30)) return `${Math.floor(timeDiffHours / 24)} days ago`;
    else if (timeDiffHours < (24 * 30 * 12)) return `${Math.floor(timeDiffHours / (24 * 30))} months ago`;
    else return `${Math.floor(timeDiffHours / (24 * 30 * 12))} years ago`;

}

// handleonClick hide events
export const toggleDiv = idDiv  => {
    let div = document.getElementById(idDiv);
        if (div) {
            if (div.style.display === "none") div.style.display = "block";
            else div.style.display = "none";    
        }
    else console.log("no div found to toggle ", idDiv);
}

// convert HTML Entity References to text
export const decodeHTMLEntities = html => {
    var doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent;
}

// Convert links in text to anchor tags
// THIS FUNCTION IS NOT USED (CAN DELETE)
// https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
export const linkify = inputText => {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    // URLs starting with http://, https://, or ftp://
    // eslint-disable-next-line
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
    
    // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    // eslint-disable-next-line
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    // Change email addresses to mailto:: links.
    // eslint-disable-next-line
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}
