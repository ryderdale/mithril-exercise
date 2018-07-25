const Post = {
  list: function() {
    return m.request({method: "GET", url: "/api/v1/posts"}).then(function (response) {
      return response.results
    });
  }
};

const Application = {
  controller: function() {
    const posts = Post.list();
    return {
      posts,
      submit: (e) => {
        e.preventDefault()
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

      m("form", {class: "post-form", onsubmit: ctrl.submit, method: "post", autocomplete: "off"}, [
        m("div", {class: "row"}, [
          m("label", "Title"),
          m("input", {type: "text", name: "post_title", class: "control", placeholder: "Post Title"}),
        ]),
        m("div", {class: "row"}, [
          m("label", "Text"),
          m("textarea", {name: "post_text", class: "control", placeholder: "Say what you need to say..."}),
        ]),
        m("div", {class: "row"}, [
          m("input", {type: "submit", class: "btn"}),
        ])
      ])

    ]);
  }
};

m.mount(document.getElementById("example"), Application);
