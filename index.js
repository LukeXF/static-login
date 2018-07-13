var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!'
	}
});

var app6 = new Vue({

	el: '#app-6',
	data: {
		message: 'Hello Vue!',
		user: {}
	},
	// define methods under the `methods` object
	methods: {
		greet: function (event) {

			netlifyIdentity.open();
			if (event !== null) {
				console.log('event', event);
				console.log('net', netlifyIdentity.currentUser());
				this.user = netlifyIdentity.currentUser();

				console.log("user", this.user.email);
				console.log('hi2');
			} else {
				console.log('no event');
			}
		}
	}
});

netlifyIdentity.on("init", user => {
	console.log('init');
	app6.greet(user) // => 'Hello Vue.js!'
});


netlifyIdentity.on("login", user => {
	app6.greet(user);
	console.log(user);
});
netlifyIdentity.on("logout", () => {
	app6.greet(user);
	console.log("Logged out");
});
netlifyIdentity.on("error", err => {
	app6.greet(user);
	console.error("Logged out");
});
// netlifyIdentity.on("open", () => {
// 	app6.greet(user);
// 	console.log("Widget opened");
// });
netlifyIdentity.on("close", () => {
	app6.greet(user);
	console.log("Widget closed");
});