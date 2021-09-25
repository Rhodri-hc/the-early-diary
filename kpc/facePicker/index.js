  /**
   * @desc 图片节点原型链挂载播放方法
   */
  HTMLImageElement.prototype.play = function() {
    if (this.storeCanvas) {
      // 移除存储的canvas
      this.storeCanvas.parentElement.removeChild(this.storeCanvas);
      this.storeCanvas = null;
      // 透明度还原
      // eslint-disable-next-line no-undef
      image.style.opacity = "";
    }
    if (this.storeUrl) {
      this.src = this.storeUrl;
    }
  };
  
  /**
   * @desc 图片节点原型链挂载暂停方法
   */
  HTMLImageElement.prototype.stop = function() {
    const canvas = document.createElement("canvas");
    // 尺寸
    const width = this.width,
      height = this.height;
    if (width && height) {
      // 存储之前的地址
      if (!this.storeUrl) {
        this.storeUrl = this.src;
      }
      // canvas大小
      canvas.width = width;
      canvas.height = height;
      // 绘制图片帧（第一帧）
      canvas.getContext("2d").drawImage(this, 0, 0, width, height);
      // 重置当前图片
      try {
        this.src = canvas.toDataURL("image/gif");
      } catch (e) {
        // 跨域
        this.removeAttribute("src");
        // 载入canvas元素
        canvas.style.position = "absolute";
        // 前面插入图片
        this.parentElement.insertBefore(canvas, this);
        // 隐藏原图
        this.style.opacity = "0";
        // 存储canvas
        this.storeCanvas = canvas;
      }
    }
  };