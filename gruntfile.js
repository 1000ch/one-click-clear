module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ["./js/main.js"]
		},
		watch: {
			files: ["./js/main.js"],
			tasks: ["jshint"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", "watch");
};
