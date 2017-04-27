/**
 * Created by HeymansBreda on 2017/4/17.
 */
var app = new Vue({
	el: '#app',
	data: {
		article: {},
		con: ''
	},
	computed: {
		compiledMarkdown: function () {
			return marked(this.con, { sanitize: true });
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.articles();
		})
	},
	methods: {
		articles: function () {
			axios.get('/article').then((data) => {
				data = data.data;
				if (data.result === "ok" && data.code === "0") {
					this.article = data.data;
				}
			})
		},
		update: _.debounce(function (e) {
			alert(1);
			this.con = e.target.value;
		}, 300)
	}

});
