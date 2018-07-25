const Post = {
  list: function() {
    return m.request({method: "GET", url: "/api/v1/posts"})
    .then(function (response) {
      return response.results
    });
  }
};

const Application = {
  controller: function() {
    var ctrl = this;
    ctrl.title = '';
    ctrl.text = '';
    const posts = Post.list();
    return {
      posts,
      submit: (e) => {
        e.preventDefault();
        m.request({method: "POST", url: "/api/v1/posts", data: {title: ctrl.title, text:ctrl.post_text} })
        .then(function (response) {
          console.log('Post response', response)
        });
      }
    }
  },

  view: function(ctrl) {
    return m("div", [

      m("ul", {class: "container"}, [
        ctrl.posts().map(function(post) {
          return m("li", {class: "post"}, m("a", {href: `/api/v1/posts/${post.id}`}, post.title))
        }),
      ]),

      m("form", {class: "post-form", onsubmit: ctrl.submit, method: "post", autocomplete: "off", name:"form"}, [
        m("div", {class: "row"}, [
          m("label", "Title"),
          m("input", {type: "text", name: "post_title", id:"title", class: "control", placeholder: "Post Title", value: ctrl.title,
            onchange: (e) => {
             ctrl.title = e.currentTarget.value; 
            }},),
        ]),
        m("div", {class: "row"}, [
          m("label", "Text"),
          m("textarea", {name: "post_text", class: "control", id:"textarea", placeholder: "Say what you need to say...", value: ctrl.post_text, 
            onchange: (e) => {
              ctrl.post_title = e.currentTarget.value;
            }}),
        ]),
        m("div", {class: "row"}, [
          m("input", {type: "submit", class: "btn", id:"submitBook"}),
        ])
      ])

    ]);
  }
};

// function submitTitle () {
//   let submitBook = document.getElementById('submitBook');
//   body = {};
  
//   if (document.getElementById('title')) {
//     body.title = document.getElementById('title').value
//   };
//   if (document.getElementById('textarea')) {
//     body.textarea = document.getElementById('textarea').value
//   };
//   url = "/posts";
//   fetch(url, body); 
// }
  



m.mount(document.getElementById("example"), Application);
