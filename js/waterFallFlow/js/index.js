// 调用另一个js文件的数据
function getData(dataName, callback) {
    var noteName = window[dataName];
    callback(noteName);
}

var note = {
    // 一个调用函数，调用所有的函数
    init: function() {
        this.initData();
        this.render();
        this.handle();
    },
    initData: function() {
        var self = this;
        this.el = document.getElementsByClassName('note-wrapper')[0]; // 选中note-wrapper的div
        getData('noteList', function(res) {
            self.noteList = res;
        })
    },
    render: function() {
        this.el.innerHTML = this.renderColumn() + '<div class="more">查看更多</div>';
        this.renderNote();
    },
    // 渲染5列，5个note-column函数
    renderColumn: function() {
        var template = '';
        for (var i = 0; i < 5; i++) {
            template += '<div class="note-column"></div>'
        }
        return template;
    },
    // 渲染列中的数据
    renderNote: function() {
        var oNoteColumnMap = this.el.getElementsByClassName('note-column');
        for (var i = 0; i < this.noteList.length; i++) { // 循环数据的length;决定每一列中有多少数据模块
            var oNoteDiv = document.createElement('div'); // 新建 div
            var index = this.renderColumnIndex(); // 索引等于 renderColumnIndex 函数
            oNoteColumnMap[index].appendChild(oNoteDiv); // 让数据插入到最低的一列
            oNoteDiv.outerHTML = this.renderCmp(this.noteList[i]); // 让oNoteDiv变为renderCmp函数，让一个空的div有了数据
        }
        var oNoteColumnMap = this.el.getElementsByClassName('note-column');

    },
    // 比较高度的函数，决定插入到那一列中
    renderColumnIndex: function() {
        var self = this;
        var oNoteColumnMap = document.getElementsByClassName('note-column'); // 选中列
        var minHeight = oNoteColumnMap[0].offsetHeight; // 选中第一列的高度
        var minIndex = 0; // 索引，一开始为0
        for (var i = 0; i < oNoteColumnMap.length; i++) { // 循环列
            var columnHeight = oNoteColumnMap[i].offsetHeight; //选中 i 列的高度
            if (columnHeight < minHeight) { // 比较 i 列如果小于第一列
                minHeight = columnHeight; // 那么就让第一列的高度 = 第i列的高度
                minIndex = i; // 然后让索引为 i，就相当于把数据插入到第 i 列，看那一列低，插入到那一列中
            }
        }
        return minIndex; // 返回索引 minIndex
    },
    renderCmp: function(note) { // 把html结构返回出来
        return `<div class="note">
        <div class="note-info">
            <div class="note-img">
                <img src="${note.cover.url}" alt="">
                ${note.type == 'video' ? '<i class="video"></i>' : ''}
            </div>
            <div class="info">
                <h3>${note.title}</h3>
            </div>
        </div>
        <div class="note-append">
            <div class="user">
                <div class="avater">
                    <img src="${note.user.image}" alt="">
                    ${note.officialVerified ? ' <i class="verified"></i>' : ''}
                </div>
                <div class="name">${note.nickname}</div>
            </div>
            <div class="like">
                <i class="heart ${note.isLiked ? 'heart--red' : ''}"></i>
                <span class="likes">${note.likes}</span>
            </div>
        </div>
    </div>`;
    },
    handle: function() { // 点击“查看更多”（由于数据的有限，只能重复渲染一遍）调用renderNote函数，重新渲染一遍
        var self = this;
        var oMore = document.getElementsByClassName("more")[0];
        oMore.onclick = function() {
            getData('noteList', function(res) {
                self.renderNote(res);
            })
        }
    }
}
