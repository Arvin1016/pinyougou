package com.itheima.sms;

import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * @author : Arvin
 * @project Name : demo
 * @package Name : com.itheima.sms
 * @creation Date: 2019-08-24 20:00
 * @description : 消息监听类
 */
@Component
public class SmsListener {

    @Autowired
    private SmsUtil smsUtil;

    @JmsListener(destination = "sms")
    public void sendSms(Map<String, String> map) {
        try {
            SendSmsResponse response = smsUtil.sendSms(
                    map.get("mobile"),
                    map.get("sign_name"),
                    map.get("template_code"),
                    map.get("param")
            );
            System.out.println("code" + response.getCode());
            System.out.println("Message" + response.getMessage());
            System.out.println("requestId" + response.getRequestId());
            System.out.println("bizId" + response.getBizId());
        } catch (ClientException e) {
            e.printStackTrace();
        }
    }
}
