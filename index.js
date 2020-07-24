const dateFormat = require('date-format')

class UniqueInteger {
    base = 15 // 基础长度
    minLength = 22 // 最小长度
    defaultLength = 26 // 推荐长度，默认长度

    prefix(ops) {
        return ops.prefix || dateFormat('yy', new Date())
    }

    random(length = 3) {
        return Math.random().toString().slice(2, 2 + length)
    }

    timestamp() {
        return dateFormat('MMddhhmmssSSS', new Date())
    }

    breakInteger(num) {
        const n1 = parseInt(num / 2)
        const n2 = num - n1
        return [n1, n2]
    }

    create(length = this.defaultLength, ops = {}) {

        if (typeof length === 'number') {
            ops.length = length
        }

        // 检测最小长度
        ops.length = ops.length < this.minLength ? this.minLength : ops.length

        const [len1, len2] = this.breakInteger(ops.length - this.base)

        return [
            this.prefix(ops),
            this.timestamp(),
            this.random(len1),
            this.random(len2),
        ].join('')
    }

    static create() {
        return (new UniqueInteger()).create(...arguments)
    }
}

module.exports = (length, ops) => UniqueInteger.create(length, ops)
