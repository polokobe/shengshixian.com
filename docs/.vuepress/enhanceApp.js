/**
 * to主题使用者：你可以去掉本文件的所有代码
 */
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 还是 客户端
}) => {

  // 用于监控在路由变化时检查广告拦截器 (to主题使用者：你可以去掉本文件的所有代码)
  if (!isServer) {
    router.afterEach(() => {
      //check if wwads' fire function was blocked after document is ready with 3s timeout (waiting the ad loading)
      docReady(function () {
        setTimeout(function () {
          if (window._AdBlockInit === undefined) {
            ABDetected();
          }
        }, 3000);
      });

      // 删除事件改为隐藏事件
      setTimeout(() => {
        const pageAD = document.querySelector('.page-wwads');
        if (!pageAD) return;
        const btnEl = pageAD.querySelector('.wwads-hide');
        if (btnEl) {
          btnEl.onclick = () => {
            pageAD.style.display = 'none';
          }
        }
        // 显示广告模块
        if (pageAD.style.display === 'none') {
          pageAD.style.display = 'flex';
        }
      }, 900);
    })
  }
}


function ABDetected() {
 // const wwadsEl = document.getElementsByClassName("wwads-cn");
  // const wwadsContentEl = document.querySelector('.wwads-content');
  // if (wwadsEl[0] && !wwadsContentEl) {
  //   wwadsEl[0].innerHTML = h;
  // }
};

//check document ready
function docReady(t) {
  "complete" === document.readyState ||
    "interactive" === document.readyState
    ? setTimeout(t, 1)
    : document.addEventListener("DOMContentLoaded", t);
}
