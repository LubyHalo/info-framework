// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const tableData1 = function (params) {
  let tableData = {}
  let articles = []
  let total = 60
  // let total = Random.natural(10, 60);
  // let postParams = JSON.parse(params.body)
  // let postParams = params.body
  let currentPage = 1 // postParams.currentPage
  let pageSize = 10 // postParams.pageSize
  // console.log(postParams)
  for (let i = 0; i < pageSize; i++) {
    let rows = {
      address: Random.county(true), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(rows)
  }
  tableData = {
    rows: articles,
    total
  }
  return {
    tableData: tableData
  }
}
const tableData2 = function () {
  let tableData = {}
  let articles = []
  for (let i = 0; i < 5; i++) {
    let rows = {
      address: Random.county(true), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(rows)
  }
  tableData = {
    rows: articles,
    total: Random.natural(11, 60)
  }
  return {
    gridData: tableData
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/test/table1', 'post', tableData1)
Mock.mock('/test/table2', 'post', tableData2)
