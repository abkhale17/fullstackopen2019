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

const mostBlogs = (blogs) => {
	var authorSet = new Set()
	var objs = [], obj = {}
	blogs.forEach((blog) => {
		if(!authorSet.has(blog.author)){
			obj = {}
			obj.author = blog.author
			obj.blogs = 1
			objs.push(obj)
			authorSet.add(blog.author)
		} else {
			for (var i = 0; i < objs.length; i++) {
				if(objs[i].author === blog.author) {
					objs[i].blogs += 1
					break
				}
			}
		}
	})
	objs.sort((obj1, obj2) => obj2.blogs - obj1.blogs)
	return objs[0]
}

module.exports = {
	totalLikes,
	favoriteBlog,
	mostBlogs
}