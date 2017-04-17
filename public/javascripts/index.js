/**
 * Created by HeymansBreda on 2017/4/17.
 */
var app = new Vue({
	el: '#app',
	data: {
		article: {}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.articles();
		})
	},
	methods: {
		articles: function(){
			axios.get('/article').then(function(data){
				this.article = data.data;
			})
		}
	}

});
