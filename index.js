module.exports = function (content, map, meta) {
    const strArr = content.split('\n')
    const testCodeArr = []
    let testZone = false
    let timer = 0
    let scriptIndex = 0
    strArr.map((line, index) => {
        if (/<script>/.test(line)) {
            scriptIndex = index
        }        
        if (/^\s*\/\/ test\s*/.test(line)) {
            testZone = true
            testCodeArr.push({
                line: '// test',
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
    let consoleWarn = ''
    if (testCodeArr.length) {
        let warning = '发现测试代码标识!!!是不是有不该上传的代码?这里展示标识下面的10行代码:\n'
        testCodeArr.map(item => {
            warning += `${item.line}\n`
        })
        consoleWarn = `console.warn(${JSON.stringify(warning).replace(new RegExp('/', 'g'), '\\/')});`
        if (!scriptIndex) {
            strArr[0] = `${consoleWarn}\n${strArr[0]}`
        } else {
            strArr[scriptIndex] = `<script>\n${consoleWarn}`
        }
        content = strArr.join('\n')
    }
    this.async()(null, content, map, meta)
}