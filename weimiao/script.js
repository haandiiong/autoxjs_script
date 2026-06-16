"ui";
var SO = new scriptObject()
threads.start(悬浮窗)
SO.配置信息 = "/sdcard/Music/config.txt"
SO.话术路径 = "/sdcard/laojiuapp/huashu.txt"
SO.去重文件 = "/sdcard/uids.txt"
SO.用于交互用户名 = "/sdcard/laojiuapp/username/"
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
        threads.start(运行方式_跑号)
    })
    function 更新配置() {
        writeFile(SO.配置信息,
            ui.界面_话术文件.getText() + "|" +
            ui.界面_自己男号.getText() + "|" +
            +"||||||")
    }
}
function 运行方式_跑号() {
    SO.token = shell("cat /data/data/com.project.nduyuanyuzhou/files/mmkv/mmkv.default", true).result.match(/"token":"(\S*)","user_emchat_name"/)[1]
    更新话术文件()
    SO.自己男号 = ui.界面_自己男号.getText().toString() * 1
    if (ui.界面_测试.checked) {
        跳转回复(SO.自己男号)
    } else {
        一键搭讪()
    }
    function 一键搭讪() {
        var url = "https://www.wemiao.net/api/user/accost"
        var headers = {
            "Host": "www.wemiao.net",
            "content-type": "application/x-www-form-urlencoded",
        }
        if (!files.exists(SO.去重文件)) {
            writeFile(SO.去重文件, "")
        }
        var data = "latitude=31.235929042252014&longitude=121.48053886017651&type=0&token=" + SO.自己男号
        var res
        var 用户数组
        while (true) {
            res = http.request(url, {
                method: "POST",
                headers: headers,
                body: data
            })
            res = res.body.json()
            if (res.code == 1) {
                用户数组 = res.data
                for (let z = 0; z < 用户数组.length; z++) {
                    if (isExistsStr(SO.去重文件, 用户数组[z].user_emchat_name)) {
                        mytoast(用户数组[z].user_emchat_name + "...重复");
                    } else {
                        addFile(SO.去重文件, 用户数组[z].user_emchat_name)
                        跳转回复(用户数组[z].user_emchat_name)
                    }
                }
            } else {
                for (let o = 242; o > 1; o--) {
                    mytoast("等待重新搭讪...\n" + o + "秒")
                    sleep(1000)
                }
            }
        }
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