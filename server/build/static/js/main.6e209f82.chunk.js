(this.webpackJsonprreddit_444=this.webpackJsonprreddit_444||[]).push([[0],{117:function(e,t,a){e.exports=a(155)},122:function(e,t,a){},123:function(e,t,a){},144:function(e,t,a){},145:function(e,t,a){},146:function(e,t,a){},147:function(e,t,a){},149:function(e,t,a){e.exports=a.p+"static/media/logo.4bcb2b49.png"},151:function(e,t,a){},154:function(e,t,a){},155:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(10),l=a.n(o),s=(a(122),a(123),a(18)),c=function(e){return{type:"FETCH_POSTS_FAILURE",error:e}},i=function(e,t){return{type:"FETCH_COMMENTS_FAILURE",postId:e,error:t}},m=function(e){return{type:"SET_SUBREDDIT",subreddit:e}},u=function(e){return{type:"LOGIN_FAILURE",error:e}},d=a(41),f=a.n(d),p=a(61),h=function(e){if(e.length>=0){var t=0;return e.map((function(e){return{author:e.data.author,created_utc:e.data.created_utc,id:t++,media:e.data.media,name:e.data.name,num_comments:e.data.num_comments,over_18:e.data.over_18,permalink:e.data.permalink,reddit_id:e.data.id,selftext:e.data.selftext,selftext_html:e.data.selftext_html,stickied:e.data.stickied,subreddit:e.data.subreddit,title:e.data.title,upvotes:e.data.ups,url:e.data.url,downvotes:e.data.downs}}))}throw new Error("Children prop in Response Object is not an array")},E=function(e){var t=[];return e.forEach((function(e){var a=e.data;if(!a.children){var n=Object(p.a)(Object(p.a)({},a),{},{replies:[]});n.replies=b(a),t.push(n)}})),t},b=function e(t){if(!t.replies)return[];var a=[];return t.replies.data.children.forEach((function(t){if("more"!==t.kind){var n=Object(p.a)(Object(p.a)({},t.data),{},{replies:[]});n.replies=e(t.data),a.push(n)}})),a},g=function(e){return(Math.floor((new Date).getTime()/1e3)-e)/3600},v=function(e){return e<1?"".concat(Math.floor(60*e)," minutes ago"):e<24?"".concat(Math.floor(e)," hours ago"):e<720?"".concat(Math.floor(e/24)," days ago"):e<8640?"".concat(Math.floor(e/720)," months ago"):"".concat(Math.floor(e/8640)," years ago")},N=function(e){var t=document.getElementById(e);t?"none"===t.style.display?t.style.display="block":t.style.display="none":console.log("no div found to toggle ",e)},w=function(e){return e?"null"===e?"":(t=e,(new DOMParser).parseFromString(t,"text/html").documentElement.textContent):e;var t},S=function(e){return function(t){t({type:"FETCH_POSTS_REQUEST"}),f.a.get(e).then((function(e){if(e.status>=200&&e.status<=299){var a=function(e){if(e){if(e.data.data.children){var t=e.data.data.children;return h(t)}console.log("Comment API detected for parseJson")}else console.log("No Json object argument in parseJson")}(e);console.log("Output from parseJson is ",a),t({type:"FETCH_POSTS_SUCCESS",data:a})}else t(c(e.error))})).catch((function(e){t(c(e))}))}},D=function(e,t){return function(a){a(function(e){return{type:"FETCH_COMMENTS_REQUEST",postId:e}}(e)),f.a.get(t).then((function(t){if(t.status>=200&&t.status<=299){var n=function(e){var t=e.data[1].data.children;return E(t)}(t);a(function(e,t){return{type:"FETCH_COMMENTS_SUCCESS",postId:e,commentData:t}}(e,n))}else{var r=t.error;a(i(e,r))}})).catch((function(e){a(i)}))}},y=function(e){return function(t){console.log("I am inside loginUser dispatch fn"),t(function(e){return{type:"LOGIN_REQUEST",user:e}}(e));f.a.post("/loginUser",e).then((function(e){var a;(console.log("I am inside Post req .then",e),e.status>=200&&e.status<=299&&e.data.isLogged)?(console.log("Login User success ",e),e.data.userData&&(a=e.data.userData),t(function(e){return{type:"LOGIN_SUCCESS",userData:e}}(a))):(console.log("Login user authentication failure"),t(u("Login user authentication failure")))})).catch((function(e){console.log("I am inside Post req .catch"),console.error("Login user failed ",e),t(u(e))}))}},_=(a(144),a(184));a(145),a(146);var C=function e(t){if(t.subCommentData){var a=w(t.subCommentData.body_html),n=v(g(t.subCommentData.created_utc)),o=[];t.subCommentData.replies.length>0&&t.subCommentData.replies.forEach((function(t){return o.push(r.a.createElement(e,{key:t.id,subCommentData:t}))}));var l="subCommentBodyDiv_";return t.subCommentData&&(l="subCommentBodyDiv_"+t.subCommentData.id),r.a.createElement(_.a,{className:"bg-dark variant-dark subCommentDiv pt-1"},r.a.createElement("div",{className:"subCommentHeaderDiv",onClick:function(){return N(l)}},r.a.createElement("a",{className:"subCommentAuthor",href:"https://reddit.com/user/".concat(t.subCommentData.author),target:"_blank",rel:"noopener noreferrer"},t.subCommentData.author),r.a.createElement("small",null,"   "+n)),r.a.createElement("div",{className:"subCommentBodyDiv",id:"subCommentBodyDiv_"+t.subCommentData.id},r.a.createElement("div",{className:"subCommentText"},r.a.createElement("p",{id:"subCommentBodyText",className:"subCommentBodyText",dangerouslySetInnerHTML:{__html:a}})),r.a.createElement("div",{className:"subCommentReplies"},o)),document.querySelectorAll("#subCommentBodyText a").forEach((function(e){return e.setAttribute("target","_blank")})))}return r.a.createElement("p",null,"No subcomments")},x=function(e){if(e.commentData){var t=w(e.commentData.body_html),a=v(g(e.commentData.created_utc)),n=[];e.showAll&&e.commentData.replies.length>0&&e.commentData.replies.forEach((function(e){n.push(r.a.createElement(C,{key:e.id,subCommentData:e}))}));var o="commentBodyDiv_";return e.commentData&&(o="commentBodyDiv_"+e.commentData.id),r.a.createElement(_.a,{className:"bg-dark text-white p-2 m-1 rounded commentDiv"},r.a.createElement("div",{className:"commentHeaderDiv",onClick:function(){return N(o)}},r.a.createElement("a",{className:"commentAuthor",href:"https://reddit.com/user/".concat(e.commentData.author),target:"_blank",rel:"noopener noreferrer"},e.commentData.author),r.a.createElement("div",{className:"pl-1 d-inline-block"},r.a.createElement("small",null,a))),r.a.createElement("div",{className:"commentBodyDiv",id:"commentBodyDiv_"+e.commentData.id},r.a.createElement("div",{className:"commentTextDiv"},r.a.createElement("p",{id:"commentBodyText",className:"commentBodyText",dangerouslySetInnerHTML:{__html:t}})),r.a.createElement("div",{className:"commentSubCommentsDiv"},n)),document.querySelectorAll("#commentBodyText a").forEach((function(e){return e.setAttribute("target","_blank")})))}return r.a.createElement(_.a,{className:"bg-dark text-white rounded commentDiv"},r.a.createElement("p",null,"No Comments found"))},O=Object(s.b)((function(e){return{subreddit:e.subreddit,comments:e.comments}}),(function(e){return{fetchCommentsForPostId:function(t,a){e(D(t,a))}}}))((function(e){var t=e.postId,a="https://www.reddit.com/r/".concat(e.subreddit,"/comments/").concat(t,"/.json?");Object(n.useEffect)((function(){return e.fetchCommentsForPostId(t,a)}),[]);var o=[];t in e.comments&&(o=e.comments[t].commentData);var l=[];return o.forEach((function(t){l.push(r.a.createElement(x,{showAll:e.showAll,key:t.id,commentData:t}))})),r.a.createElement("div",{style:{display:"block"}},l.length>0?l:r.a.createElement("p",{style:{fontSize:"12px"}},"No Comments found"))}));var k=function(e){if(e.postData){var t="subCommentsDiv_"+e.postData.reddit_id,a=function(e){var t=v(g(e.postData.created_utc));return r.a.createElement("div",{className:"postheaderDiv pb-3 mb-1"},"Posted by",r.a.createElement("a",{className:"postauthor pl-1",href:"https://reddit.com/user/"+e.postData.author,target:"_blank",rel:"noopener noreferrer"},e.postData.author),r.a.createElement("div",{className:"pl-1 d-inline-block"},r.a.createElement("small",null,t)),r.a.createElement("a",{className:"postredditicon fab fa-reddit fa-2x float-right",href:"https://www.reddit.com"+e.postData.permalink,target:"_blank",rel:"noopener noreferrer"}))},n=function(e){return r.a.createElement("div",{className:"posttitleDiv"},r.a.createElement("p",{className:"posttitle"},e.postData.title))},o=function(e){var t=function(e){return e.url?r.a.createElement("a",{className:"posturl",href:e.url,target:"_blank",rel:"noopener noreferrer"},r.a.createElement("div",{className:"far fa-share-square",rel:"noopener noreferrer"})," "+function(e){var t=e;return t.split("//").length>1&&(t=t.split("//")[1]),"www"===t.split(".")[0]&&(t=t.split(".").slice(1,t.length).join(".")),t}(e.url).slice(0,24)+"..."):null},a=function(e){return r.a.createElement("video",{id:"postMediaVideo",className:"postMediaVideo",controls:!0,muted:!0},r.a.createElement("source",{src:e.media.reddit_video.fallback_url}))},n=function(e){return r.a.createElement("div",{className:"postMediaDiv"},r.a.createElement("img",{className:"postMediaImage",src:e.url,alt:""}))},o=[".gif",".png",".jpg",".jpeg"];if(e.media&&e.media.reddit_video)return e.url.includes("v.redd.it")?r.a.createElement("div",{className:"postMediaDiv"},r.a.createElement(a,{media:e.media})):r.a.createElement("div",null,r.a.createElement(a,{media:e.media}),r.a.createElement(t,{url:e.url}));if(e.url)for(var l=0;l<o.length;l++)if(e.url.includes(o[l]))return r.a.createElement(n,{url:e.url});return r.a.createElement(t,{url:e.url})},l=function(e){var t=w(e.postData.selftext_html);return r.a.createElement("div",{className:"postbodyDiv pb-1 mb-1 mt-1"},r.a.createElement("p",{id:"postbody",className:"postbody",dangerouslySetInnerHTML:{__html:t}}),r.a.createElement(o,{url:e.postData.url,media:e.postData.media}))},s=function(e){return r.a.createElement("div",{className:"postfooterDiv mt-1"},r.a.createElement("div",{className:"postvoteicon fas fa-arrow-circle-up fa-x"})," ",r.a.createElement("small",null,e.postData.upvotes-e.postData.downvotes),r.a.createElement("a",{className:"postcommenticon far fa-comment pt-1 pl-1",href:"#toggleComments",onClick:function(){return N(e.commentsDivId)}}))};return r.a.createElement(_.a,{className:"bg-dark text-white p-2 rounded m-3 postDiv"},r.a.createElement(a,{postData:e.postData}),r.a.createElement(n,{postData:e.postData}),r.a.createElement(l,{postData:e.postData}),r.a.createElement(s,{postData:e.postData,commentsDivId:t}),r.a.createElement("div",{id:t,style:{display:"none"}},r.a.createElement(O,{showAll:e.showAll,postId:e.postData.reddit_id,commentsDivId:t})),document.querySelectorAll("#postbody a").forEach((function(e){return e.setAttribute("target","_blank")})))}return r.a.createElement("h5",null,"No Post data loaded")},T=Object(s.b)((function(e){var t=[];return e.posts.data.forEach((function(e){t.push(e)})),{subreddit:e.subreddit,allPosts:t}}),(function(e){return{dispatchFetchComments:e(D)}}))((function(e){for(var t,a=e.postId,n=0;n<e.allPosts.length;n++)if(a&&e.allPosts[n].reddit_id===a){t=e.allPosts[n];break}return r.a.createElement(k,{showAll:e.showAll,key:a,postData:t})}));var L=Object(s.b)((function(e){var t=[];return e.posts.data.forEach((function(e){t.push(e)})),{data:e.data,error:e.posts.error,subreddit:e.subreddit,filter:e.filter,numPosts:e.numPosts,allPosts:t}}),(function(e){return{fetchPosts:function(t){e(S(t))}}}))((function(e){var t="https://www.reddit.com/r/".concat(e.subreddit,"/").concat(e.filter,"/.json?")+"limit=".concat(e.numPosts);Object(n.useEffect)((function(){return function(t){return e.fetchPosts(t)}(t)}),[e.subreddit,e.filter,e.numPosts]);for(var a=[],o=0;o<e.allPosts.length;o++)a.push(r.a.createElement(T,{showAll:e.showAll,key:o,postId:e.allPosts[o].reddit_id}));return r.a.createElement("div",{className:"row align-content-center",style:{flexDirection:"column"}},a)})),I=(a(147),a(194)),U=a(193),j=a(190),B=a(191),P=a(185),M=Object(s.b)((function(e){return{subreddit:e.subreddit,showSubredditModal:e.showSubredditModal,numPosts:e.numPosts}}),(function(e){return{dispatchSetSubreddit:function(t){return e(m(t))},dispatchShowSubredditModal:function(){return e({type:"SHOW_SUBREDDIT_MODAL"})},dispatchHideSubredditModal:function(){return e({type:"HIDE_SUBREDDIT_MODAL"})},dispatchSetNumPosts:function(t){return e({type:"SET_NUMPOSTS",numPosts:t})}}}))((function(e){return r.a.createElement(j.a,{centered:!0,show:e.showSubredditModal,onHide:e.dispatchHideSubredditModal,backdrop:"static"},r.a.createElement(B.a,{id:"changeSubredditForm",onSubmit:function(t){var a;t.preventDefault(),a=document.getElementById("subredditNumPosts").value<30?document.getElementById("subredditNumPosts").value:30;var n=document.getElementById("subredditName").value;n&&a?(e.dispatchSetNumPosts(a),e.dispatchSetSubreddit(n)):n?e.dispatchSetSubreddit(n):a?e.dispatchSetNumPosts(a):e.dispatchHideSubredditModal()}},r.a.createElement(j.a.Header,{closeButton:!0},r.a.createElement(j.a.Title,null,"Change Subreddit")),r.a.createElement(j.a.Body,null,r.a.createElement(B.a.Control,{type:"text",size:"lg",id:"subredditName",className:"mb-1",placeholder:"Subreddit: "+e.subreddit}),r.a.createElement(B.a.Control,{type:"number",size:"lg",id:"subredditNumPosts",className:"mt-1",placeholder:"Number of Posts (max 30): "+e.numPosts})),r.a.createElement(j.a.Footer,null,r.a.createElement(P.a,{variant:"btn btn-danger",onClick:function(){return e.dispatchHideSubredditModal()}},"Close"),r.a.createElement(P.a,{variant:"btn btn-success",type:"submit","data-dismiss":"modal"},"Save Changes"))))})),F=a(24),R=Object(s.b)((function(e){return{subreddit:e.subreddit,logged:e.logged,filter:e.filter,login:e.login}}),(function(e){return{dispatchFilterBest:function(){return e({type:"FILTER_BEST",filter:"best"})},dispatchFilterHot:function(){return e({type:"FILTER_HOT",filter:"hot"})},dispatchFilterNew:function(){return e({type:"FILTER_NEW",filter:"new"})},dispatchFilterTop:function(){return e({type:"FILTER_TOP",filter:"top"})},dispatchSetSubreddit:function(t){return e(m(t))},dispatchShowSubredditModal:function(){return e({type:"SHOW_SUBREDDIT_MODAL"})},dispatchHideSubredditModal:function(){return e({type:"HIDE_SUBREDDIT_MODAL"})},dispatchLogout:function(){return e({type:"LOGOUT"})}}}))((function(e){var t=function(t){switch(t.target.id){case"best":e.dispatchFilterBest();break;case"hot":e.dispatchFilterHot();break;case"new":e.dispatchFilterNew();break;case"top":e.dispatchFilterTop();break;default:console.log("default filter called")}},n=function(){return r.a.createElement(I.a.Brand,{href:"/",className:"logo"},r.a.createElement("img",{alt:"Rreddit 444",src:a(149),width:"30",height:"30",className:"d-inline-block align-top"}),"  ","Rreddit 444")},o=function(){return r.a.createElement("div",null,r.a.createElement(M,null),r.a.createElement(U.a.Link,{href:"#subreddit",id:"changeSubreddit",onClick:function(t){return e.dispatchShowSubredditModal()}},"r/"+e.subreddit))},l=function(){return e.login.isLogged?r.a.createElement(U.a,null,r.a.createElement(U.a.Link,{href:"#logout",onClick:function(){return e.dispatchLogout()}},"Log Out")):r.a.createElement(U.a,null,r.a.createElement(F.b,{to:"/register",className:"nav-link"},"Register"),r.a.createElement(F.b,{to:"/login",className:"nav-link"},"Log In"))};return r.a.createElement(I.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",variant:"dark"},r.a.createElement(n,null),r.a.createElement(I.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(I.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(U.a,{className:"mr-auto"},r.a.createElement(U.a.Link,{href:"#best",id:"best",onClick:t},"Best"),r.a.createElement(U.a.Link,{href:"#hot",id:"hot",onClick:t},"Hot"),r.a.createElement(U.a.Link,{href:"#new",id:"new",onClick:t},"New"),r.a.createElement(U.a.Link,{href:"#top",id:"top",onClick:t},"Top"),r.a.createElement(o,null)),r.a.createElement(l,null)))}));a(151);var A=function(){return r.a.createElement(_.a,{fluid:!0,className:"footer text-right pt-3 bg-dark text-white"},r.a.createElement("p",{className:"align-right"},"Credits: Kasim Panjri"),r.a.createElement("a",{href:"https://www.github.com/kasim95",className:"footer align-right "},"Github"))},H=a(15),G=a(43),J=a.n(G),q=a(58),W=a(14),Q=a(189),V=a(196),z=a(195),X=a(197),Z=a(192),$=Object(W.b)((function(e){var t=Object(W.c)(e.formik.values),a=Object(W.c)(e.formik.touched),n=Object(W.c)(e.formik.errors),o=Object(W.c)(e.formik.dirty),l=Object(W.c)(e.formik.isSubmitting),s=Object(W.c)(e.formik.handleChange),c=Object(W.c)(e.formik.handleBlur),i=Object(W.c)(e.formik.handleSubmit),m=Object(W.c)(e.formik.handleReset);return r.a.createElement("form",{onSubmit:i},r.a.createElement("div",{className:"d-flex flex-row justify-content-center"},r.a.createElement("div",{className:"\r col-xs-5\r d-flex \r justify-content-center \r flex-column \r m-5\r border \r border-dark \r rounded\r w-xs\r "},r.a.createElement("div",{className:"col-xs-12 m-0 p-1 text-center"},r.a.createElement("h4",null,"Sign up")),r.a.createElement("div",{className:"col-xs-12 m-0 p-2"},r.a.createElement(Q.a,{label:"Email",type:"email",name:"email",onChange:s,onBlur:c,value:t.email,placeholder:"abc@xyz.com",error:a.email,helperText:a.email&&n.email,className:"w-100",variant:"filled",autoComplete:"email"})),r.a.createElement("div",{className:"row m-0"},r.a.createElement("div",{className:"col-xs-12 col-sm-6 p-2"},r.a.createElement(Q.a,{label:"Username",type:"text",name:"username",onChange:s,onBlur:c,value:t.username,placeholder:"Upto 20 characters",error:a.username,helperText:a.username&&n.username,variant:"filled",className:"w-100",color:"secondary",autoComplete:"username"})),r.a.createElement("div",{className:"col-xs-12 col-sm-6 p-2"},r.a.createElement(Q.a,{label:"Password",type:"password",name:"password",onChange:s,onBlur:c,value:t.password,placeholder:"",error:a.password,helperText:a.password&&n.password,variant:"filled",className:"w-100",autoComplete:"password"}))),r.a.createElement("div",{className:"row m-0"},r.a.createElement("div",{className:"col-xs-12 col-sm-6 p-2"},r.a.createElement(Q.a,{label:"First Name",type:"text",name:"firstName",onChange:s,onBlur:c,value:t.firstName,placeholder:"John",error:a.firstName,helperText:a.firstName&&n.firstName,className:"w-100",variant:"filled",autoComplete:"given-name"})),r.a.createElement("div",{className:"col-xs-12 col-sm-6 p-2"},r.a.createElement(Q.a,{label:"Last Name",type:"text",name:"lastName",onChange:s,onBlur:c,value:t.lastName,placeholder:"Smith",error:a.lastName,helperText:a.lastName&&n.lastName,className:"w-100",variant:"filled",autoComplete:"family-name"}))),r.a.createElement("div",{className:"row align-self-center m-0"},r.a.createElement("div",{className:"col-xs-12 col-sm-4 p-2 align-self-center"},r.a.createElement("div",{className:""},"BirthDate"),r.a.createElement("div",null,r.a.createElement(Q.a,{label:"",type:"date",name:"birthdate",onChange:s,onBlur:c,value:t.birthdate,placeholder:"Birthdate",error:a.birthdate,helperText:a.birthdate&&n.birthdate,className:"w-100",variant:"filled",autoComplete:"bday"}))),r.a.createElement("div",{className:"col-xs-12 col-sm-1 align-self-center p-2 pl-4"},"Sex"),r.a.createElement("div",{className:"col-xs-12 col-sm-2 align-self-end p-2"},r.a.createElement(V.a,{name:"sex"},r.a.createElement(z.a,{className:"d-flex flex-row"},r.a.createElement(X.a,{control:r.a.createElement(Z.a,{name:"sex",value:"male",onChange:s,onBlur:c,autoComplete:"sex"}),label:"Male",labelPlacement:"end",className:"m-0 p-0"}),r.a.createElement(X.a,{control:r.a.createElement(Z.a,{name:"sex",value:"female",onChange:s,onBlur:c,autoComplete:"sex"}),label:"Female",labelPlacement:"end",className:"m-0 p-0"}),r.a.createElement(X.a,{control:r.a.createElement(Z.a,{name:"sex",value:"other",onChange:s,onBlur:c,autoComplete:"sex"}),label:"Other",labelPlacement:"end",className:"m-0 p-0"})))),r.a.createElement("div",{className:"col-xs-12 col-sm-5 align-self-center p-2"},r.a.createElement(Q.a,{label:"Reddit Username",type:"text",name:"redditUsername",onChange:s,onBlur:c,value:t.redditUsername,placeholder:"Optional",error:a.redditUsername,helperText:a.redditUsername&&n.redditUsername,className:"w-100",variant:"filled"}))),r.a.createElement("div",{className:"row justify-content-center m-0"},r.a.createElement("div",{className:"col-xs-12 col-sm-6 p-2"},r.a.createElement("button",{type:"submit",disabled:l,className:"btn btn-danger w-100"},"Sign Up")),r.a.createElement("div",{className:"col-xs-12 col-sm-6 p-2"},r.a.createElement("button",{type:"button",disabled:!o||l,onClick:m,className:"btn btn-info w-100"},"Clear"))),r.a.createElement("div",{className:"row justify-content-end m-0 p-2"},"Already have an account?",r.a.createElement(F.b,{to:"/login",className:"pl-1"},"Log In")))))})),K=Object(s.b)((function(e){return{loginInfo:e.login}}),(function(e){return{dispatchLoginUser:function(t){return e(y(t))}}}))((function(e){return r.a.createElement(W.a,{initialValues:{email:"",username:"",password:"",firstName:"",lastName:"",birthdate:"",sex:"",redditUsername:""},validate:function(){var e=Object(q.a)(J.a.mark((function e(t){var a,n,r;return J.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a={},["username","password","email","firstName","lastName","birthdate"].forEach((function(e){t[e]||(a[e]="Required")})),!(t.username&&t.username.length>20)){e.next=7;break}a.username="Username must be maximum 20 characters",e.next=12;break;case 7:if(!t.username){e.next=12;break}return e.next=10,f.a.get("/checkField?username=".concat(t.username));case 10:200===(n=e.sent).status&&n.data&&n.data.fieldExists&&(console.log("I am here"),a.username="".concat(t.username," is already taken"));case 12:if(t.password&&t.password.length<8&&t.password.length>16&&(a.password="Password must be between 8 and 16 characters in length"),!t.email||/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)){e.next=17;break}a.email="Invalid email address",e.next=22;break;case 17:if(!t.email){e.next=22;break}return e.next=20,f.a.get("/checkField?email=".concat(t.email));case 20:200===(r=e.sent).status&&r.data&&r.data.fieldExists&&(a.email="An account already exists with the email ".concat(t.email));case 22:return e.abrupt("return",a);case 23:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),onSubmit:function(){var t=Object(q.a)(J.a.mark((function t(a,n){var r;return J.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=n.setSubmitting,f.a.post("/registerUser",a).then((function(t){console.log("Register User success ",t),e.dispatchLoginUser({username:a.username,password:a.password}),console.log("Logged in after Registration")})).catch((function(e){console.error("Register user failed ",e)})),r(!1),console.log("Register form submmitted ",a);case 4:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},r.a.createElement("div",null,r.a.createElement($,null),e.loginInfo.isLogged?r.a.createElement(H.a,{push:!0,to:"/"}):null))})),Y=(a(154),Object(W.b)((function(e){var t=Object(W.c)(e.formik.values),a=Object(W.c)(e.formik.touched),n=Object(W.c)(e.formik.errors),o=Object(W.c)(e.formik.isSubmitting),l=Object(W.c)(e.formik.handleChange),s=Object(W.c)(e.formik.handleBlur),c=Object(W.c)(e.formik.handleSubmit);return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",{className:"\r d-flex \r flex-row\r justify-content-center\r "},r.a.createElement("div",{className:"\r d-flex\r flex-column\r justify-cotent-center\r w-xs\r "},r.a.createElement("div",{className:"m-0 p-1 text-center"},r.a.createElement("h4",null,"Login page")),r.a.createElement("div",{className:"m-0 p-2 align-self-center"},r.a.createElement(Q.a,{label:"Username",type:"text",name:"username",placeholder:"Username",value:t.username,onChange:l,onBlur:s,error:a.username,helperText:a.username&&n.username,variant:"outlined",className:"w-100",autoComplete:"username"})),r.a.createElement("div",{className:"m-0 p-2 align-self-center"},r.a.createElement(Q.a,{label:"Password",type:"password",name:"password",placeholder:"Username",value:t.password,onChange:l,onBlur:s,error:a.username,helperText:a.username&&n.username,variant:"outlined",className:"w-100",autoComplete:"password"})),r.a.createElement("div",{className:"m-0 p-2 align-self-center"},r.a.createElement("button",{type:"submit",disabled:o,className:"btn btn-success w-100"},"Login")),r.a.createElement("div",{className:"m-0 p-2 text-center"},"Don't have an account.",r.a.createElement(F.b,{to:"\\register",className:"p-1"},"Register")))))}))),ee=Object(s.b)((function(e){return{loginInfo:e.login}}),(function(e){return{dispatchLoginUser:function(t){return e(y(t))}}}))((function(e){return r.a.createElement(W.a,{initialValues:{username:"",password:""},validate:function(e){var t={};return e.username?e.username.length>20&&(t.username="Username cannot be more than 20 characters"):t.username="Username not entered",e.password||(t.password="Password missing"),t},onSubmit:function(){var t=Object(q.a)(J.a.mark((function t(a,n){var r;return J.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=n.setSubmitting,e.dispatchLoginUser(a),r(!1),console.log("Login form submitted ",a);case 4:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},r.a.createElement("div",null,r.a.createElement(Y,null),e.loginInfo.isLogged?r.a.createElement(H.a,{push:!0,to:"/"}):null))}));var te=Object(s.b)((function(e){return{subreddit:e.subreddit,filter:e.filter}}))((function(e){var t={showAll:!1};return r.a.createElement(F.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(R,null),r.a.createElement(H.d,null,r.a.createElement(H.b,{path:"/",exact:!0,render:function(){return r.a.createElement(L,t)}}),r.a.createElement(H.b,{path:"/register",exact:!0,component:K}),r.a.createElement(H.b,{path:"/login",exact:!0,component:ee})),r.a.createElement(A,null)))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ae=a(39),ne={data:[],error:null,isLoading:!1},re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_POSTS_REQUEST":return{data:[],error:null,isLoading:!0};case"FETCH_POSTS_SUCCESS":return{data:t.data,error:null,isLoading:!1};case"FETCH_POSTS_FAILURE":return{data:[],error:t.error,isLoading:!1};default:return e}},oe=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"FETCH_COMMENTS_REQUEST":return(e={})[a.postId]={commentData:[],error:null,isLoading:!0},Object.assign({},t,e);case"FETCH_COMMENTS_SUCCESS":return(e={})[a.postId]={commentData:a.commentData,error:null,isLoading:!1},Object.assign({},t,e);case"FETCH_COMMENTS_FAILURE":return(e={})[a.postId]={commentData:[],error:a.error,isLoading:!1},Object.assign({},t,e);default:return t}},le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"funny",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SUBREDDIT":return t.subreddit;default:return e}},se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"hot",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FILTER_BEST":return"best";case"FILTER_HOT":return"hot";case"FILTER_NEW":return"new";case"FILTER_TOP":return"top";default:return e}},ce=function(){var e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SHOW_SUBREDDIT_MODAL":return!0;case"HIDE_SUBREDDIT_MODAL":default:return!1}},ie=JSON.parse(localStorage.getItem("user")),me=ie?{isLogging:!1,isLogged:!1,error:null,user:ie,userData:null}:{},ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_REQUEST":return{isLogging:!0,isLogged:!1,user:t.user,userData:null};case"LOGIN_SUCCESS":return{isLogging:!1,isLogged:!0,userData:t.userData};case"LOGIN_FAILURE":return{isLogging:!1,isLogged:!1,error:t.error};case"LOGOUT":return{isLogging:!1,isLogged:!1,user:null,userData:null};default:return e}},de=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_NUMPOSTS":return t.numPosts;default:return e}},fe=Object(ae.c)({posts:re,subreddit:le,filter:se,comments:oe,showSubredditModal:ce,login:ue,numPosts:de}),pe=a(109),he=Object(ae.e)(fe,Object(ae.d)(Object(ae.a)(pe.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));l.a.render(r.a.createElement(s.a,{store:he},r.a.createElement(te,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[117,1,2]]]);
//# sourceMappingURL=main.6e209f82.chunk.js.map