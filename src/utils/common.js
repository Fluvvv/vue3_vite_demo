import JsEncrypt from 'jsencrypt'
/**
 * 将url上的参数拆分
 * @returns
 */
export const GetRequest = () => {
  let url = location.search //获取url中"?"符后的字串
  let theRequest = new Object()
  if (url.indexOf('?') != -1) {
    let str = url.substr(1)
    let strs
    strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}
//过滤字典数据
export const getLabel = (val, list) => {
  let arr = list?.filter((e) => {
    return val === e.id
  })
  if (arr?.length === 0) return '-'
  if (arr?.length) {
    return arr[0].name || '-'
  }
}
//过滤树字典数据
export const getTreeLabel = (val, list) => {
  console.log('list', list)
  console.log('val', val)
  let name = ''
  let recursionData = (list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == val) {
        return (name = list[i].name)
      } else {
        if (list[i].child) {
          recursionData(list[i].child)
        }
      }
    }
  }
  recursionData(list)
  return name
}
/**
 * rsa密码加密
 * @param {*} time
 * @param {*} cFormat
 * @returns
 */
export function setRsaEncrpty(str, key) {
  // 注册方法
  let pubKey = key // rsa 公钥
  let encryptStr = new JsEncrypt()
  console.log(encryptStr)
  encryptStr.setPublicKey(pubKey) // 设置 加密公钥
  let data = null
  if (typeof str === 'string') data = encryptStr.encrypt(str.toString())
  // 进行加密
  else data = encryptStr.encrypt(JSON.stringify(str)) // 进行加密

  return data
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}')
}

/**
 * 格式化时间
 */
export function formatDate(date, format) {
  if (!date) {
    return ''
  }

  let d = new Date(date)

  // 年
  if (/YYYY/.test(format)) {
    format = format.replace(/YYYY/, d.getFullYear())
  }
  // 月份
  let month = d.getMonth() + 1
  if (/MM/.test(format)) {
    let monthStr = month < 10 ? '0' + month : month
    format = format.replace(/MM/, monthStr)
  } else if (/M/.test(format)) {
    format = format.replace(/M/, month)
  }
  // 日期
  let dates = d.getDate()
  if (/DD/.test(format)) {
    let dateStr = dates < 10 ? '0' + dates : dates
    format = format.replace(/DD/, dateStr)
  } else if (/D/.test(format)) {
    format = format.replace(/D/, dates)
  }
  // 小时
  let hours = d.getHours()
  if (/HH/.test(format)) {
    let hoursStr = hours < 10 ? '0' + hours : hours
    format = format.replace(/HH/, hoursStr)
  } else if (/H/.test(format)) {
    format = format.replace(/H/, hours)
  } else if (/hh/.test(format)) {
    let hoursMin = hours > 12 ? hours - 12 : hours
    let hoursStr = hoursMin < 10 ? '0' + hoursMin : hoursMin
    format = format.replace(/hh/, hoursStr)
  } else if (/h/.test(format)) {
    let hoursMin = hours > 12 ? hours - 12 : hours
    format = format.replace(/h/, hoursMin)
  }
  // 分
  let minutes = d.getMinutes()
  if (/mm/.test(format)) {
    let minutesStr = minutes < 10 ? '0' + minutes : minutes
    format = format.replace(/mm/, minutesStr)
  } else if (/m/.test(format)) {
    format = format.replace(/m/, minutes)
  }
  // 秒
  let seconds = d.getSeconds()
  if (/ss/.test(format)) {
    let secondsStr = seconds < 10 ? '0' + seconds : seconds
    format = format.replace(/ss/, secondsStr)
  } else if (/s/.test(format)) {
    format = format.replace(/s/, seconds)
  }
  return format
}

/**
 * 验证电子邮箱格式
 */
export function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}
/**
 深度克隆/拷贝
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
/**
 * 验证手机格式
 */
export function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value)
}

/**
 * 验证URL格式
 */
export function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(
    value
  )
}

/**
 * 验证日期格式
 */
export function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 验证ISO类型的日期格式
 */
export function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 验证十进制数字
 */
export function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}

/**
 * 验证整数
 */
export function digits(value) {
  return /^\d+$/.test(value)
}

/**
 * 验证身份证号码
 */
export function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
}

/**
 * 金额,只允许2位小数
 */
export function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}

/**
 * 中文
 */
export function chinese(value) {
  let reg = /^[\u4e00-\u9fa5]+$/gi
  return reg.test(value)
}

/**
 * 只能输入字母
 */
export function letter(value) {
  return /^[a-zA-Z]*$/.test(value)
}

/**
 * 只能是字母或者数字
 */
export function enOrNum(value) {
  //英文或者数字
  let reg = /^[0-9a-zA-Z]*$/g
  return reg.test(value)
}

/**
 * 验证是否包含某个值
 */
export function contains(value, param) {
  return value.indexOf(param) >= 0
}

/**
 * 验证一个值范围[min, max]
 */
export function range(value, param) {
  return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
export function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1]
}

/**
 * 判断是否为空
 */
export function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
      break
    case 'boolean':
      if (!value) return true
      break
    case 'number':
      if (0 === value || isNaN(value)) return true
      break
    case 'object':
      if (null === value || value.length === 0) return true
      for (var i in value) {
        return false
      }
      return true
  }
  return false
}

/**
 * 是否json字符串
 */
export function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return false
}

/**
 * 是否数组
 */
export function array(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}

/**
 * 是否对象
 */
export function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/* element-ui级联单选回显 */

export function changeDetSelect(key, treeData) {
  let arr = [] // 在递归时操作的数组
  let returnArr = [] // 存放结果的数组
  let depth = 0 // 定义全局层级
  // 定义递归函数
  function childrenEach(childrenData, depthN) {
    for (var j = 0; j < childrenData.length; j++) {
      depth = depthN // 将执行的层级赋值 到 全局层级
      arr[depthN] = childrenData[j].id
      if (childrenData[j].id == key) {
        returnArr = arr.slice(0, depthN + 1) //将目前匹配的数组，截断并保存到结果数组，
        break
      } else {
        if (childrenData[j].child) {
          depth++
          childrenEach(childrenData[j].child, depth)
        }
      }
    }
    return returnArr
  }
  return childrenEach(treeData, depth)
}
/* element-ui级联多选选回显 */
export function changeDetSelectMore(keys, treeData) {
  let echoTreeArr = []
  let eachAry = JSON.parse(JSON.stringify(keys))
  let itemAry = [] //分类树组件，每一项的id数组
  // 递归分类数据
  let recursionCategory = (data) => {
    let len = data.length
    for (let i = 0; i < len; i++) {
      //循环data参数，匹配回显的id
      itemAry.push(data[i].id) //构建分类树数组项,入栈
      for (let j = 0; j < eachAry.length; j++) {
        //遍历子节点分类id，拼凑成数组项id，并终止循环
        if (eachAry[j] == data[i].id) {
          //匹配到子节点id
          echoTreeArr.push(JSON.parse(JSON.stringify(itemAry))) //push进树分类数据
          eachAry.splice(j, 1) //删除以匹配到的id
          break
        }
      }
      if (eachAry.length <= 0) {
        //所有回显id匹配完成后，跳出循环
        break
      } else if (data[i].child && data[i].child.length > 0) {
        // 如果存在子分类，递归继续
        recursionCategory(data[i].child)
      }
      itemAry.pop() //出栈
    }
  }
  recursionCategory(treeData) //调用递归
  return echoTreeArr
}

//js根据对象数组中某一属性值，合并相同项，并对某一属性累加处理
export function mergeSomeCumulativeDifferent(arr, key, num) {
  let list = arr.reduce(function (total, cur, index) {
    let hasValue = total.findIndex((current) => {
      return current[key] === cur[key]
    })
    hasValue === -1 && total.push(cur)
    num.forEach((item) => {
      hasValue !== -1 &&
        (total[hasValue][item] = !isNaN(total[hasValue][item] + cur[item]) ? total[hasValue][item] + cur[item] : total[hasValue][item] || cur[item])
    })
    return total
  }, [])
  return list
}

export function keepTwoDecimalFull(num, type, bit) {
  // num值  type 输出int类型  bit 保留多少位小数
  //保留两位小数
  var result = parseFloat(num)
  if (isNaN(result)) {
    //  console.log('传递参数错误，请检查！')
    return false
  }
  result = Math.round(num * 100) / 100
  var s_x = result.toString()
  var pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  //   默认保留2位
  while (s_x.length <= pos_decimal + (bit ? bit : 2)) {
    s_x += '0'
  }
  if (type === 'number') {
    s_x = parseFloat(s_x)
  }
  return s_x
}

/**
 * @deprecated 下载文件
 * @param {string} url
 * @param {string} filename
 */
export function handleFileDownload(url, filename, className) {
  function getExt(filePath) {
    //获取最后一个.的位置
    var index = filePath.lastIndexOf('.')
    //获取后缀
    var ext = filePath.substr(index)
    return ext
  }
  // 创建 a 标签
  let a = document.createElement('a')
  let name = filename
  if (filename.indexOf('.') === -1) {
    name = filename + getExt(url)
  }
  a.href = url
  a.download = name
  //   a.target = '_blank'
  a.className = className ? className : 'downLoad-file-class'
  document.body.appendChild(a)
  a.click()
  //释放空间
  setTimeout(() => {
    let son = document.getElementsByClassName(a.className)
    for (let i = 0; i < son.length; i++) {
      document.body.removeChild(son[i])
    }
  }, 100)
}

/**
 * @deprecated 处理 pdf url，使其不在浏览器打开
 * @param {string} url
 */
export function handlePdfLink(url, filename) {
  fetch(url, {
    method: 'get',
    responseType: 'arraybuffer'
  })
    .then(function (res) {
      if (res.status !== 200) {
        return res.json()
      }
      return res.arrayBuffer()
    })
    .then((blobRes) => {
      // 生成 Blob 对象，设置 type 等信息
      const e = new Blob([blobRes], {
        type: 'application/octet-stream',
        'Content-Disposition': 'attachment'
      })
      // 将 Blob 对象转为 url
      const link = window.URL.createObjectURL(e)
      handleFileDownload(link, filename)
    })
    .catch((err) => {
      console.error(err)
    })
}

/**
 * @deprecated 字符串循环拼接
 * @param {Array,String} arr key
 */
export function getTextByJs(arr, key) {
  var str = ''
  for (var i = 0; i < arr.length; i++) {
    str += arr[i][key] + ','
  }
  //去掉最后一个逗号(如果不需要去掉，就不用写)
  if (str.length > 0) {
    str = str.substr(0, str.length - 1)
  }
  return str
}

// 正则验证
export const regulars = {
  //座机电话
  contactPhoneReg: /\d{3}-\d{8}|\d{4}-\d{7}|\d{3}\d{8}|\d{4}\d{7}/,
  //手机号码
  phoneReg: /^1[3|5|7|8|9]\d{9}$/,
  //传真
  faxReg: /\d{3}-\d{8}|\d{4}-\d{7}|\d{3}\d{8}|\d{4}\d{7}/,
  //银行卡号
  bankNoReg: /^\d{13,19}$/,
  //身份证号正则
  IDNumberReg: /^(\d{6}(18|19|20)\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x))|(\d{8}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3})$/,
  //邮箱正则
  EmalReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  //联行号
  bankNumberReg: /^\d{12}$/,
  //邮政编码正则
  postalCodeReg: /^[1-9][0-9]{5}$/,
  //密码正则
  passwordReg: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{8,16}$/,
  //密码正则2
  password2Reg: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/,
  //用户名正则
  userNameReg: /^[a-zA-Z0-9_-]{1,16}$/
}

//{ fileName:'xxxx.xlsx' , fileStream:'文件流' , className:'class类名（可传可不传）'}
export function exportFile({ fileName, fileStream, className }) {
  let blob = new Blob([fileStream]) // 新建一个Bolb
  let href = URL.createObjectURL(blob)
  const link = document.createElement('a') //生成a标签用于模拟下载
  link.download = fileName //自定义下载文件名称
  link.href = href //把生成的href赋值到a标签上，在这里我遇到一个问题，
  link.className = className ? className : 'export-file-class'
  document.body.appendChild(link)
  link.click()
  //释放空间
  setTimeout(() => {
    let son = document.getElementsByClassName(link.className)
    for (let i = 0; i < son.length; i++) {
      document.body.removeChild(son[i])
    }
  }, 100)
}
