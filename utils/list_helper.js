const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    })
    return sum
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0)
        return 0

    if (blogs.length === 1) {
        return blogs[0]
    }
    let biggest = 0
    let indexOfBiggest
    let counter = 0
    blogs.forEach(blog => {
        if (blog.likes > biggest) {
            biggest = blog.likes
            indexOfBiggest = counter
        }
        counter += 1
    })
    return blogs[indexOfBiggest]
}

module.exports = {
    dummy, totalLikes, favouriteBlog
}