"ui";
var SO = new scriptObject()
threads.start(悬浮窗)
SO.配置信息 = "/sdcard/Music/config.txt"
SO.话术路径 = "/sdcard/laojiuapp/huashu.txt"
SO.去重文件 = "/sdcard/Music/quchong.txt"
SO.用于交互用户名 = "/sdcard/laojiuapp/username/"
SO.项目 = 80121
if (files.exists(SO.配置信息)) {
} else {
    writeFile(SO.配置信息, "a1|30|||||||||||||||||||||||||||||||||")
}
if (auto.service == null) {
    app.startActivity({
        action: "android.settings.ACCESSIBILITY_SETTINGS"
    });
} else {
    scriptUI()
}
function scriptUI() {
    ui.statusBarColor("#FFFFF0")
    ui.layout(
        <frame>
            <vertical >
                <text size="24p" layout_gravity="center" w="auto" h="auto" marginTop="60">微妙脚本</text>
                <button id="运行脚本" textColor="white" bg="#008B00" gravity="center" textStyle="bold" h="100px" size="22sp" marginTop="20" marginRight="20" marginLeft="20" text="运行脚本" />
                <horizontal marginRight="20" marginTop="20" gravity="center" marginLeft="20">
                    <text size="14sp" text="话术文件:"></text>
                    <input size="18sp" id="界面_话术文件" textColor="red" gravity="center" textStyle="bold" hint="                                                        " ></input>
                </horizontal>
                <horizontal marginRight="20" marginTop="20" gravity="center" marginLeft="20">
                    <text size="14sp" text="自己男号:"></text>
                    <input size="18sp" id="界面_自己男号" textColor="red" gravity="center" textStyle="bold" hint="                                                        " ></input>
                </horizontal>
                <horizontal marginRight="20" marginTop="20" gravity="center" marginLeft="20">
                    <checkbox size="14sp" id="界面_测试" text="男号测试" />
                </horizontal>
                <horizontal marginTop="120" gravity="center">
                    <text size="14sp" id="设备编号" textColor="#999999"  ></text>
                </horizontal>
                <horizontal gravity="center" marginTop="10" >
                    <text size="14sp">使用此软件代表同意</text>
                    <text size="14sp" id="用户协议" textStyle="bold" text=" 用户协议 ">  </text>
                    <text size="14sp">和</text>
                    <text size="14sp" id="隐私政策" textStyle="bold" text=" 隐私政策 ">  </text>
                </horizontal>
            </vertical>
        </frame>
    )
    配置界面()
    ui.用户协议.on("click", () => {
        mytoast("用户协议，详情请访问官网")
    })
    ui.隐私政策.on("click", () => {
        mytoast("隐私政策，详情请访问官网")
    })
    function 配置界面() {
        ui.设备编号.setText(device.width + "x" + device.height + " © 11010337")
        SO.str = readFile(SO.配置信息)
        SO.str = SO.str.split("|")
        try {
            ui.界面_话术文件.setText(SO.str[0])
            ui.界面_自己男号.setText(SO.str[1])
        } catch (error) {
            mytoast("读取UI配置时出错了" + error)
        }
    }

    ui.运行脚本.on("click", () => {
        threads.shutDownAll()
        更新配置()
        mytoast("开始执行脚本")
        threads.start(main)
    })
    function 更新配置() {
        writeFile(SO.配置信息,
            ui.界面_话术文件.getText() + "|" +
            ui.界面_自己男号.getText() + "|" +
            +"||||||")
    }
}
function main() {
    threads.start(弹窗线程)
    app.launchPackage("com.miui.miuibbs")
    sleep(3000)
    shell("am force-stop com.project.nduyuanyuzhou", true)
    sleep(1500)
    shell("pm grant com.project.nduyuanyuzhou android.permission.ACCESS_FINE_LOCATION", true)
    sleep(1500)
    app.launchPackage("com.project.nduyuanyuzhou")
    var i = 30
    while (true) {
        if (text("附近").exists() && text("聊天").exists()) {
            mytoast("这是个活号")
            mySleep()
            运行方式_跑号()
            break
        } else if (text("用户协议和隐私政策").exists() || text("使用手机号登录").exists()) {
            mytoast("这是个空号")
            mySleep()
            运行方式_注册()
            i = 7
        } else if (i < 1) {
            mytoast("打开失败，尝试重新打开(微妙)")
            shell("am force-stop com.project.nduyuanyuzhou", true)
            sleep(3000)
            app.launchPackage("com.project.nduyuanyuzhou")
            i = 24
        } else {
            mytoast("打开(微妙)倒计时..." + i + "秒")
            i--
            sleep(1000)
        }
    }
    function 弹窗线程() {
        while (true) {
            try {
                if (text("允许").exists()) {
                    text("允许").find()[0].click()
                    sleep(1000)
                } else if (text("确定").exists() && id("tvCancle").exists()) {
                    text("确定").find()[0].click()
                    sleep(1000)
                } else {
                    sleep(2000)
                }
            } catch (error) {
                mytoast("识别弹窗出错了..." + error)
                sleep(2000)
            }
        }
    }
}
function 运行方式_注册() {
    进行霸改机("com.project.nduyuanyuzhou")
    sleep(3000)
    app.launchPackage("com.project.nduyuanyuzhou")
    var i = 24
    while (true) {
        if (text("用户协议和隐私政策").exists()) {
            mytoast("打开成功")
            mySleep()
            break
        } else if (i < 1) {
            mytoast("打开失败，尝试重新打开（微妙）")
            sleep(1500)
            app.launchPackage("com.project.nduyuanyuzhou")
            i = 24
        } else {
            mytoast("打开（微妙）倒计时..." + i + "秒")
            i--
            sleep(1000)
        }
    }
    循环点击(text("同意").findOne(), "同意", text("验证码登录"))
    循环点击(id("llCode").findOne(), "验证码登录", text("手机号"))
    获取账号()
    获取豪猪令牌()
    while (true) {
        获取豪猪手机号()
        id("tvPhone").findOne().setText(SO.phone)
        // shell("input text " + SO.phone, true)
        mySleep()
        id("tvGetCode").findOne().click()
        SO.状态 = 获取豪猪验证码()
        if (SO.状态) {
            id("etPwd").findOne().setText(SO.msg)
            // shell("input text " + SO.msg, true)
            mySleep()
            id("ivCheck").findOne().click()
            mySleep()
            循环点击(id("tvLogin").findOne(), "登录", text("完善资料"))
            mySleep()
            id("ivNv").findOne().click()
            mySleep()
            id("tvNickname").findOne().setText(获取昵称())
            mySleep()
            id("tvAge").findOne().setText(random(21, 26))
            mySleep()
            循环点击(id("ivAdd").findOne(), "上传头像", text("相机胶卷"))
            mySleep()
            id("btnCheck").findOne().click()
            mySleep()
            循环点击(id("ps_complete_select").findOne(), "已完成", text("完善资料"))
            循环点击(text("确认注册").findOne(), "确认注册", text("跳过"))
            循环点击(text("跳过").findOne(), "跳过", text("附近"))
            return
        } else {
            拉黑豪猪手机号()
            back()
            i = 6
            mySleep()
        }
    }
    function 进行霸改机(pkgName) {
        while (true) {
            if (http.get("http://127.0.0.1:9270").body.string() == "OK") {
                mytoast("霸改机进行中...")
                mySleep()
                break
            } else {
                mytoast("霸接口未启动")
                sleep(1000)
            }
        }
        while (true) {
            try {
                webInfo = http.get("http://127.0.0.1:9270/cmd?group=AppTool&action=newDevice&params=[" + pkgName + "]")
                if (webInfo.statusCode == "200") {
                    webInfo = webInfo.body.json()
                    if (webInfo.success == 1) {
                        mytoast("改机成功");
                        mySleep()
                        break
                    } else {
                        sleep(1000)
                        mytoast("改机中...");
                    }
                } else {
                    mytoast("霸接口运行中");
                    sleep(1000)
                }
            } catch (error) {
                mytoast(error)
                sleep(1000)
            }
        }
        return
    }
    function 获取昵称() {
        var 名字全 = "且听风铃我心已打烊指尖的气息微光倾城微笑的侧脸雨晨的清风烛光里的愿伊人泪满面那片微醉阳光如花的旋律花舞花落泪聆听逝去的流最后一抹阳光浅浅嫣然笑云纹梦纷蝶阳光下的坦白地平線盡頭漫步云海涧路过你的时光海氹有点甜初晓微芒白衣未央思念幻化成海橱窗的光木槿暖夏浅笑最倾城初晴夜雨薄荷微凉时光葬空城樱花浪漫比时光凉薄蓝衣裙摆风吹过下雨天半岛弥音外灘上的背影背一地斜阳爱之搁浅兰花旳执着遍地花香无声飞雪青裙情无溯源格子的夏天果味小可爱傻萌小学妹"
        名字全 = 名字全.split("")
        var 返回用户名 = ""
        for (let r = 0; r < random(5, 7); r++) {
            返回用户名 = 返回用户名 + 名字全[random(0, 名字全.length - 1)]
        }
        return 返回用户名
    }
    function 获取账号() {
        var 账号数组
        while (true) {
            if (files.exists("/sdcard/Pictures/haozhu.txt")) {
                mytoast("本地接码平台账号密码存在")
                sleep(1000)
                break
            } else {
                mytoast("本地接码平台账号密码不存在，请检查文件名是否相同")
                sleep(random(2000, 6000))
            }
        }
        账号数组 = readFile("/sdcard/Pictures/haozhu.txt")
        账号数组 = 账号数组.split("\n")
        账号数组 = 账号数组[0].split("----")
        SO.账号 = 账号数组[1]
        SO.密码 = 账号数组[2]
        return
    }
    function 获取豪猪令牌() {
        var webInfo
        while (true) {
            try {
                webInfo = http.get("http://api.haozhuma.com/sms/?api=login&user=" + SO.账号 + "&pass=" + SO.密码)
                if (webInfo.statusCode == "200") {
                    webInfo = webInfo.body.json()
                    if (webInfo.code == "0") {
                        SO.token = webInfo.token
                        mytoast("获取豪猪token成功");
                        break
                    } else {
                        mytoast("获取豪猪token中...\n返回代码：" + webInfo.code + "\n返回信息：" + webInfo.msg);
                        sleep(10000)
                    }
                } else {
                    mytoast("网页无法访问，请检查网络链接");
                    sleep(1000)
                }
            } catch (error) {
                mytoast("对接接码API，登录时出错了" + error)
                sleep(1000)
            }
        }
        return
    }
    function 获取豪猪手机号() {
        var webInfo
        while (true) {
            try {
                webInfo = http.get("http://api.haozhuma.com/sms/?api=getPhone&token=" + SO.token + "&sid=" + SO.项目 + "&exclude=192&ascription=2")
                if (webInfo.statusCode == "200") {
                    webInfo = webInfo.body.json()
                    if (webInfo.code == "0") {
                        SO.phone = webInfo.phone
                        mytoast("获取豪猪手机号：" + SO.phone);
                        break
                    } else {
                        mytoast("获取豪猪手机号中...\n返回代码：" + webInfo.code + "\n返回信息：" + webInfo.msg);
                        sleep(10000)
                    }
                } else {
                    mytoast("网页无法访问，请检查网络链接");
                    sleep(2000)
                }
            } catch (error) {
                mytoast("对接接码API，获取手机号时出错了" + error)
                sleep(1000)
            }
        }
        return
    }
    function 获取豪猪验证码() {
        var webInfo
        var i
        i = 1
        while (true) {
            try {
                webInfo = http.get("http://api.haozhuma.com/sms/?api=getMessage&token=" + SO.token + "&sid=" + SO.项目 + "&phone=" + SO.phone)
                if (webInfo.statusCode == "200") {
                    webInfo = webInfo.body.json()
                    if (webInfo.code == "0") {
                        SO.msg = webInfo.yzm
                        mytoast("获取到豪猪验证码：" + SO.msg);
                        return true
                    } else if (i > 10) {
                        return false
                    } else {
                        mytoast("获取豪猪验证码中..." + i + "次\n返回代码：" + webInfo.code + "\n返回信息：" + webInfo.msg);
                        i++
                        sleep(10000)
                    }
                } else {
                    mytoast("网页无法访问，请检查网络链接");
                    sleep(1000)
                }
            } catch (error) {
                mytoast("对接接码API，获取验证码时出错了" + error)
                sleep(1000)
            }
        }
    }
    function 拉黑豪猪手机号() {
        var webInfo
        while (true) {
            try {
                webInfo = http.get("http://api.haozhuma.com/sms/?api=addBlacklist&token=" + SO.token + "&sid=" + SO.项目 + "&country_code=CN&phone=" + SO.phone)
                if (webInfo.statusCode == "200") {
                    webInfo = webInfo.body.json()
                    if (webInfo.code == "0") {
                        mytoast("拉黑手机号(" + SO.phone + ")成功");
                        mySleep()
                        break
                    } else {
                        mytoast("拉黑手机号(" + SO.phone + ")中...\n返回代码：" + webInfo.code + "\n返回信息：" + webInfo.msg);
                        sleep(10000)
                    }
                } else {
                    mytoast("网页无法访问，请检查网络链接");
                    sleep(1000)
                }
            } catch (error) {
                mytoast("对接接码API，拉黑手机号时出错了" + error)
                sleep(1000)
            }
        }
        return
    }
}
function 运行方式_跑号() {
    SO.token = shell("cat /data/data/com.project.nduyuanyuzhou/files/mmkv/mmkv.default", true).result.match(/"token":"(\S*)","user_emchat_name"/)[1]
    更新话术文件()
    threads.start(领取金币)
    if (ui.界面_测试.checked) {
        跳转回复(ui.界面_自己男号.getText().toString())
    } else {
        匹配回复()
    }
    function 更新话术文件() {
        while (true) {
            if (files.exists("/sdcard/Pictures/" + ui.界面_话术文件.getText().toString() + "/1.txt")) {
                break
            } else {
                mytoast("本地话术不存在，请检查文件名是否相同")
                sleep(random(1000, 10000))
            }
        }
        while (true) {
            if (files.copy("/sdcard/Pictures/" + ui.界面_话术文件.getText().toString() + "/1.txt", SO.话术路径)) {
                mytoast("话术刷新成功：" + ui.界面_话术文件.getText().toString())
                sleep(1000)
                break
            } else {
                mytoast("话术刷新中...")
                sleep(1000)
            }
        }
        if (readFile("/sdcard/Pictures/" + ui.界面_话术文件.getText().toString() + "/1.txt").includes("发图片")) {
            while (true) {
                if (files.exists("/sdcard/Pictures/" + ui.界面_话术文件.getText().toString() + "/1.jpg")) {
                    break
                } else {
                    mytoast("图片不存在，请检查图片文件名是否一致")
                    sleep(random(2000, 6000))
                }
            }
            var 存_图片文件夹 = "/sdcard/DCIM/mantan/存" + ui.界面_话术文件.getText().toString() + "/"
            files.removeDir(存_图片文件夹)
            mySleep()
            files.createWithDirs(存_图片文件夹)
            mySleep()
            mytoast("刷新图片")
            shell("cp /sdcard/Pictures/" + ui.界面_话术文件.getText().toString() + "/1.jpg " + 存_图片文件夹 + "1.jpg", true)
            mySleep()
            mytoast("刷新图片完成")
            mySleep()
        }
    }
    function 匹配回复() {
        shell("am start -a android.intent.action.VIEW -n com.project.nduyuanyuzhou/com.project.nduyuanyuzhou.ui.mine.YsGlActivity", true)
        sleep(2000)
        次数 = 1
        while (true) {
            if (次数 > 9) {
                mytoast("发送完9次延时中...")
                sleep(99999999)
            } else {
                mytoast("发送次数..." + 次数)
                mySleep()
                次数++
                循环点击(text("智能匹配对象").findOne(), "智能匹配对象", text("私聊"))
                mySleep()
                用户名 = id("tvName").findOne().getText()
                mySleep()
                循环点击(text("私聊").findOne(), "私聊", id("et_sendmessage"))
                识别智能回复(用户名)
                返回智能匹配对象()
            }
        }
    }
    function 返回智能匹配对象() {
        var 返回计数 = 12
        while (true) {
            if (text("智能匹配对象").exists()) {
                mytoast("返回（智能匹配对象）成功")
                return
            } else if (text("运行脚本").exists() || 返回计数 < 1) {
                threads.shutDownAll()
                threads.start(main)
                sleep(8000)
                return
            } else {
                mytoast("返回（智能匹配对象）中..." + 返回计数 + "秒")
                返回计数--
                back()
                sleep(1000)
            }
        }
    }
    function 领取金币() {
        // var url = "https://www.wemiao.net/api/User/gold_ad_amount"
        // var body = "plat=2&token=214434"
        // while (true) {
        //     var webInfo = http.request(url, {
        //         method: "POST",
        //         headers: {
        //             "Host": "www.wemiao.net",
        //             "content-type": "application/x-www-form-urlencoded"
        //         },
        //         body: body
        //     })
        //     if (webInfo.statusCode == "200") {
        //         var res = webInfo.body.json()
        //         if (res.code == "1") {
        //             mytoast("领取成功\n返回结果：" + res.msg)
        //             mySleep()
        //         } else {
        //             mytoast("领取失败\n返回结果：" + res.msg)
        //             sleep(2000)
        //         }
        //     } else {
        //         mytoast("网络出错" + webInfo.body.json())
        //         sleep(2000)
        //     }
        // }
        var url = "http://qyapp.wemiao.net/api/user/wyGold"
        var headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "qyapp.wemiao.net",
        }
        var webInfo
        var res
        data = "token=214526"
        while (true) {
            webInfo = http.request(url, {
                method: "POST",
                headers: headers,
                body: data
            })
            if (webInfo.statusCode == "200") {
                res = webInfo.body.json()
                if (res.code == "1") {
                    mytoast("领取金币成功\n返回结果：" + res.msg)
                    sleep(1000)
                } else {
                    mytoast("领取金币失败\n返回结果：" + res.msg)
                    sleep(2000)
                }
            } else {
                mytoast("领取金币请求失败")
                sleep(999999999)
            }
        }
    }
    function 跳转回复(uid) {
        var i
        shell("am start -a android.intent.action.VIEW -n com.project.nduyuanyuzhou/com.project.nduyuanyuzhou.chat.section.chat.activity.ChatActivity -e conversationId " + uid, true)
        i = 10
        mySleep()
        while (true) {
            if (id("et_sendmessage").exists()) {
                mytoast("跳转成功")
                mySleep()
                识别智能回复(uid)
                mySleep()
                break
            } else if (i < 1) {
                mytoast("跳转失败")
                mySleep()
                break
            } else {
                mytoast("跳转中..." + i)
                i--
                sleep(1000)
            }
        }
        return
    }
    function 识别智能回复(参数_获取的用户名) {
        var 读取话术
        var 读取话术数组 = new Array()
        var 随机读取行数
        var 需要发送话术下标
        var 读取用户话术信息
        读取话术 = readFile(SO.话术路径)
        读取话术数组 = 读取话术.split("\n")
        if (!files.exists(SO.用于交互用户名 + 参数_获取的用户名 + ".txt")) {
            mytoast("（" + 参数_获取的用户名 + "）这个用户没有打过招呼")
            需要发送话术下标 = 0
            随机读取行数 = random(0, 读取话术数组.length - 1)
            writeFile(SO.用于交互用户名 + 参数_获取的用户名 + ".txt", 需要发送话术下标 + "|" + 随机读取行数)
        } else {
            mytoast("（" + 参数_获取的用户名 + "）这个用户曾经打过招呼")
            读取用户话术信息 = readFile(SO.用于交互用户名 + 参数_获取的用户名 + ".txt")
            读取用户话术信息 = 读取用户话术信息.split("|")
            需要发送话术下标 = 读取用户话术信息[0]
            随机读取行数 = 读取用户话术信息[1]
        }
        读取话术 = 读取话术数组[随机读取行数]
        读取话术数组 = 读取话术.split("|")
        if (需要发送话术下标 < 读取话术数组.length) {
            读取话术 = 读取话术数组[需要发送话术下标]
            if (读取话术.includes("+")) {
                mytoast("需要给这个人分段发送")
                mySleep()
                读取话术数组 = 读取话术.split("+")
                for (let i = 0; i < 读取话术数组.length; i++) {
                    mytoast("输入这次需要发送的话术是：" + 读取话术数组[i])
                    输入话术并发送(读取话术数组[i])
                    mySleep()
                }
            } else {
                mytoast("输入这次需要发送的话术是：" + 读取话术)
                输入话术并发送(读取话术)
                mySleep()
            }
            需要发送话术下标++
            mytoast("马上在" + 参数_获取的用户名 + "文件中写入：" + 需要发送话术下标 + "|" + 随机读取行数)
            mySleep()
            writeFile(SO.用于交互用户名 + 参数_获取的用户名 + ".txt", 需要发送话术下标 + "|" + 随机读取行数)
        } else {
            mytoast("没有话术了")
            mySleep()
        }
        return
    }
    function 输入话术并发送(sendTextInfo) {
        if (sendTextInfo.includes("发图片")) {
            刷新图片()
            mySleep()
            循环点击(id("btn_more").findOne(), "右下角加号", text("相册"))
            循环点击(text("相册").findOne().parent(), "相册", text("选择照片"))
            sleep(1000)
            click(200, 200)
            sleep(2000)
            click(360, 730)
            sleep(1000)
        } else {
            var 个数
            if (sendTextInfo.includes("*")) {
                个数 = sendTextInfo.split("*").length
                for (let i = 1; i < 个数; i++) {
                    sendTextInfo = sendTextInfo.replace("*", "\n")
                }
            }
            if (sendTextInfo.includes("$")) {
                var suijiTextArray
                var suijiText
                var 表情 = "҉ೄζ͡ตԅ೨Ͽ͜"
                suijiTextArray = 表情.split("")
                个数 = sendTextInfo.split("$").length
                for (let i = 1; i < 个数; i++) {
                    suijiText = suijiTextArray[random(0, suijiTextArray.length - 1)]
                    sendTextInfo = sendTextInfo.replace("$", suijiText)
                }
            }
            if (sendTextInfo.includes("%")) {
                var suijiTextArray
                var suijiText
                var 表情 = "[:D]+[):]+[;)]+[:-o]+[:p]+[(H)]+[:s]+[:$]+[:(]+[:|]+[(a)]+[8o|]+[8-|]+[+o(]+[|-)]+[*-)]+[:-#]+[8-)]+[({)]+[(})]+[(|)]"
                suijiTextArray = 表情.split("+")
                个数 = sendTextInfo.split("%").length
                suijiText = suijiTextArray[random(0, suijiTextArray.length - 1)]
                for (let i = 1; i < 个数; i++) {
                    sendTextInfo = sendTextInfo.replace("%", suijiText)
                }
            }
            while (true) {
                className("android.widget.EditText").findOne().setText(sendTextInfo)
                mySleep()
                if (id("btn_send").exists()) {
                    id("btn_send").findOne().click()
                    break
                } else {
                    mytoast("重新输入话术")
                    sleep(1000)
                }
            }
        }
        return
    }
    function 刷新图片() {
        var imgage
        var clip
        var 存_图片文件夹 = "/sdcard/DCIM/mantan/存" + ui.界面_话术文件.getText().toString() + "/"
        var 发_图片文件夹 = "/sdcard/DCIM/mantan/fa" + ui.界面_话术文件.getText().toString() + "/"
        files.removeDir(发_图片文件夹)
        mySleep()
        files.createWithDirs(发_图片文件夹)
        mySleep()
        mytoast("刷新图片")
        imgage = images.read(存_图片文件夹 + "1.jpg")
        clip = images.clip(imgage, random(0, 10), random(0, 10), imgage.width - random(10, 20), imgage.height - random(10, 20));
        images.save(clip, 发_图片文件夹 + "1.jpg")
        mySleep()
        media.scanFile(发_图片文件夹 + "1.jpg");
        shell("am broadcast -a android.intent.action.MEDIA_MOUNTED -d file:///sdcard/DCIM/mantan/fa" + ui.界面_话术文件.getText().toString() + "/1.jpg）", true)
        imgage.recycle()
        clip.recycle()
        mytoast("全部刷新完成")
        mySleep()
    }
}
function 循环点击(控件, 说明, 目标控件) {
    var i
    控件.click()
    mySleep()
    i = 8
    while (true) {
        if (目标控件.exists()) {
            mytoast("点击（" + 说明 + "）成功")
            return true
        } else if (i < 0) {
            控件.click()
            mySleep()
            i = 4
        } else {
            mytoast("点击（" + 说明 + "）中..." + i)
            i--
            sleep(1000)
        }
    }
}
function mySleep() {
    sleep(random(300, 500))
}
function addFile(file, str) {
    var thisFile
    if (files.exists(file)) {
        thisFile = open(file, "a")
        thisFile.write("\n" + str)
        thisFile.close()
        return
    } else {
        mytoast("文件没有初始化");
        return
    }
}
function isExistsStr(file, str) {
    var readUserName
    readUserName = readFile(file)
    if (readUserName.indexOf(str) == -1) {
        return false
    } else {
        return true
    }
}
function writeFile(thisFilePath, thisStr) {
    if (files.exists(thisFilePath)) {
    } else {
        files.createWithDirs(thisFilePath)
    }
    openFile = open(thisFilePath, "w")
    openFile.write(thisStr)
    openFile.close()
    return
}
function readFile(thisFilePath) {
    if (files.exists(thisFilePath)) {
        openFile = open(thisFilePath, "r")
        fileStr = openFile.read()
        openFile.close()
        return fileStr
    } else {
        return null
    }
}
function scriptObject() {
    //自定义变量对象
}
function 悬浮窗() {
    var w = floaty.rawWindow(
        <frame>
            <text id="tishi" textColor="#FF0000" bg="#FFFF00" textStyle="bold" size="20"></text>
        </frame>
    )
    w.setPosition(10, device.height * 0.7)
    w.setTouchable(false)
    mytoast = (str) => {
        ui.run(function () {
            w.tishi.setText("ta：" + str)
            console.log(str)
        })
    }
}