const { poolPromise, sql } = require('../config/db');

const sendSMS = async (userData) => {
  const pool = await poolPromise;
  const request = pool.request();
  userData['senttime']= new Date();
  userData['receivedtime']=  new Date();
  userData['status']='send';
  userData['operator']='ETH-MTN';
  userData['msgtype']='SMS:TEXT';
  userData['sender'] = '+251802';
  request.input("sender", sql.NVarChar, userData.sender);
  request.input("receiver", sql.NVarChar, userData.receiver);
  request.input("msg", sql.NVarChar, userData.msg);
  request.input("senttime", sql.DateTime, userData.senttime);
  request.input("receivedtime", sql.DateTime, userData.receivedtime);
  request.input("operator", sql.NVarChar, userData.operator);
  request.input("msgtype", sql.NVarChar, userData.msgtype);
  request.input("status", sql.NVarChar, userData.status);

  await request.query(`
    INSERT INTO ozekimessageout (sender, receiver, senttime, receivedtime, msg, operator, msgtype, status)
    VALUES (@sender, @receiver, @senttime, @receivedtime, @msg, @operator, @msgtype, @status);
  `);
};

module.exports = { sendSMS };