实用例子：
demo/box-open  技术：threejs、tween


---fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d"); ////创建画布绘图的环境为2d
ctx.fillStyle="#0000ff";
---ctx.fillRect(20,20,150,100);  绘制已填色的矩形

---通过 getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 将图像数据放回画布
//getImageData() 对象拷贝了画布指定矩形的像素数据
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle="green";
ctx.fillRect(10,10,50,50); //绘制已填色的矩形

function copy()
{
var imgData=ctx.getImageData(10,10,50,50);
ctx.putImageData(imgData,10,70);
}
//获取ImageData对象中的第一个元素的color,即r,g,b,a
  imgData.data[0]; //被返回的 ImageData 对象中第一个像素的 color/alpha 信息
  imgData.data[1];
  imgData.data[2];
  imgData.data[3];

// 反转颜色
  imgData.data[i]; //被返回的 ImageData 对象中第一个像素的 color/alpha 信息
  imgData.data[i+1];
  imgData.data[i+2];
  imgData.data[i+3];
  }

  ---------------------THREE.JS-----------------------
  参考网址：http://www.hewebgl.com/article/getarticle/50
  THREE.CubeGeometry他是一个几何体

  在Threejs中定义一个点：
  THREE.Vector3 = function ( x, y, z ) {

this.x = x || 0;
this.y = y || 0;
this.z = z || 0;

};

--让场景动起来： &&&第三章，让场景动起来是重点研究
应预先给物体命名出一个名称，例如mesh:
  function animation()
            {
                mesh.position.x-=1;  //此句代码，移动物体的position
                renderer.render(scene, camera);
                requestAnimationFrame(animation);
            }

            动画性能测试：
            FPS表示：上一秒的帧数，这个值越大越好，一般都为60左右；
            MS表示：渲染一帧需要的毫秒数，这个数字是越小越好
--动画引擎
使用动画引擎Tween.js来创建动画
TWEEN.Tween的构造函数接受的是要改变属性的对象，这里传入的是mesh的位置。Tween的任何一个函数返回的都是自身，所以可以用串联的方式直接调用各个函数。

使用动画引擎Tween.js来创建不规则动画 &&&&&重点研究

--相机：
（1）正投影相机：OrthographicCamera( left, right, top, bottom, near, far )
（2）透视投影相机：erspectiveCamera( fov, aspect, near, far )
相机详细参数介绍与使用：http://hewebgl.com/article/getarticle/59


--3D模型的加载和使用，第七章，可以先不看，暂时用不到


Vector2的常用方法  学习汇总

右手坐标系 0,0,1


--光源：在完成期望值的工作之后，可以给相应的物品添加光源，比如太阳什么的
光源类别，及其参数与使用方法

---
mesh.scale.set( s, s, s ); //设置x，y，z的缩放比例 
Mesh.position.set(0,0,0); /*设置物体位置*/ 

//three 框架
场景、相机、渲染器