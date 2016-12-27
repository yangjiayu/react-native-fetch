# 基于reactnative的fetch

reactnative项目进行到一定阶段，封装新的网络请求，拿来保存一下。
基于ES6语法。

* 基于fetch的请求，相对ajax简单方便。
* 封装了GET和POST，大体能满足开发需求。
* 解耦性较高，大部分都封装到function中，需要功能可以随意组装。
* （组装了一个监听账号过期作为example）。参考`tokenOutDate`.

# 使用说明
 * `config.js `保存了进行api请求的配置信息。
 * 通过`setTimeout`实现了一个简单的超时机制。
 * DEBUG请求完会有`api的log`和当前`api的耗时`，方便调试。