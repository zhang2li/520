var app = require("../bin/httpRequest")

//使用说明：
//1、app.get()和app.post()分别为开放get和post 接口，
//2、第一个参数为接口地址，第二个参数为处理函数
//3、对于get传递的参数，使用req.query进行获取
//4、对于post传递的参数，使用req.body进行获取
//5、使用res.send()为响应数据的方法，支持对象，数组，字符串

//demo:

//(1)、使用mockjs生成数据
var Mock = require('../bin/mock.js')
var Random = Mock.Random
Random.cname()
Random.cparagraph()
var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'title': "@cname",
            "content": "@cparagraph"
        }]
    })
    //文章列表接口使用mockjs数据
app.get("/api/getArticle", (req, res) => {

    res.send({
        code: "1000",
        msg: "数据读取成功",
        data: data.list
    })
})


//(2)、使用json文件存储数据

//学生的信息全部在data/students.json中存储，以下接口全部是学生信息的增删改查接口
//提供操作json文件的两个方法，一个是获取json文件内容的getData方法和一个设置json文件内容的setData方法

let { getData, setData } = app
//a、获取所有学生信息
app.get("/api/getStudents", (req, res) => {
    let data = getData("./data/students.json")
    res.send({
        code: "1000",
        msg: "学生信息读取成功",
        data
    })
})

//b、添加学生信息
app.post("/api/addStudents", (req, res) => {
    let data = getData("./data/students.json")
    data.push({
        "id": data.length + 1,
        "name": req.body.name,
        "age": req.body.age,
        "sex": req.body.sex,
        "phone": req.body.phone,
        "email": req.body.email,
        "love": req.body.love,
        "address": req.body.address
    })
    setData("./data/students.json", data)
    res.send({
        code: "1000",
        msg: "学生添加成功"
    })
})