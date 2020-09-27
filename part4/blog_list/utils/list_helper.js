const totalLikes = (blogs) => {
	const countTotLikes = (sum, blog) => {
		return sum + blog.likes
	}

	return blogs.length === 0 
		? 0
		: blogs.reduce(countTotLikes, 0)
}

const favoriteBlog = (blogs) => {
	let likesCounter = [];
	blogs.forEach((blog) => {
		likesCounter.push(blog.likes)
	})

	let idx = likesCounter.indexOf(Math.max(...likesCounter))

	return blogs.length === 0 
	? null
	: blogs[idx]
}

module.exports = {
	totalLikes,
	favoriteBlog
}