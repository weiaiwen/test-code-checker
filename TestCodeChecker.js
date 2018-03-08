module.exports = function(content, map, meta) {
    const strArr = content.split('\n')
    const testCodeArr = []
    let testZone = false
    let timer = 0
    strArr.map((line, index) => {
        if (/^\s*\/\/t\s*/.test(line)) {
            testZone = true
            testCodeArr.push({
                line: '//t',
                index
            })
            return
        }
        if (testZone) {
            timer++
            if (timer === 11) {
                timer = 0
                testZone = false
                return 
            }
            testCodeArr.push({
                line,
                index
            })
        }
    })
    if (!testCodeArr.length) {
        return
    }
    let warning = '发现测试代码标识!!!\n是不是有不该上传的代码?\n这里展示标识下面的10行代码:\n'
    testCodeArr.map(item => {
        const tmp = `${item.line} - line: ${item.index}\n`
        warning += tmp
    })
    content += `console.warn('${warning}')`
}