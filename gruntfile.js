module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ["./src/js/main.js"]
		},
		watch: {
			files: ["./src/js/main.js"],
			tasks: ["jshint"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", "watch");
};
