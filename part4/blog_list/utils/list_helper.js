const totalLikes = (blogs) => {
	const countTotLikes = (sum, blog) => {
		return sum + blog.likes
	}

	return blogs.reduce(countTotLikes, 0)

}

module.exports = {
	totalLikes
}