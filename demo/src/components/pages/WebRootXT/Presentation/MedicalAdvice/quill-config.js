const uploadConfig = {
    action: '',  // 必填参数 图片上传地址
    methods: 'POST',  // 必填参数 图片上传方式
    token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    name: 'img',  // 必填参数 文件的参数名
    size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'  // 可选 可上传的图片格式
};

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
    // ['bold', 'italic', 'underline', 'strike'],
    // ['blockquote', 'code-block'],
    // [{ 'header': 1 }, { 'header': 2 }],
    // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    // [{ 'script': 'sub' }, { 'script': 'super' }],
    // [{ 'indent': '-1' }, { 'indent': '+1' }],
    // [{ 'direction': 'rtl' }],
    // [{ 'size': ['small', false, 'large', 'huge'] }],
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    // [{ 'color': [] }, { 'background': [] }],
    // [{ 'font': [] }],
    // [{ 'align': [] }],
    // [{ 'clean': '源码编辑' }],
    // ['link', 'image', 'video'],
    ['sourceEditor']
];
const handlers = {
    shadeBox: null,
    sourceEditor: function () {
        const container = this.container;
        const firstChild = container.nextElementSibling.firstChild;
        if (!this.shadeBox) {
            let shadeBox = this.shadeBox = document.createElement('div');
            shadeBox.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); cursor:pointer';
            container.style.position = 'relative';
            shadeBox.addEventListener('click', function () {
                this.style.display = 'none';
                firstChild.innerHTML = firstChild.innerText.trim();
            }, false);
            container.appendChild(shadeBox);
            firstChild.innerText = firstChild.innerHTML;
        } else {
            this.shadeBox.style.display = 'block';
            firstChild.innerText = firstChild.innerHTML;
        }
    }
};

export default {
    placeholder: '',
    theme: 'snow',  // 主题
    modules: {
        toolbar: {
            container: toolOptions,  // 工具栏选项
            handlers: handlers  // 事件重写
        }
    },
    initButton: function () {
        const sourceEditorButton = document.querySelector('.ql-sourceEditor');
        sourceEditorButton.style.cssText = "width:80px; border:1px solid #ccc; border-radius:5px;";
        sourceEditorButton.innerText = "源码编辑";
    }
};