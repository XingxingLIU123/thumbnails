/**
 *
 * 参数 element: input file 的id
 * 参数 options：｛
 *      imgStyle: {
 *            someImgCssStyle //图片样式
 *        },
 *      imgAttr: {
 *            someImgAttribute ／／图片属性
 *       },
 *      single: false  ／／是否支持选择多张图片
 *      accept: "* /img'  //可选，默认所有图片格式
 *      reLoad: true,   ／／重新选择是否覆盖之前的
 * ｝
 * 使用： var xxx ＝ new Thumbnails(element,options)
 */
function Thumbnails(element,options) {
    var fileElementNode = document.getElementById(element);
    var imgStyle = options.imgStyle;
    var imgAttr = options.imgAttr;

    /*验证输入是否合法*/
    if(!options.accept){
        fileElementNode.setAttribute('accept','*/img');
    }else{
        fileElementNode.setAttribute('accept',options.accept);
    }

    if(options.single === false){
        fileElementNode.setAttribute('multiple','multiple');
    }

    fileElementNode.addEventListener('change',function () {
        var files = fileElementNode.files;
        var imgOptions = {
            fileElementNode: fileElementNode,
            imgStyle: imgStyle,
            imgAttr: imgAttr,
            reLoad: options.reLoad
        };
        var ul = document.createElement('ul');
        ul.setAttribute('id','img-contain');
        if(options.reLoad){
            var imgContain = document.getElementById('img-contain');
            if(imgContain !== null){
                imgContain.parentNode.removeChild(imgContain);
            }
        }
        imgOptions.fileElementNode.parentNode.appendChild(ul);
        getSomeBase64(files,files.length,imgOptions)
    })
}

var getSomeBase64 = function (files,times,imgOptions) {
    if(times > 0){
        var imgStyle = imgOptions.imgStyle;
        var imgAttr = imgOptions.imgAttr;
        var reader = new FileReader();
        var img = document.createElement('img');
        var file = files[times-1];
        var li = document.createElement('li');
        reader.onload = function (e) {
            img.setAttribute('src',e.target.result);
            for(var l in imgStyle){
                img.style[l] = imgStyle[l];
            }
            for(var i in imgAttr){
                img.setAttribute(i,imgAttr[i]);
            }
            li.appendChild(img);
            document.getElementById('img-contain').appendChild(li);
            imgOptions.fileElementNode.parentNode.appendChild(document.getElementById('img-contain'));
            times--;
            getSomeBase64(files,times,imgOptions)
        };
        reader.readAsDataURL(file)
    }else{
        return false;
    }
};

