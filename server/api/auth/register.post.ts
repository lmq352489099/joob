
import joi from 'joi'
import md5 from 'md5'
import { RowDataPacket } from 'mysql2';
import { getDB } from '~/server/utils/db/mysql';
import { responseJson } from '~/server/utils/helper';
/**
 * 
 * 获取客户端数据
 * 
 * 数据检验
 * 
 * 密码加密
 * 
 * 判断账号是否存在
 * 
 * 未注册则注册
 * 
 */

export default defineEventHandler(async (event) => {

  //获取数据
  const body = await readBody(event)
  console.log('body :>> ', body);

  // 校验数据

  const schema = joi.object({
    nickname: joi.string().required(),
    password: joi.string().required(),
    phone: joi.string().pattern(/^1\d{10}$/).required(),

  })

  try {
    const value = await schema.validateAsync(body)
    console.log('value :>> ', value);
  } catch (error) {
    console.log('error :>> ', error);
    return { code: 1, msg: '参数错误', data: error }
  }

  let salt = 'sadadaasda'
  let password = md5(md5(body.password) + salt)

  try {
    const [rows, fields]: [RowDataPacket[], any] = await getDB().execute('SELECT * FROM `users` WHERE `phone`=?', [body.phone])

    // let myArray: number[] = [1, 2];
    // let [value1, value2]: [number, any] = myArray;
    // console.log('value1 :>> ', value1, value2);

    // const [rows] = await getDB().execute('SELECT * FROM users WHERE phone=?', [body.phone]) as RowDataPacket[];


    // const [rows] = await getDB().execute<RowDataPacket[]>('SELECT * FROM `users` WHERE `phone`=?', [body.phone]);

    console.log('rows :>> ', rows);
    if (rows.length > 0) {
      return responseJson(1, '该手机号已注册', {})

    }

    // 创建账号
    const [rows2] = await getDB().execute("insert into `users` (`nickname`,`phone`,`password`) values (?,?,?)", [body.nickname, body.phone, password])
    console.log('rows22222 :>> ', rows2);
    return { code: 1, msg: '注册成功', data: {} }
  } catch (error) {
    console.log('error :>> ', error);
    return responseJson(1, '服务器错误参数错误22', error)
  }

  return {}

})

function helper(arg0: { code: number; msg: string; data: {}; }): any {
  throw new Error('Function not implemented.');
}
