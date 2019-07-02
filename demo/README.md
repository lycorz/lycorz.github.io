##  此文件用于记录开发过程中遇到的问题、问题背景、解决思路、解决方案。
##                   旨在交流学习，以惠后人。

### 全局公共方法（自定义）
1. table表格点击当前行选中
*@row-click="clickRow($event, 'table')"// 只需要修改第二个参数，即当前表格的ref属性名（string）*
2. table表格取消选择 - cancelSelection
*@click="cancelSelection('table')" //只需要修改第二个参数，即当前表格的ref属性名（string）*
3. table表格全选 - allSelection
*@click="allSelection('tableData', 'table')" //第一个参数：当前操作的变量名 第二个参数：当前表格的ref属性名*
4. table表格反选 - toggleSelection
*@click="toggleSelection('tableData', 'table')" //第一个参数：当前操作的变量名 第二个参数：当前表格的ref属性名*

> author:gzp

### 判断是否在开发环境
1. 只需要判断process.env.NODE_ENV，development：开发环境；production：打包之后的运行环境
*process.env.NODE_ENV ==="development"*
*process.env.NODE_ENV ==="production"*
> author:cyt

* table上移条目：正确示例（改变原数组datatable）：

```
//上移：
    goUp() {
      let that = this;
      //如果选中的不为空
      if (this.multipleSelection1.length == 0) {
        this.$message.error("至少选中一个项目");
        return;
      }
      this.tableData2.forEach((element, index) => {
        // finalArr.push(element);
        this.multipleSelection1.forEach((ele, ind) => {
          //位置互换
          if (element.innerCode == ele.innerCode) {
            that.tableDataUp(that.tableData2, that.tableData2[index], index);
          }
        });
      });
    },
    tableDataUp(tableData, currRow, currRowIndex) {
      if (currRowIndex > 0) {
        let upData = tableData[currRowIndex - 1];
        tableData.splice(currRowIndex - 1, 1);
        tableData.splice(currRowIndex, 0, upData);
      }
    }
    ```
* 下移（不能抄上移代码，因为下移操作改变原数组，此时原数组还没循环完毕，再循环至下一位时正好是刚替换位置的元素。就会导致效果总是下移至最后一位）：

```
    goDown() {
      let that = this;
      let arr = [];
      //如果选中的不为空
      if (this.multipleSelection1.length == 0) {
        this.$message.error("至少选中一个项目");
        return;
      }
      console.log(88,this.tableData2,this.multipleSelection1)
      this.tableData2.forEach((element, index) => {
        // finalArr.push(element);
        this.multipleSelection1.forEach((ele, ind) => {
          //位置互换
          if (element.innerCode == ele.innerCode) {
            // that.tableDataDown(that.tableData2, that.tableData2[index], index);
            let obj = {};
            obj.currRow = that.tableData2[index];
            obj.currRowIndex = index;
            arr.push(obj)
          }
        });
      });
      this.tableDataDown(this.tableData2,arr)
    },
    tableDataDown(tableData,arr) {
      arr.reverse().forEach((ele,index)=>{
      if (ele.currRowIndex.index !== tableData.length - 1) {
        let downData = tableData[ele.currRowIndex];
        console.log(11,ele.currRowIndex);
        tableData.splice(ele.currRowIndex, 1);
        tableData.splice(ele.currRowIndex+1, 0, downData);
        // tableData.splice(currRowIndex + 1, 1);
        // console.log(89,downData)
        // tableData.splice(currRowIndex, 0, tableData[currRowIndex + 1]);
      }
      })
    },
上移错误示例（新datatable数组赋值，会导致checkbox失效）：
    goUp() {
      let that = this;
      //如果选中的不为空
      if (this.multipleSelection1.length == 0) {
        this.$message.error("至少选中一个项目");
        return;
      }
      //列表集合
      let finalArr = [];

      this.tableData2.forEach((element, index) => {
        finalArr.push(element);
        this.multipleSelection1.forEach((ele, ind) => {
          //位置互换
          if (element.innerCode == ele.innerCode) {
             let temp = Object.assign(finalArr[index - 1], {});
             finalArr[index - 1] = Object.assign(element, {});
             finalArr[index] = temp;
          }
        });
      });
      this.tableData2 = finalArr;
      this.multipleSelection1 = [];
      this.handleSelectionChangeSecond(chooseArr)

    }
下移错误示例（）：
function tableDataDown(tableData, currRow, currRowIndex){
  if (currRowIndex.index !== tableData.length-1){
    let downData = tableData[currRowIndex+ 1];
    tableData.splice(currRowIndex + 1, 1);
    tableData.splice(currRowIndex,0, downData);
  }
}

